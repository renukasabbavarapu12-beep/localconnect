/**
 * overpassService.js
 *
 * Fetches real amenity data from OpenStreetMap via the Overpass API.
 * No API key required. Nominatim is used for geocoding location labels
 * to coordinates when the user selected a location by name.
 *
 * Sources:
 *   Overpass API  – https://overpass-api.de  (CC BY-SA, OSM contributors)
 *   Nominatim     – https://nominatim.openstreetmap.org  (ODbL, OSM)
 *
 * Rate-limit / performance policy:
 *   - Queries use [timeout:20] in QL so Overpass returns a partial result
 *     rather than a bare 504 when the server is under load.
 *   - A 20-second AbortController timeout is applied client-side so the
 *     browser never waits longer than that.
 *   - On 5xx or network failure the request is retried once against each
 *     of two fallback endpoints before giving up.
 *   - No two requests for the same key run simultaneously (de-dup guard).
 *   - Results are cached in memory by location-label + category for the
 *     lifetime of the page session.
 */

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org';
const FETCH_TIMEOUT_MS = 20_000;

// Primary + two public fallback Overpass endpoints (tried in order on 5xx)
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];

// In-memory cache  key = `${label}::${category}` → results array
const _cache = {};
// In-flight de-dup  key = same → Promise
const _inflight = {};

// ─── Geocoding ────────────────────────────────────────────────────────────────

/**
 * Resolve a location label to { lat, lng } via Nominatim.
 * Appends ", Andhra Pradesh, India" to bias the result correctly.
 * Returns null on any failure.
 */
export async function geocodeLocation(label) {
  if (!label) return null;
  // Always bias toward India / Andhra Pradesh. Use structured params (countrycode + state)
  // so that village names that exist in multiple states resolve to AP first.
  const query = label.includes('Andhra Pradesh') ? label : `${label}, Andhra Pradesh`;
  try {
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    const params = new URLSearchParams({
      q:            query,
      format:       'json',
      limit:        '1',
      addressdetails: '1',
      countrycodes: 'in',
    });
    const res  = await fetch(
      `${NOMINATIM_URL}/search?${params}`,
      { headers: { 'Accept-Language': 'en' }, signal: ctrl.signal }
    );
    clearTimeout(tid);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.length) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

// ─── Overpass helpers ─────────────────────────────────────────────────────────

function haversineKm(lat1, lng1, lat2, lng2) {
  const R    = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a    =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Build a lean Overpass QL query.
 *
 * filters – array of tag strings, e.g. ['amenity=hospital', 'amenity=clinic']
 * Each filter generates node + way sub-queries only (relations are rare for
 * amenity points and add significant server cost for small gain).
 * radius – metres (default 10 km)
 */
function buildQuery(lat, lng, radius, filters) {
  const lines = filters.flatMap((f) => [
    `node[${f}](around:${radius},${lat},${lng});`,
    `way[${f}](around:${radius},${lat},${lng});`,
  ]).join('\n  ');

  // [timeout:20] tells Overpass to return whatever it has by 20 s rather
  // than sending a bare 504. [maxsize:8000000] caps the response at 8 MB.
  return `[out:json][timeout:20][maxsize:8000000];
(
  ${lines}
);
out center 500;`;
  // 500 = max elements returned; client-side sort by distance is applied after
}

/**
 * POST a query to one Overpass endpoint with a client-side abort timeout.
 * Throws on network error, client timeout, or HTTP 4xx/5xx.
 */
async function postToEndpoint(url, ql) {
  const ctrl = new AbortController();
  const tid  = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method:  'POST',
      body:    `data=${encodeURIComponent(ql)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal:  ctrl.signal,
    });
    clearTimeout(tid);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (err) {
    clearTimeout(tid);
    throw err;
  }
}

/**
 * Try each endpoint in turn; return the first successful response.
 * Throws only if every endpoint fails.
 */
async function runOverpassQuery(ql) {
  let lastErr;
  for (const url of OVERPASS_ENDPOINTS) {
    try {
      return await postToEndpoint(url, ql);
    } catch (err) {
      lastErr = err;
      // Only retry on server errors (5xx) or abort (timeout).
      // On 4xx (bad query) there is no point trying another server.
      const msg = err.message || '';
      if (msg.startsWith('HTTP 4')) throw err;
    }
  }
  throw lastErr;
}

/**
 * Derive ownership type from OSM tags.
 *
 * Source tag: operator:type (https://wiki.openstreetmap.org/wiki/Key:operator:type)
 * Recognised values (case-insensitive):
 *   government, public  → 'government'
 *   private             → 'private'
 *   anything else / absent → 'unknown'
 *
 * We intentionally do NOT infer ownership from the facility name or from
 * amenity type — that would risk misclassification. Only explicit OSM tagging
 * is used. When operator:type is absent the record is 'unknown' and remains
 * visible under the "All" filter only.
 */
function deriveOwnership(t) {
  const raw = (t['operator:type'] || '').toLowerCase().trim();
  if (raw === 'government' || raw === 'public') return 'government';
  if (raw === 'private')                        return 'private';
  return 'unknown';
}

/**
 * Convert an Overpass element to a normalised record.
 * Only fields present in the source data are populated.
 */
function normaliseElement(el, centre, refCoords) {
  const t   = el.tags || {};
  const lat = centre.lat;
  const lng = centre.lng;

  const record = {
    id:            `osm-${el.type}-${el.id}`,
    name:          t.name || t['name:en'] || t['name:te'] || '',
    address:       [
      t['addr:housenumber'],
      t['addr:street'],
      t['addr:suburb'] || t['addr:village'] || t['addr:city'],
    ].filter(Boolean).join(', ') || t['addr:full'] || '',
    phone:         t['contact:phone'] || t.phone || '',
    website:       t['contact:website'] || t.website || '',
    opening_hours: t.opening_hours || '',
    coords:        { lat, lng },
    osmType:       el.type,
    osmId:         el.id,
    ownershipType: deriveOwnership(t),   // 'government' | 'private' | 'unknown'
    _source:       'OpenStreetMap contributors (ODbL)',
    tags:          t,
  };

  if (refCoords) {
    record.distance      = parseFloat(haversineKm(refCoords.lat, refCoords.lng, lat, lng).toFixed(2));
    record._distanceNote = 'Straight-line distance — not road distance';
  }

  return record;
}

// ─── Fetch + cache ────────────────────────────────────────────────────────────

const RADIUS = 10000; // 10 km

async function fetchCategory(selectedLocation, category, filters) {
  const cacheKey = `${selectedLocation.label}::${category}`;

  if (_cache[cacheKey]) {
    return { results: _cache[cacheKey], fromCache: true, error: null };
  }

  // De-duplicate: if the same key is already in-flight, wait for it
  if (_inflight[cacheKey]) {
    return _inflight[cacheKey];
  }

  const promise = (async () => {
    // 1. Resolve coordinates
    let coords = selectedLocation.coords || null;
    if (!coords) coords = await geocodeLocation(selectedLocation.label);
    if (!coords) {
      return {
        results:   [],
        coords:    null,
        fromCache: false,
        error:     `Could not resolve coordinates for "${selectedLocation.label}". Try a different location.`,
      };
    }

    // 2. Query Overpass
    try {
      const ql   = buildQuery(coords.lat, coords.lng, RADIUS, filters);
      const data = await runOverpassQuery(ql);

      const results = (data.elements || [])
        .map((el) => {
          const centre = el.center
            ? { lat: el.center.lat, lng: el.center.lon }
            : { lat: el.lat,        lng: el.lon };
          // Skip elements whose coordinates are missing (some way elements lack a center)
          if (!centre.lat || !centre.lng) return null;
          return normaliseElement(el, centre, coords);
        })
        // Drop nulls (missing coords) and records with neither a name nor an address
        .filter((r) => r && (r.name || r.address))
        .sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999));

      _cache[cacheKey] = results;
      return { results, coords, fromCache: false, error: null };
    } catch (err) {
      const msg = err.name === 'AbortError'
        ? 'Request timed out (20 s). The Overpass servers may be busy — please retry.'
        : `Could not load live data: ${err.message}. Check your connection and try again.`;
      return { results: [], coords, fromCache: false, error: msg };
    }
  })();

  _inflight[cacheKey] = promise;
  const result = await promise;
  delete _inflight[cacheKey];
  return result;
}

// ─── Category fetchers ────────────────────────────────────────────────────────
//
// Tag selection principles:
//   • Only OSM tags with documented real-world usage in India are included.
//   • landuse=* and boundary=* are excluded — they return large area polygons
//     that are prohibitively expensive in an around: query.
//   • Each filter generates node + way sub-queries; adding too many filters
//     risks hitting the 20 s server timeout on sparse servers.
//   • Tags that overlap across two categories (e.g. amenity=kindergarten in
//     both Education and WomenChild) are intentional — a childcare centre
//     belongs in both contextual searches.
//
// Coverage note:
//   Broader tag coverage surfaces more of what OSM contributors have mapped,
//   but does NOT guarantee complete local listings. OSM mapping in rural
//   Andhra Pradesh is uneven. Empty or partial results are normal and honest.

/** Clear the cache entry for a given location + category (used by retry). */
export function clearOverpassCache(label, category) {
  delete _cache[`${label}::${category}`];
}

export const overpassService = {
  getMedical: (loc) =>
    fetchCategory(loc, 'medical', [
      // Core amenity tags — widely used globally and in India
      'amenity=hospital',
      'amenity=clinic',
      'amenity=pharmacy',
      'amenity=doctors',
      'amenity=dentist',
      'amenity=nursing_home',
      'amenity=health_post',
      'amenity=blood_bank',
      // healthcare=* namespace — more specific, used in India for PHCs,
      // CHCs, sub-centres, and specialist services
      'healthcare=hospital',
      'healthcare=clinic',
      'healthcare=pharmacy',
      'healthcare=dentist',
      'healthcare=laboratory',
      'healthcare=centre',       // community health centres (CHC)
    ]),

  getEducation: (loc) =>
    fetchCategory(loc, 'education', [
      // Standard amenity tags
      'amenity=school',
      'amenity=college',
      'amenity=university',
      'amenity=kindergarten',
      // Training and coaching — common in India, often mapped under these tags
      'amenity=training',
      'amenity=language_school',
      // office=educational_institution covers degree colleges and institutes
      // registered as offices rather than amenities in OSM India
      'office=educational_institution',
    ]),

  getBusiness: (loc) =>
    fetchCategory(loc, 'business', [
      // Food & drink
      'amenity=restaurant',
      'amenity=cafe',
      'amenity=fast_food',
      // Financial
      'amenity=bank',
      'amenity=atm',
      // Fuel
      'amenity=fuel',
      // Retail — shop=* namespace
      'shop=supermarket',
      'shop=convenience',
      'shop=general',
      'shop=clothes',
      'shop=hardware',
      'shop=electronics',
      'shop=mobile_phone',
      'shop=bakery',
      // shop=chemist covers non-prescription health/beauty retailers
      // (distinct from amenity=pharmacy which requires a pharmacist)
      'shop=chemist',
    ]),

  getGovernment: (loc) =>
    fetchCategory(loc, 'government', [
      'amenity=townhall',
      'amenity=post_office',
      'amenity=police',
      'amenity=courthouse',
      'amenity=fire_station',
      // amenity=register_office — civil registration, used in India
      'amenity=register_office',
      'office=government',
      'office=administrative',
      // office=public covers village/ward secretariats and revenue offices
      'office=public',
    ]),

  getAgriculture: (loc) =>
    fetchCategory(loc, 'agriculture', [
      'amenity=veterinary',
      'amenity=marketplace',
      'shop=agrarian',           // agri-input shops (seeds, fertilizer, tools)
      'shop=farm',
      // Additional retail tags used in India for agri supply stores
      'shop=seeds',
      'shop=fertilizer',
      'shop=horticulture',
      // office=agricultural covers agriculture extension offices and KVKs
      'office=agricultural',
    ]),

  getWomenChild: (loc) =>
    fetchCategory(loc, 'women-child', [
      'amenity=social_facility',
      'amenity=community_centre',
      'amenity=childcare',
      // amenity=kindergarten overlaps with Education but is also relevant here
      'amenity=kindergarten',
      // healthcare=maternity — maternity homes and mother & child health units
      'healthcare=maternity',
      // office=ngo — NGOs running women's / child welfare programmes
      'office=ngo',
    ]),
};

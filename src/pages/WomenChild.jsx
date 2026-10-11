import { useState, useMemo } from 'react';
import { Users, MapPin, Info, RefreshCw } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import OsmResultCard from '../components/OsmResultCard';
import FilterBar from '../components/FilterBar';
import OwnershipFilterBar from '../components/OwnershipFilterBar';
import { useOverpassData } from '../hooks/useOverpassData';
import { overpassService } from '../services/overpassService';

const FILTERS = [
  { id: 'all',               label: 'All' },
  { id: 'social_facility',   label: 'Social Facilities' },
  { id: 'community_centre',  label: 'Community Centres' },
  { id: 'childcare',         label: 'Childcare' },
  { id: 'kindergarten',      label: 'Anganwadi / Kindergartens' },
  { id: 'maternity',         label: 'Maternity' },
  { id: 'ngo',               label: 'NGOs' },
];

export default function WomenChild() {
  const { results, loading, error, locationLabel, retry } =
    useOverpassData(overpassService.getWomenChild, 'women-child');
  const [activeFilter,    setActiveFilter]    = useState('all');
  const [ownershipFilter, setOwnershipFilter] = useState('all');

  const filtered = useMemo(() => {
    let r = results;
    // amenity= (social_facility, community_centre, childcare, kindergarten),
    // healthcare= (maternity), office= (ngo)
    if (activeFilter !== 'all') {
      r = r.filter(
        (x) =>
          x.tags?.amenity    === activeFilter ||
          x.tags?.healthcare === activeFilter ||
          x.tags?.office     === activeFilter
      );
    }
    if (ownershipFilter !== 'all') {
      r = r.filter((x) => x.ownershipType === ownershipFilter);
    }
    return r;
  }, [results, activeFilter, ownershipFilter]);

  const retryAction = (
    <button onClick={retry} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-all">
      <RefreshCw className="w-4 h-4" /> Retry
    </button>
  );

  return (
    <div>
      <PageHeader
        title="Women & Child Services Near You"
        subtitle="Social facilities, community centres and childcare from OpenStreetMap."
        icon={Users}
        breadcrumbs={[{ label: 'Women & Child' }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <MapPin className="w-4 h-4 text-primary-600" />
          <span className="font-medium">{locationLabel}</span>
        </div>

        <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 rounded-xl px-4 py-3 mb-6">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400" />
          <span>
            Results are fetched live from <strong>OpenStreetMap</strong> for the selected location (10 km radius).
            Social facilities are sparsely mapped in OSM for many areas — empty results are common.
            Ownership classification uses the OSM <code>operator:type</code> tag — most records lack this tag, so "Government" and "Private" filters will return fewer results.
            Distances are straight-line only.
          </span>
        </div>

        {loading && <LoadingState text="Fetching women & child services…" />}

        {!loading && error && (
          <EmptyState title="Could not load results" description={error} action={retryAction} />
        )}

        {!loading && !error && (
          <>
            <FilterBar filters={FILTERS} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            <OwnershipFilterBar activeOwnership={ownershipFilter} onOwnershipChange={setOwnershipFilter} />

            <p className="text-xs text-slate-400 mb-4">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} within 10 km
              {ownershipFilter !== 'all' && ` · ${ownershipFilter} only`}
            </p>

            {filtered.length === 0 ? (
              <EmptyState
                title="No services found"
                description={
                  ownershipFilter !== 'all'
                    ? `No ${ownershipFilter} services found here. Most OSM records lack ownership tags — try "All ownership" to see all results.`
                    : activeFilter !== 'all'
                      ? `No "${activeFilter}" results in this area. Try a different filter or change location.`
                      : `No social facilities or community centres are mapped on OpenStreetMap within 10 km of ${locationLabel}. This category is often sparsely mapped.`
                }
                action={retryAction}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((r) => (
                  <OsmResultCard
                    key={r.id}
                    result={r}
                    typeBadge={r.tags?.amenity || r.tags?.healthcare || r.tags?.office || 'Community'}
                    badgeColor="bg-pink-50 text-pink-600"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Wheat, MapPin, Info, RefreshCw } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import OsmResultCard from '../components/OsmResultCard';
import FilterBar from '../components/FilterBar';
import OwnershipFilterBar from '../components/OwnershipFilterBar';
import { useOverpassData } from '../hooks/useOverpassData';
import { overpassService } from '../services/overpassService';

const FILTERS = [
  { id: 'all',           label: 'All' },
  { id: 'veterinary',    label: 'Veterinary' },
  { id: 'marketplace',   label: 'Marketplaces' },
  { id: 'agrarian',      label: 'Agri Shops' },
  { id: 'farm',          label: 'Farm Shops' },
  { id: 'seeds',         label: 'Seed Shops' },
  { id: 'fertilizer',    label: 'Fertilizer Shops' },
  { id: 'horticulture',  label: 'Horticulture' },
  { id: 'agricultural',  label: 'Agri Offices' },
];

export default function Agriculture() {
  const { results, loading, error, locationLabel, retry } =
    useOverpassData(overpassService.getAgriculture, 'agriculture');
  const [activeFilter,    setActiveFilter]    = useState('all');
  const [ownershipFilter, setOwnershipFilter] = useState('all');

  const filtered = useMemo(() => {
    let r = results;
    // amenity= (veterinary, marketplace), shop= (agrarian, farm, seeds…),
    // office= (agricultural extension offices)
    if (activeFilter !== 'all') {
      r = r.filter(
        (x) =>
          x.tags?.amenity === activeFilter ||
          x.tags?.shop    === activeFilter ||
          x.tags?.office  === activeFilter
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
        title="Agriculture Services Near You"
        subtitle="Veterinary clinics, agri shops and farmer support from OpenStreetMap."
        icon={Wheat}
        breadcrumbs={[{ label: 'Agriculture' }]}
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
            Agriculture-related amenities are sparsely mapped in OSM for many rural areas — empty results are common.
            Ownership classification uses the OSM <code>operator:type</code> tag — most records lack this tag, so "Government" and "Private" filters will return fewer results.
            Distances are straight-line only.
          </span>
        </div>

        {loading && <LoadingState text="Fetching agriculture services…" />}

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
                title="No agriculture services found"
                description={
                  ownershipFilter !== 'all'
                    ? `No ${ownershipFilter} agriculture services found here. Most OSM records lack ownership tags — try "All ownership" to see all results.`
                    : activeFilter !== 'all'
                      ? `No "${activeFilter}" results in this area. Try a different filter or change location.`
                      : `No veterinary clinics or agri shops are mapped on OpenStreetMap within 10 km of ${locationLabel}. Agriculture data is often sparse in OSM.`
                }
                action={retryAction}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((r) => (
                  <OsmResultCard
                    key={r.id}
                    result={r}
                    typeBadge={r.tags?.amenity || r.tags?.shop || r.tags?.office || 'Agriculture'}
                    badgeColor="bg-accent-50 text-accent-600"
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

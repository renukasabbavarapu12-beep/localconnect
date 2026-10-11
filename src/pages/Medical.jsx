import { useState, useMemo } from 'react';
import { Hospital, MapPin, Info, RefreshCw } from 'lucide-react';
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
  { id: 'hospital',      label: 'Hospitals' },
  { id: 'clinic',        label: 'Clinics' },
  { id: 'centre',        label: 'Health Centres' },
  { id: 'pharmacy',      label: 'Pharmacies' },
  { id: 'doctors',       label: 'Doctors' },
  { id: 'dentist',       label: 'Dentists' },
  { id: 'nursing_home',  label: 'Nursing Homes' },
  { id: 'health_post',   label: 'Health Posts' },
  { id: 'laboratory',    label: 'Labs' },
  { id: 'blood_bank',    label: 'Blood Banks' },
];

export default function Medical() {
  const { results, loading, error, locationLabel, retry } =
    useOverpassData(overpassService.getMedical, 'medical');
  const [activeFilter,    setActiveFilter]    = useState('all');
  const [ownershipFilter, setOwnershipFilter] = useState('all');

  const filtered = useMemo(() => {
    let r = results;
    if (activeFilter !== 'all') {
      r = r.filter(
        (x) => x.tags?.amenity === activeFilter || x.tags?.healthcare === activeFilter
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
        title="Medical Services Near You"
        subtitle="Hospitals, clinics, pharmacies and health services from OpenStreetMap."
        icon={Hospital}
        breadcrumbs={[{ label: 'Medical' }]}
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
            Coverage depends on what has been mapped by OSM contributors for this area.
            Ownership classification uses the OSM <code>operator:type</code> tag — most records lack this tag, so "Government" and "Private" filters will return fewer results.
            Distances are straight-line only.
          </span>
        </div>

        {loading && <LoadingState text="Fetching medical services…" />}

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
                title="No medical services found"
                description={
                  ownershipFilter !== 'all'
                    ? `No ${ownershipFilter} medical facilities found here. Most OSM records lack ownership tags — try "All ownership" to see all results.`
                    : activeFilter !== 'all'
                      ? `No "${activeFilter}" results in this area. Try a different filter or change location.`
                      : `No hospitals, clinics or pharmacies are mapped on OpenStreetMap within 10 km of ${locationLabel}. Try a nearby town or change location.`
                }
                action={retryAction}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((r) => (
                  <OsmResultCard
                    key={r.id}
                    result={r}
                    typeBadge={r.tags?.amenity || r.tags?.healthcare || 'Medical'}
                    badgeColor="bg-red-50 text-red-600"
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

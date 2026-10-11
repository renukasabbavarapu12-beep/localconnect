import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, SearchX } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { dataService } from '../services/dataService';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(dataService.searchAll(initialQuery));
  }, [initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(query.trim() ? { q: query.trim() } : {});
  };

  const badgeColors = {
    Hospital: 'bg-red-50 text-red-600',
    School: 'bg-blue-50 text-blue-600',
    Business: 'bg-amber-50 text-amber-600',
    'Government Service': 'bg-primary-50 text-primary-600',
    Scheme: 'bg-accent-50 text-accent-600',
  };

  return (
    <div>
      <PageHeader
        title="Search Services & Schemes"
        subtitle="Search across hospitals, schools, businesses, government services and schemes."
        icon={Search}
        breadcrumbs={[{ label: 'Search' }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSearch} className="max-w-2xl mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search hospitals, schools, businesses, schemes..."
                className="w-full pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all text-sm"
              />
            </div>
            <button type="submit" className="btn-primary px-6">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </form>

        {initialQuery && (
          <p className="text-sm text-slate-500 mb-6">
            {results.length} result{results.length !== 1 ? 's' : ''} for "<span className="font-semibold text-slate-700">{initialQuery}</span>"
          </p>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((r) => (
              <Link
                key={`${r.resultType}-${r.id}`}
                to={r.route}
                className="card group p-5 flex flex-col animate-fade-in-up"
              >
                <span className={`badge mb-3 ${badgeColors[r.resultType] || 'bg-slate-100 text-slate-600'}`}>
                  {r.resultType}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-primary-600 transition-colors">
                  {r.name}
                </h3>
                {r.overview && (
                  <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">
                    {r.overview}
                  </p>
                )}
                {r.address && (
                  <p className="text-sm text-slate-500 mb-3 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    {r.address}
                  </p>
                )}
                {r.distance != null && (
                  <span className="badge bg-primary-50 text-primary-600 mb-3 self-start">
                    <MapPin className="w-3 h-3" />
                    {r.distance} km
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2.5 transition-all mt-auto">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        ) : initialQuery ? (
          <EmptyState
            icon={SearchX}
            title="No results found"
            description={`No services or schemes matched "${initialQuery}". Try a different search term.`}
          />
        ) : (
          <EmptyState
            icon={Search}
            title="Start searching"
            description="Search for hospitals, schools, businesses, government services and schemes near you."
          />
        )}
      </div>
    </div>
  );
}

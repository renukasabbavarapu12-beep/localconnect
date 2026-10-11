/**
 * OwnershipFilterBar
 *
 * A secondary filter bar for Government / Private / All ownership filtering
 * of live OSM results. Ownership is derived from the OSM `operator:type` tag.
 *
 * Limitation: most OSM records in rural India do not carry `operator:type`,
 * so the majority of results will be classified as "Ownership unknown" and
 * will only appear under "All". The Government and Private filters will only
 * return results when a mapper has explicitly tagged `operator:type`.
 */

const OPTIONS = [
  { id: 'all',        label: 'All ownership' },
  { id: 'government', label: 'Government' },
  { id: 'private',    label: 'Private' },
];

export default function OwnershipFilterBar({ activeOwnership, onOwnershipChange }) {
  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-1">
        Ownership
      </span>
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onOwnershipChange(opt.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            activeOwnership === opt.id
              ? opt.id === 'government'
                ? 'bg-blue-600 text-white shadow-sm'
                : opt.id === 'private'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-700 text-white shadow-sm'
              : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400 hover:text-slate-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

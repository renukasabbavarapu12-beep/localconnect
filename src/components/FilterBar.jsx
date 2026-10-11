export default function FilterBar({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeFilter === filter.id
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

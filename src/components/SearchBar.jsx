import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export default function SearchBar({ placeholder = 'Search hospitals, schools, businesses, schemes...', className = '' }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');
    if (query && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            name="query"
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all text-sm"
          />
        </div>
        <button type="submit" className="btn-primary px-6">
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  );
}

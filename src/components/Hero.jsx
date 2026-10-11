import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, Loader2, AlertCircle } from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';

export default function Hero() {
  const navigate = useNavigate();
  const { selectedLocation, geoStatus, geoError, useMyLocation } = useLocationContext();

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');
    if (query && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Scroll to the LocationSelector card on the homepage
  const handleChangeLocation = () => {
    const el = document.getElementById('location-selector');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // We might be on a different page — navigate home first, then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById('location-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  const isLoading = geoStatus === 'loading';

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-24 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Location Badge — live from context */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate max-w-[260px]">{selectedLocation.label}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5 animate-fade-in-up">
            Discover Services & Government Benefits Near You
          </h1>

          <p className="text-base sm:text-lg text-primary-100 leading-relaxed mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Find nearby hospitals, schools, businesses and government services, and discover
            the schemes and benefits available in your area.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
            <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-2 shadow-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="query"
                  placeholder="Search hospitals, schools, businesses, schemes..."
                  className="w-full pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 bg-transparent rounded-xl focus:outline-none text-sm sm:text-base"
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-6 py-3.5 text-sm sm:text-base whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </form>

          {/* Geolocation error banner */}
          {geoError && (
            <div className="max-w-xl mx-auto mb-4 flex items-start gap-2 px-4 py-3 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 text-white text-xs text-left">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{geoError}</span>
            </div>
          )}

          {/* Location Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={useMyLocation}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/25 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Navigation className="w-4 h-4" />}
              {isLoading ? 'Detecting…' : 'Use My Location'}
            </button>
            <button
              onClick={handleChangeLocation}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-primary-100 font-medium rounded-xl hover:text-white transition-all text-sm"
            >
              <MapPin className="w-4 h-4" />
              Change Location
            </button>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full h-12 sm:h-16" preserveAspectRatio="none">
          <path d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z" fill="rgb(248 250 252)" />
        </svg>
      </div>
    </section>
  );
}

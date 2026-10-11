import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Menu,
  X,
  Search,
  LogIn,
  ChevronDown,
} from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';

export default function Navbar() {
  const { selectedLocation } = useLocationContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locDropdown, setLocDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Scroll to the location selector on the homepage (navigate there first if needed)
  const handleChangeLocation = () => {
    setLocDropdown(false);
    setMobileOpen(false);
    const el = document.getElementById('location-selector');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('location-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/categories', label: 'Categories' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Local<span className="text-primary-600">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-48 pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white focus:w-64 transition-all"
              />
            </form>

            {/* Location selector */}
            <div className="relative">
              <button
                onClick={() => setLocDropdown(!locDropdown)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
              >
                <MapPin className="w-4 h-4 text-primary-600" />
                <span className="max-w-[140px] truncate">{selectedLocation.village}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {locDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 p-3 animate-slide-down">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    Current Location
                  </p>
                  <p className="text-sm font-semibold text-slate-800 mb-3">
                    {selectedLocation.label}
                  </p>
                  <button
                    onClick={handleChangeLocation}
                    className="block w-full text-center text-sm text-primary-600 font-semibold py-2 rounded-lg hover:bg-primary-50 transition-all"
                  >
                    Change Location
                  </button>
                </div>
              )}
            </div>

            <Link to="/contact" className="btn-primary text-sm">
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, schemes..."
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </form>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50">
              <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700 truncate">
                {selectedLocation.label}
              </span>
            </div>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full text-sm"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Local<span className="text-primary-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              A digital platform helping people discover local services, institutions,
              and government schemes available in their area.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/medical" className="hover:text-primary-400 transition-colors">Medical</Link></li>
              <li><Link to="/education" className="hover:text-primary-400 transition-colors">Education</Link></li>
              <li><Link to="/business" className="hover:text-primary-400 transition-colors">Business</Link></li>
              <li><Link to="/government" className="hover:text-primary-400 transition-colors">Government</Link></li>
              <li><Link to="/agriculture" className="hover:text-primary-400 transition-colors">Agriculture</Link></li>
              <li><Link to="/women-child" className="hover:text-primary-400 transition-colors">Women & Child</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link to="/search" className="hover:text-primary-400 transition-colors">Search</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span>Tagarapuvalasa, Visakhapatnam, Andhra Pradesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>support@localconnect.in</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>+91 1800 XXX XXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2026 LocalConnect. Phase 1 Prototype — Dummy data only.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for local communities
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Compass className="w-10 h-10 text-primary-600" />
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 mb-3">404</h1>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link to="/" className="btn-primary">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Info } from 'lucide-react';
import { getSchemesByIds } from '../data/schemes';
import SchemeCard from './SchemeCard';

export default function DetailsSection({
  title,
  item,
  backRoute,
  backLabel,
  schemesTitle = 'Government Schemes Available',
  children,
}) {
  const associatedSchemes = getSchemesByIds(item.schemeIds || []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to={backRoute}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Link>

      {/* Image Placeholder */}
      <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl font-bold text-slate-400">📷</span>
          </div>
          <p className="text-sm text-slate-400">Image placeholder</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {children}

          {/* Schemes Section */}
          {associatedSchemes.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-accent-50 rounded-lg flex items-center justify-center">
                  <span className="text-accent-600 font-bold text-sm">₹</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">{schemesTitle}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {associatedSchemes.map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-primary-50 rounded-2xl p-5 sticky top-20">
            <div className="flex items-start gap-2 mb-3">
              <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Phase 1 Notice</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  This is a prototype using dummy data. Real-time information will be available in Phase 2.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

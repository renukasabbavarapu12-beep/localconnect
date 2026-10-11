import { Link } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2, Users, FileCheck } from 'lucide-react';

export default function SchemeCard({ scheme, showViewDetails = true }) {
  const { id, name, category, benefits, eligibility, targetUsers, requiredDocuments, overview } = scheme;

  return (
    <div className="card p-5 flex flex-col animate-fade-in-up border-l-4 border-l-accent-500">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-accent-600" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="badge bg-accent-50 text-accent-700 mb-1">{category}</span>
          <h3 className="text-base font-bold text-slate-900 leading-snug">{name}</h3>
        </div>
      </div>

      {overview && (
        <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {overview}
        </p>
      )}

      {benefits && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Benefits
          </p>
          <ul className="space-y-1">
            {benefits.slice(0, 2).map((b) => (
              <li key={b} className="text-sm text-slate-600 flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 flex-shrink-0" />
                <span className="leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {eligibility && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> Eligibility
          </p>
          <p className="text-sm text-slate-600 leading-snug">
            {Array.isArray(eligibility) ? eligibility[0] : eligibility}
          </p>
        </div>
      )}

      {requiredDocuments && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5" /> Documents Required
          </p>
          <div className="flex flex-wrap gap-1.5">
            {requiredDocuments.slice(0, 3).map((doc) => (
              <span key={doc} className="badge bg-slate-100 text-slate-600">
                {doc}
              </span>
            ))}
            {requiredDocuments.length > 3 && (
              <span className="badge bg-slate-100 text-slate-500">
                +{requiredDocuments.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {showViewDetails && (
        <Link
          to={`/scheme/${id}`}
          className="btn-secondary text-sm mt-auto"
        >
          View Scheme Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

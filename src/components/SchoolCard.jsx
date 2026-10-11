import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

export default function SchoolCard({ school }) {
  const { id, name, type, address, distance, facilities } = school;

  return (
    <div className="card p-5 flex flex-col animate-fade-in-up">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 leading-snug">{name}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{type}</p>
        </div>
        <span className="text-xs text-slate-400 italic flex-shrink-0">Not yet rated</span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-3 flex-1">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <span className="leading-snug">{address}</span>
        </div>
        <span className="badge bg-primary-50 text-primary-600">
          <MapPin className="w-3 h-3" />
          {distance} km away
        </span>
      </div>

      {facilities && facilities.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {facilities.slice(0, 4).map((f) => (
            <span key={f} className="badge bg-slate-100 text-slate-600">
              {f}
            </span>
          ))}
          {facilities.length > 4 && (
            <span className="badge bg-slate-100 text-slate-500">
              +{facilities.length - 4} more
            </span>
          )}
        </div>
      )}

      <Link
        to={`/education/school/${id}`}
        className="btn-primary text-sm"
      >
        View Details
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

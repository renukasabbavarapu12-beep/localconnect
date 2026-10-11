import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

export default function GovernmentOfficeCard({ office }) {
  const { id, name, type, address, distance, phone, hours, services } = office;

  return (
    <div className="card p-5 flex flex-col animate-fade-in-up">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <span className="badge bg-primary-50 text-primary-700 mb-2">{type}</span>
          <h3 className="text-base font-bold text-slate-900 leading-snug">{name}</h3>
        </div>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-3 flex-1">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <span className="leading-snug">{address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span>{hours}</span>
        </div>
        <span className="badge bg-accent-50 text-accent-700">
          <MapPin className="w-3 h-3" />
          {distance} km away
        </span>
      </div>

      {services && services.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
            Services
          </p>
          <div className="flex flex-wrap gap-1.5">
            {services.slice(0, 4).map((s) => (
              <span key={s} className="badge bg-slate-100 text-slate-600">
                {s}
              </span>
            ))}
            {services.length > 4 && (
              <span className="badge bg-slate-100 text-slate-500">
                +{services.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      <Link
        to={`/government/office/${id}`}
        className="btn-primary text-sm"
      >
        View Details
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

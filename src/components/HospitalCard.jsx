import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HospitalCard({ hospital }) {
  const {
    id,
    name,
    type,
    address,
    distance,
    phone,
    emergency,
    status,
  } = hospital;

  return (
    <div className="card p-5 flex flex-col animate-fade-in-up">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <span className={`badge mb-2 ${status === 'Open' ? 'bg-accent-50 text-accent-700' : 'bg-red-50 text-red-600'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status === 'Open' ? 'bg-accent-500' : 'bg-red-500'}`} />
            {status}
          </span>
          <h3 className="text-base font-bold text-slate-900 leading-snug">{name}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{type}</p>
        </div>
        <span className="text-xs text-slate-400 italic flex-shrink-0">Not yet rated</span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4 flex-1">
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
          <span>{hospital.workingHours}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {emergency && (
          <span className="badge bg-red-50 text-red-600">
            <ShieldCheck className="w-3 h-3" />
            Emergency
          </span>
        )}
        <span className="badge bg-primary-50 text-primary-600">
          <MapPin className="w-3 h-3" />
          {distance} km away
        </span>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/medical/hospital/${id}`}
          className="btn-primary flex-1 text-sm"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button className="btn-secondary px-3" title="Get Directions">
          <Navigation className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

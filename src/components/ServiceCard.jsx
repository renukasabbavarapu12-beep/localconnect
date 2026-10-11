import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const badgeColorClasses = {
  primary: { bg: 'bg-primary-50', text: 'text-primary-600' },
  accent: { bg: 'bg-accent-50', text: 'text-accent-600' },
  red: { bg: 'bg-red-50', text: 'text-red-600' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
};

export default function ServiceCard({
  id,
  name,
  description,
  distance,
  icon: Icon,
  route,
  badgeText,
  badgeColor = 'primary',
}) {
  const colors = badgeColorClasses[badgeColor] || badgeColorClasses.primary;

  return (
    <Link
      to={route}
      className="card group p-5 flex flex-col animate-fade-in-up"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text}`}>
          <Icon className="w-6 h-6" />
        </div>
        {distance != null && (
          <span className="badge bg-slate-100 text-slate-600">
            <MapPin className="w-3 h-3" />
            {distance} km
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-primary-600 transition-colors">
        {name}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
        {description}
      </p>
      {badgeText && (
        <span className={`badge ${colors.bg} ${colors.text} mb-3`}>
          {badgeText}
        </span>
      )}
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2.5 transition-all">
        View
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}

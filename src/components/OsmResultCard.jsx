/**
 * OsmResultCard
 *
 * Generic card for a result returned by overpassService.
 * Only renders fields that are actually present in the data.
 * Never invents phone numbers, hours, ratings, or distances.
 */
import { MapPin, Phone, Globe, Navigation } from 'lucide-react';

// Ownership badge styles — only rendered when operator:type is explicitly tagged in OSM.
// 'unknown' ownership renders nothing (no badge) so we don't mislead the user.
const OWNERSHIP_BADGE = {
  government: 'bg-blue-50 text-blue-700 border border-blue-100',
  private:    'bg-amber-50 text-amber-700 border border-amber-100',
};
const OWNERSHIP_LABEL = {
  government: 'Government',
  private:    'Private',
};

export default function OsmResultCard({ result, typeBadge, badgeColor = 'bg-primary-50 text-primary-600' }) {
  const { name, address, phone, website, distance, _distanceNote, _source, ownershipType } = result;

  const googleMapsUrl = result.coords
    ? `https://www.google.com/maps/search/?api=1&query=${result.coords.lat},${result.coords.lng}`
    : null;

  const ownershipBadgeClass = OWNERSHIP_BADGE[ownershipType];
  const ownershipLabel      = OWNERSHIP_LABEL[ownershipType];

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        {typeBadge && (
          <span className={`badge self-start ${badgeColor}`}>{typeBadge}</span>
        )}
        {ownershipBadgeClass && (
          <span className={`badge self-start text-xs ${ownershipBadgeClass}`}>
            {ownershipLabel}
          </span>
        )}
      </div>

      <h3 className="font-bold text-slate-900 text-base leading-snug">{name}</h3>

      {address && (
        <div className="flex items-start gap-2 text-sm text-slate-500">
          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <span>{address}</span>
        </div>
      )}

      {phone && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <a href={`tel:${phone}`} className="hover:text-primary-600 transition-colors">{phone}</a>
        </div>
      )}

      {website && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <a
            href={website.startsWith('http') ? website : `https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-600 truncate"
          >
            {website}
          </a>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-1 border-t border-slate-100">
        {distance != null ? (
          <span
            className="text-xs text-slate-400"
            title={_distanceNote || ''}
          >
            ~{distance} km away *
          </span>
        ) : (
          <span />
        )}

        {googleMapsUrl && (
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline"
          >
            <Navigation className="w-3.5 h-3.5" />
            Directions
          </a>
        )}
      </div>

      <p className="text-xs text-slate-300">Source: {_source}</p>
    </div>
  );
}

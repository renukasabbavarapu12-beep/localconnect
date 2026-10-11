import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { getBusinessById } from '../data/businesses';
import { getSchemesByIds } from '../data/schemes';
import SchemeCard from '../components/SchemeCard';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { Store } from 'lucide-react';

export default function BusinessDetails() {
  const { id } = useParams();
  const business = getBusinessById(id);

  if (!business) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Business not found"
          description="The business you're looking for doesn't exist."
          action={<Link to="/business" className="btn-primary text-sm">Back to Business</Link>}
        />
      </div>
    );
  }

  const associatedSchemes = getSchemesByIds(business.schemeIds || []);

  return (
    <div>
      <PageHeader
        title={business.name}
        subtitle={business.category}
        icon={Store}
        breadcrumbs={[
          { label: 'Business', route: '/business' },
          { label: business.name },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/business" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Business
        </Link>

        <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl mb-6 flex items-center justify-center">
          <Store className="w-16 h-16 text-amber-400" />
        </div>

        {/* Curated seed data disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Curated record</strong> — This entry is part of a seed dataset for demonstration purposes.
            Contact details, hours, and services may be outdated or approximate.
            Always verify directly with the business before visiting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Address</p>
                    <p className="text-sm text-slate-700">{business.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Phone</p>
                    <p className="text-sm text-slate-700">{business.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Hours</p>
                    <p className="text-sm text-slate-700">{business.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Distance</p>
                    <p className="text-sm text-slate-700">{business.distance} km away</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <a href={`tel:${business.phone}`} className="btn-primary text-sm">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>

            {associatedSchemes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-accent-50 rounded-lg flex items-center justify-center">
                    <span className="text-accent-600 font-bold text-sm">₹</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">Business Support Schemes</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {associatedSchemes.map((s) => (
                    <SchemeCard key={s.id} scheme={s} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sticky top-20">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">About this record</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                This is a curated seed record included for demonstration purposes. It is not sourced from a live
                database. Contact information may be outdated or approximate — please verify before visiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

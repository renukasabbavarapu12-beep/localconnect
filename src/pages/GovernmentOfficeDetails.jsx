import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowLeft, AlertTriangle } from 'lucide-react';
import { getGovernmentServiceById } from '../data/governmentServices';
import { getSchemesByIds } from '../data/schemes';
import SchemeCard from '../components/SchemeCard';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { Landmark, CheckCircle2 } from 'lucide-react';

export default function GovernmentOfficeDetails() {
  const { id } = useParams();
  const office = getGovernmentServiceById(id);

  if (!office) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Office not found"
          description="The office you're looking for doesn't exist."
          action={<Link to="/government" className="btn-primary text-sm">Back to Government Services</Link>}
        />
      </div>
    );
  }

  const associatedSchemes = getSchemesByIds(office.schemeIds || []);

  return (
    <div>
      <PageHeader
        title={office.name}
        subtitle={office.type}
        icon={Landmark}
        breadcrumbs={[
          { label: 'Government', route: '/government' },
          { label: office.name },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/government" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Government Services
        </Link>

        <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-6 flex items-center justify-center">
          <Landmark className="w-16 h-16 text-primary-400" />
        </div>

        {/* Curated seed data disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Curated record</strong> — This entry is part of a seed dataset for demonstration purposes.
            Contact details, working hours, and services may be outdated or approximate.
            Always verify directly with the office before visiting.
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
                    <p className="text-sm text-slate-700">{office.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Phone</p>
                    <p className="text-sm text-slate-700">{office.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Working Hours</p>
                    <p className="text-sm text-slate-700">{office.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Distance</p>
                    <p className="text-sm text-slate-700">{office.distance} km away</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
              <h3 className="font-bold text-slate-900 mb-4">Services Provided</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {office.services.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-accent-500" />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {associatedSchemes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-accent-50 rounded-lg flex items-center justify-center">
                    <span className="text-accent-600 font-bold text-sm">₹</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">Available Schemes</h2>
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

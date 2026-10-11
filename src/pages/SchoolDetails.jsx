import { useParams, Link } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowLeft, AlertTriangle, Star } from 'lucide-react';
import { getSchoolById } from '../data/schools';
import { getSchemesByIds } from '../data/schemes';
import SchemeCard from '../components/SchemeCard';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { GraduationCap } from 'lucide-react';

export default function SchoolDetails() {
  const { id } = useParams();
  const school = getSchoolById(id);

  if (!school) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="School not found"
          description="The institution you're looking for doesn't exist."
          action={<Link to="/education" className="btn-primary text-sm">Back to Education</Link>}
        />
      </div>
    );
  }

  const associatedSchemes = getSchemesByIds(school.schemeIds || []);

  return (
    <div>
      <PageHeader
        title={school.name}
        subtitle={school.type}
        icon={GraduationCap}
        breadcrumbs={[
          { label: 'Education', route: '/education' },
          { label: school.name },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/education" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Education
        </Link>

        <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6 flex items-center justify-center">
          <GraduationCap className="w-16 h-16 text-blue-400" />
        </div>

        {/* Curated seed data disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Curated record</strong> — This entry is part of a seed dataset for demonstration purposes.
            Contact details, facilities, and distances may be outdated or approximate.
            Always verify directly with the institution before visiting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Info */}
            <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Address</p>
                    <p className="text-sm text-slate-700">{school.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Distance</p>
                    <p className="text-sm text-slate-700">{school.distance} km away</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Rating</p>
                    <p className="text-sm text-slate-400 italic">Not yet rated</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
              <h3 className="font-bold text-slate-900 mb-4">Facilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {school.facilities.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-accent-500" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Schemes */}
            {associatedSchemes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-accent-50 rounded-lg flex items-center justify-center">
                    <span className="text-accent-600 font-bold text-sm">₹</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">Education Schemes Available</h2>
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

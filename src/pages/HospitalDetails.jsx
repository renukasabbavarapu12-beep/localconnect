import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Navigation, ShieldCheck, CheckCircle2, Hospital, AlertTriangle, Star } from 'lucide-react';
import { getHospitalById } from '../data/hospitals';
import DetailsSection from '../components/DetailsSection';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';

export default function HospitalDetails() {
  const { id } = useParams();
  const hospital = getHospitalById(id);

  if (!hospital) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Hospital not found"
          description="The hospital you're looking for doesn't exist or has been removed."
          action={<Link to="/medical" className="btn-primary text-sm">Back to Medical</Link>}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={hospital.name}
        subtitle={hospital.type}
        icon={Hospital}
        breadcrumbs={[
          { label: 'Medical', route: '/medical' },
          { label: hospital.name },
        ]}
      />
      <DetailsSection
        title={hospital.name}
        item={hospital}
        backRoute="/medical"
        backLabel="Back to Medical Services"
      >
        {/* Curated seed data disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Curated record</strong> — This entry is part of a seed dataset for demonstration purposes.
            Contact details, working hours, and services may be outdated or approximate.
            Always verify directly with the facility before visiting.
          </p>
        </div>

        {/* Info Grid */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow icon={MapPin} label="Address" value={hospital.address} />
            <InfoRow icon={Phone} label="Phone" value={hospital.phone} />
            <InfoRow icon={Clock} label="Working Hours" value={hospital.workingHours} />
            <InfoRow icon={MapPin} label="Distance" value={`${hospital.distance} km away`} />
            <InfoRow icon={Star} label="Rating" value="Not yet rated" />
            <InfoRow icon={ShieldCheck} label="Emergency" value={hospital.emergency ? 'Available' : 'Not Available'} />
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            <button className="btn-primary text-sm">
              <Navigation className="w-4 h-4" />
              Get Directions
            </button>
            <a href={`tel:${hospital.phone}`} className="btn-secondary text-sm">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <h3 className="font-bold text-slate-900 mb-4">Services Offered</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {hospital.services.map((service) => (
              <div key={service} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0" />
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-bold text-slate-900 mb-4">Facilities</h3>
          <div className="flex flex-wrap gap-2">
            {hospital.facilities.map((facility) => (
              <span key={facility} className="badge bg-primary-50 text-primary-600">
                {facility}
              </span>
            ))}
          </div>
        </div>
      </DetailsSection>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-slate-700 font-medium">{value}</p>
      </div>
    </div>
  );
}

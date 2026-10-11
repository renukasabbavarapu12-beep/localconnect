import { Link } from 'react-router-dom';
import {
  Hospital, GraduationCap, Landmark, Store, Pill, Building2,
  ArrowRight, MapPin, ShieldCheck, Users, Globe,
} from 'lucide-react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ServiceCard from '../components/ServiceCard';
import LocationSelector from '../components/LocationSelector';
import StatCard from '../components/StatCard';
import { categories } from '../data/categories';
import { hospitals } from '../data/hospitals';
import { schools } from '../data/schools';
import { businesses } from '../data/businesses';
import { governmentServices } from '../data/governmentServices';
import { schemes } from '../data/schemes';

const popularItems = [
  {
    id: 'pop-hosp',
    name: 'Nearby Hospitals',
    description: 'Government and private hospitals near you',
    distance: 1.2,
    icon: Hospital,
    route: '/medical',
    badgeText: '6 available',
    badgeColor: 'red',
  },
  {
    id: 'pop-school',
    name: 'Government Schools',
    description: 'Primary, secondary and higher education schools',
    distance: 0.8,
    icon: GraduationCap,
    route: '/education',
    badgeText: '6 available',
    badgeColor: 'blue',
  },
  {
    id: 'pop-gov',
    name: 'Government Offices',
    description: 'Village secretariat, revenue and municipal offices',
    distance: 0.5,
    icon: Landmark,
    route: '/government',
    badgeText: '6 available',
    badgeColor: 'primary',
  },
  {
    id: 'pop-pharm',
    name: 'Pharmacies',
    description: 'Medical stores and pharmacies nearby',
    distance: 0.5,
    icon: Pill,
    route: '/medical',
    badgeText: 'Open now',
    badgeColor: 'accent',
  },
  {
    id: 'pop-biz',
    name: 'Local Businesses',
    description: 'Shops, restaurants and service providers',
    distance: 0.3,
    icon: Store,
    route: '/business',
    badgeText: '7 available',
    badgeColor: 'amber',
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Hospital} label="Hospitals & Clinics" value={hospitals.length} color="red" />
          <StatCard icon={GraduationCap} label="Schools & Colleges" value={schools.length} color="blue" />
          <StatCard icon={Store} label="Local Businesses" value={businesses.length} color="amber" />
          <StatCard icon={ShieldCheck} label="Govt. Schemes" value={schemes.length} color="accent" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <span className="badge bg-primary-50 text-primary-600 mb-3">Categories</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Explore Local Services
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Choose a category to discover services and government schemes available near your location.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Popular Near You */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="badge bg-accent-50 text-accent-600 mb-3">Popular</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Popular Near You
              </h2>
              <p className="text-slate-500 mt-2">Quick discovery of the most commonly searched services in your area.</p>
            </div>
            <Link to="/search" className="btn-ghost text-sm hidden sm:inline-flex">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularItems.map((item) => (
              <ServiceCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Location + How It Works */}
      <section id="location-selector" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Selector */}
          <div>
            <div className="mb-6">
              <span className="badge bg-primary-50 text-primary-600 mb-3">Location</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                Set Your Location
              </h2>
              <p className="text-slate-500">
                Select your district, mandal and village to discover services near you.
              </p>
            </div>
            <LocationSelector />
          </div>

          {/* How It Works */}
          <div>
            <div className="mb-6">
              <span className="badge bg-accent-50 text-accent-600 mb-3">How It Works</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                Simple Steps to Connect
              </h2>
              <p className="text-slate-500">
                Finding local services and government schemes is easy with LocalConnect.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: MapPin, title: 'Select your location', desc: 'Choose your district, mandal and village.' },
                { icon: Users, title: 'Choose a category', desc: 'Browse medical, education, business and more.' },
                { icon: Building2, title: 'Find nearby services', desc: 'Discover hospitals, schools and offices near you.' },
                { icon: ShieldCheck, title: 'View available schemes', desc: 'Learn about government benefits and eligibility.' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-2xl shadow-card p-5">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-sm">{i + 1}. {step.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative">
            <Globe className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Connecting Communities with Services & Schemes
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-6">
              LocalConnect bridges the gap between citizens and government services, making it easier
              to discover benefits you're entitled to.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-all">
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

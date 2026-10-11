import { MapPin, Target, Layers, Workflow } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { hospitals } from '../data/hospitals';
import { schools } from '../data/schools';
import { businesses } from '../data/businesses';
import { schemes } from '../data/schemes';

export default function About() {
  const steps = [
    { icon: MapPin, title: 'Select your location', desc: 'Choose your district, mandal and village to get localized results.' },
    { icon: Layers, title: 'Choose a category', desc: 'Browse through medical, education, business, government, agriculture and women & child services.' },
    { icon: Target, title: 'Find nearby services', desc: 'Discover hospitals, schools, offices and businesses near your location.' },
    { icon: Workflow, title: 'View available schemes', desc: 'See government schemes associated with each service and check your eligibility.' },
  ];

  return (
    <div>
      <PageHeader
        title="About LocalConnect"
        subtitle="A digital platform designed to help people discover local services, institutions and government schemes available in their area."
        icon={Target}
        breadcrumbs={[{ label: 'About' }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Intro */}
        <div className="text-center mb-12">
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            LocalConnect is a digital platform designed to help people discover local services,
            institutions and government schemes available in their area. We bridge the gap between
            citizens and the services they need, making it easier to find help and claim benefits.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <StatCard icon={Target} label="Categories" value="6" color="primary" />
          <StatCard icon={MapPin} label="Services Listed" value={hospitals.length + schools.length + businesses.length} color="blue" />
          <StatCard icon={Workflow} label="Govt. Schemes" value={schemes.length} color="accent" />
          <StatCard icon={Layers} label="Phase" value="1" color="amber" />
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Our Mission</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            To empower every citizen with easy access to local services and government schemes.
            We believe that awareness is the first step towards benefiting from public welfare programs.
            LocalConnect aims to be the bridge that connects communities with the resources available to them.
          </p>
        </div>

        {/* What we provide */}
        <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
              <Layers className="w-5 h-5 text-accent-600" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">What LocalConnect Provides</h2>
          </div>
          <ul className="space-y-3">
            {[
              'Discover nearby hospitals, clinics, pharmacies and emergency care services',
              'Find schools, colleges, coaching centers and skill development institutes',
              'Browse local businesses and service providers in your area',
              'Access government offices and public service information',
              'View agriculture services and farmer support centers',
              'Discover women and child welfare services and schemes',
              'Learn about government schemes, their benefits and eligibility criteria',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Workflow className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <step.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">
                    {i + 1}. {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

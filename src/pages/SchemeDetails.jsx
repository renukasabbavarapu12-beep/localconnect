import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FileText, CheckCircle2, Users, FileCheck,
  Info, ExternalLink, ListChecks, ShieldCheck,
} from 'lucide-react';
import { getSchemeById } from '../data/schemes';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';

export default function SchemeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const scheme = getSchemeById(id);

  if (!scheme) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Scheme not found"
          description="The scheme you're looking for doesn't exist."
          action={<Link to="/" className="btn-primary text-sm">Back to Home</Link>}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={scheme.name}
        subtitle={`${scheme.category} Scheme`}
        icon={FileText}
        breadcrumbs={[
          { label: 'Home', route: '/' },
          { label: 'Schemes' },
          { label: scheme.name },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Category Badge */}
        <span className="badge bg-accent-50 text-accent-700 mb-4">{scheme.category}</span>

        {/* Overview */}
        <Section icon={Info} title="Overview">
          <p className="text-sm text-slate-600 leading-relaxed">{scheme.overview}</p>
        </Section>

        {/* Benefits */}
        <Section icon={CheckCircle2} title="Benefits">
          <ul className="space-y-2">
            {scheme.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Who can apply */}
        <Section icon={Users} title="Who Can Apply">
          <p className="text-sm text-slate-600 leading-relaxed">{scheme.whoCanApply}</p>
        </Section>

        {/* Eligibility */}
        <Section icon={ShieldCheck} title="Eligibility Criteria">
          <ul className="space-y-2">
            {scheme.eligibility.map((e, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{e}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Required Documents */}
        <Section icon={FileCheck} title="Required Documents">
          <div className="flex flex-wrap gap-2">
            {scheme.requiredDocuments.map((doc, i) => (
              <span key={i} className="badge bg-slate-100 text-slate-700">
                <FileCheck className="w-3 h-3" />
                {doc}
              </span>
            ))}
          </div>
        </Section>

        {/* How to apply */}
        <Section icon={ListChecks} title="How to Apply">
          <ol className="space-y-3">
            {scheme.howToApply.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary-600 text-white text-xs font-bold rounded-lg flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-600 leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Important info */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-900 text-sm mb-1">Important Information</h3>
              <p className="text-xs text-amber-800 leading-relaxed">{scheme.importantInfo}</p>
            </div>
          </div>
        </div>

        {/* Official source */}
        <div className="bg-slate-50 rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
            Official Source
          </p>
          <a
            href={scheme.officialSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 hover:underline break-all"
          >
            {scheme.officialSource}
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 mb-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

import Breadcrumbs from './Breadcrumbs';

export default function PageHeader({ title, subtitle, icon: Icon, breadcrumbs = [] }) {
  return (
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-primary-600" />
            </div>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-slate-500 mt-1.5 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StatCard({ icon: Icon, label, value, color = 'primary' }) {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-600',
    accent: 'bg-accent-50 text-accent-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="card p-5 text-center animate-fade-in-up">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${colorMap[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

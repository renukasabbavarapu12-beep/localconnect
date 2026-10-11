import { Link } from 'react-router-dom';
import {
  GraduationCap, Hospital, Store, Landmark, Wheat, Users,
  ArrowRight,
} from 'lucide-react';

const iconMap = {
  GraduationCap,
  Hospital,
  Store,
  Landmark,
  Wheat,
  Users,
};

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  red: 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white',
  amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
  primary: 'bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white',
  accent: 'bg-accent-50 text-accent-600 group-hover:bg-accent-600 group-hover:text-white',
  pink: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white',
};

export default function CategoryCard({ category }) {
  const Icon = iconMap[category.icon] || Store;
  const colorClass = colorClasses[category.color] || colorClasses.primary;

  return (
    <Link
      to={category.route}
      className="card group p-6 flex flex-col items-start animate-fade-in-up"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${colorClass}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
        {category.description}
      </p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2.5 transition-all">
        {category.buttonText}
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}

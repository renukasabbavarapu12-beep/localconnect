import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm flex-wrap mb-6">
      <Link to="/" className="flex items-center gap-1 text-slate-400 hover:text-primary-600 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            {item.route && !isLast ? (
              <Link to={item.route} className="text-slate-500 hover:text-primary-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={`font-semibold ${isLast ? 'text-primary-600' : 'text-slate-500'}`}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

import { LayoutGrid } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/categories';

export default function Categories() {
  return (
    <div>
      <PageHeader
        title="All Categories"
        subtitle="Browse all service categories available near your location."
        icon={LayoutGrid}
        breadcrumbs={[{ label: 'Categories' }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Curated seed data — for prototype purposes only.
 * These records are NOT live-verified. Contact details may be outdated or
 * approximate. No star ratings are assigned because no verified rating source
 * exists for these records.
 */
export const businesses = [
  {
    id: 'business-001',
    name: 'Sri Lakshmi Grocery Store',
    category: 'Grocery',
    address: 'Main Road, Tagarapuvalasa',
    distance: 0.3,
    phone: '+91 98480 11111',
    hours: '7:00 AM - 9:00 PM',
    image: 'grocery',
    schemeIds: ['scheme-007'],
  },
  {
    id: 'business-002',
    name: 'TechZone Electronics',
    category: 'Electronics',
    address: 'Junction Road, Tagarapuvalasa',
    distance: 0.7,
    phone: '+91 98480 22222',
    hours: '10:00 AM - 8:00 PM',
    image: 'electronics',
    schemeIds: ['scheme-007'],
  },
  {
    id: 'business-003',
    name: 'FastFix Computer Services',
    category: 'Computer Services',
    address: 'Rushikonda Road, Visakhapatnam',
    distance: 1.8,
    phone: '+91 98480 33333',
    hours: '9:00 AM - 7:00 PM',
    image: 'computer-service',
    schemeIds: ['scheme-007', 'scheme-008'],
  },
  {
    id: 'business-004',
    name: 'Annapurna Tailoring',
    category: 'Tailor',
    address: 'Endada Village, Visakhapatnam',
    distance: 2.2,
    phone: '+91 98480 44444',
    hours: '9:00 AM - 8:00 PM',
    image: 'tailor',
    schemeIds: ['scheme-008'],
  },
  {
    id: 'business-005',
    name: 'Reliable Auto Mechanic',
    category: 'Mechanic',
    address: 'Bheemili Road, Tagarapuvalasa',
    distance: 1.1,
    phone: '+91 98480 55555',
    hours: '8:00 AM - 7:00 PM',
    image: 'mechanic',
    schemeIds: [],
  },
  {
    id: 'business-006',
    name: 'Spice Garden Family Restaurant',
    category: 'Food',
    address: 'Rushikonda Junction, Visakhapatnam',
    distance: 2.5,
    phone: '+91 98480 66666',
    hours: '11:00 AM - 10:30 PM',
    image: 'restaurant',
    schemeIds: ['scheme-007'],
  },
  {
    id: 'business-007',
    name: 'QuickPrint Stationery & Xerox',
    category: 'Other Services',
    address: 'Tagarapuvalasa Market',
    distance: 0.4,
    phone: '+91 98480 77777',
    hours: '8:00 AM - 9:00 PM',
    image: 'stationery',
    schemeIds: [],
  },
];

export const businessFilters = [
  { id: 'all', label: 'All' },
  { id: 'Grocery', label: 'Grocery' },
  { id: 'Electronics', label: 'Electronics' },
  { id: 'Computer Services', label: 'Computer Services' },
  { id: 'Tailor', label: 'Tailor' },
  { id: 'Mechanic', label: 'Mechanic' },
  { id: 'Food', label: 'Food' },
  { id: 'Other Services', label: 'Other Services' },
];

export const getBusinessById = (id) => businesses.find((b) => b.id === id);

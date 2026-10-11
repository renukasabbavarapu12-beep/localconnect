/**
 * Curated seed data — for prototype purposes only.
 * These records are NOT live-verified. Contact details and services may be
 * outdated or approximate. No star ratings are assigned because no verified
 * rating source exists for these records.
 */

export const agricultureServices = [
  {
    id: 'agri-001',
    name: 'Padmanabham Agriculture Extension Office',
    type: 'Agriculture Office',
    address: 'Mandal Parishad, Padmanabham',
    distance: 4.5,
    phone: '+91 0891 2801111',
    hours: '10:00 AM - 5:00 PM (Mon-Sat)',
    services: ['Soil Testing', 'Crop Advisory', 'Subsidy Distribution', 'Pest Control Guidance'],
    image: 'agri-office',
    schemeIds: ['scheme-010', 'scheme-011'],
  },
  {
    id: 'agri-002',
    name: 'Krishi Vigyan Kendra (KVK)',
    type: 'Farmer Service Center',
    address: 'Bheemunipatnam Road, Visakhapatnam',
    distance: 3.2,
    phone: '+91 0891 2802222',
    hours: '9:00 AM - 5:00 PM (Mon-Sat)',
    services: ['Farmer Training', 'Demonstration Programs', 'Seed Distribution', 'Technology Transfer'],
    image: 'kvk',
    schemeIds: ['scheme-010', 'scheme-011', 'scheme-012'],
  },
  {
    id: 'agri-003',
    name: 'GreenFields Seed Suppliers',
    type: 'Seed Supplier',
    address: 'Tagarapuvalasa Market Yard',
    distance: 0.8,
    phone: '+91 98480 88111',
    hours: '8:00 AM - 7:00 PM',
    services: ['Certified Seeds', 'Hybrid Seeds', 'Vegetable Seeds', 'Seed Treatment'],
    image: 'seeds',
    schemeIds: [],
  },
  {
    id: 'agri-004',
    name: 'Bharath Fertilizer Depot',
    type: 'Fertilizer Supplier',
    address: 'Main Road, Tagarapuvalasa',
    distance: 0.6,
    phone: '+91 98480 88222',
    hours: '8:00 AM - 8:00 PM',
    services: ['Subsidized Fertilizers', 'Organic Fertilizers', 'Pesticides', 'Soil Testing Kits'],
    image: 'fertilizer',
    schemeIds: ['scheme-010'],
  },
  {
    id: 'agri-005',
    name: 'Rythu Bharosa Kendram',
    type: 'Farmer Service Center',
    address: 'Gram Panchayat, Tagarapuvalasa',
    distance: 0.5,
    phone: '+91 0891 2803333',
    hours: '9:00 AM - 5:00 PM (Mon-Sat)',
    services: ['Crop Insurance', 'Loan Assistance', 'PM-Kisan Registration', 'Equipment Rental', 'Market Price Info'],
    image: 'rbk',
    schemeIds: ['scheme-010', 'scheme-011', 'scheme-012'],
  },
];

export const agricultureFilters = [
  { id: 'all', label: 'All' },
  { id: 'Agriculture Office', label: 'Agriculture Offices' },
  { id: 'Seed Supplier', label: 'Seed Suppliers' },
  { id: 'Fertilizer Supplier', label: 'Fertilizer Suppliers' },
  { id: 'Farmer Service Center', label: 'Farmer Service Centers' },
];

export const getAgricultureServiceById = (id) =>
  agricultureServices.find((a) => a.id === id);

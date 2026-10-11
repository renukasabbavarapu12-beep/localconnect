/**
 * Curated seed data — for prototype purposes only.
 * These records are NOT live-verified. Contact details and services may be
 * outdated or approximate. No star ratings are assigned because no verified
 * rating source exists for these records.
 */

export const womenChildServices = [
  {
    id: 'wc-001',
    name: 'Anganwadi Centre - Tagarapuvalasa',
    type: 'Anganwadi Center',
    address: 'Gram Panchayat Building, Tagarapuvalasa',
    distance: 0.4,
    phone: '+91 0891 2901111',
    hours: '9:00 AM - 3:00 PM (Mon-Fri)',
    services: ['Pre-school Education', 'Nutrition Supplement', 'Immunization', 'Growth Monitoring', 'Health Checkups'],
    image: 'anganwadi',
    schemeIds: ['scheme-013', 'scheme-014'],
  },
  {
    id: 'wc-002',
    name: 'Women Welfare Centre - Bheemunipatnam',
    type: 'Women Welfare Center',
    address: 'Municipal Office Road, Bheemunipatnam',
    distance: 3.5,
    phone: '+91 0891 2902222',
    hours: '10:00 AM - 5:00 PM (Mon-Sat)',
    services: ['Skill Training', 'Self-Help Group Support', 'Legal Aid', 'Counseling', 'Vocational Courses'],
    image: 'women-welfare',
    schemeIds: ['scheme-013', 'scheme-015'],
  },
  {
    id: 'wc-003',
    name: 'Child Welfare Office - Visakhapatnam',
    type: 'Child Welfare Service',
    address: 'District Office, Visakhapatnam',
    distance: 8.0,
    phone: '+91 0891 2903333',
    hours: '10:00 AM - 5:00 PM (Mon-Sat)',
    services: ['Child Protection', 'Adoption Services', 'Child Helpline', 'Rescue Operations', 'Rehabilitation'],
    image: 'child-welfare',
    schemeIds: ['scheme-014'],
  },
  {
    id: 'wc-004',
    name: 'Mahila Shram Shakti Support Centre',
    type: 'Support Center',
    address: 'Rushikonda Road, Visakhapatnam',
    distance: 2.0,
    phone: '+91 0891 2904444',
    hours: '9:00 AM - 5:00 PM (Mon-Sat)',
    services: ['Women Empowerment', 'Job Placement', 'Micro-finance Support', 'Entrepreneurship Training', 'Domestic Violence Help'],
    image: 'support-center',
    schemeIds: ['scheme-013', 'scheme-015'],
  },
  {
    id: 'wc-005',
    name: 'Supplementary Nutrition Centre',
    type: 'Anganwadi Center',
    address: 'Endada Village, Visakhapatnam',
    distance: 2.8,
    phone: '+91 0891 2905555',
    hours: '9:00 AM - 2:00 PM (Mon-Fri)',
    services: ['Nutrition for Mothers', 'Child Nutrition', 'Health Education', 'Antenatal Care'],
    image: 'nutrition',
    schemeIds: ['scheme-014'],
  },
];

export const womenChildFilters = [
  { id: 'all', label: 'All' },
  { id: 'Anganwadi Center', label: 'Anganwadi Centers' },
  { id: 'Women Welfare Center', label: 'Women Welfare Centers' },
  { id: 'Child Welfare Service', label: 'Child Welfare Services' },
  { id: 'Support Center', label: 'Support Centers' },
];

export const getWomenChildServiceById = (id) =>
  womenChildServices.find((w) => w.id === id);

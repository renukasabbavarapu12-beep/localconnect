/**
 * Curated seed data — for prototype purposes only.
 * These records are NOT live-verified. Contact details and facilities may be
 * outdated or approximate. No star ratings are assigned because no verified
 * rating source exists for these records.
 */
export const schools = [
  {
    id: 'school-001',
    name: 'Zilla Parishad Government High School',
    type: 'Government School',
    subType: 'School',
    address: 'Main Road, Tagarapuvalasa',
    distance: 0.8,
    facilities: ['Library', 'Playground', 'Science Lab', 'Mid-day Meal', 'Computer Lab'],
    schemeIds: ['scheme-003', 'scheme-004'],
    image: 'school-gov',
  },
  {
    id: 'school-002',
    name: 'Tagarapuvalasa Public School',
    type: 'Private School',
    subType: 'School',
    address: 'Rushikonda Road, Tagarapuvalasa',
    distance: 1.5,
    facilities: ['Library', 'Playground', 'Science Lab', 'Computer Lab', 'Smart Classrooms', 'Transport'],
    schemeIds: ['scheme-003'],
    image: 'school-private',
  },
  {
    id: 'school-003',
    name: 'Government Degree College, Bheemunipatnam',
    type: 'Government College',
    subType: 'College',
    address: 'Bheemunipatnam, Visakhapatnam',
    distance: 3.2,
    facilities: ['Library', 'Science Labs', 'Sports Ground', 'Canteen', 'Auditorium'],
    schemeIds: ['scheme-003', 'scheme-005'],
    image: 'college-gov',
  },
  {
    id: 'school-004',
    name: 'Vignan Junior College',
    type: 'Private College',
    subType: 'College',
    address: 'Endada, Visakhapatnam',
    distance: 2.7,
    facilities: ['Library', 'Science Labs', 'Computer Lab', 'Sports Ground', 'Hostel', 'Transport'],
    schemeIds: ['scheme-005'],
    image: 'college-private',
  },
  {
    id: 'school-005',
    name: 'Brilliant Coaching Centre',
    type: 'Coaching Center',
    subType: 'Coaching Center',
    address: 'Tagarapuvalasa Junction',
    distance: 0.6,
    facilities: ['AC Classrooms', 'Library', 'Study Material', 'Online Support'],
    schemeIds: ['scheme-006'],
    image: 'coaching',
  },
  {
    id: 'school-006',
    name: 'AP Skill Development Centre',
    type: 'Skill Development Center',
    subType: 'Skill Development Center',
    address: 'Rushikonda, Visakhapatnam',
    distance: 2.0,
    facilities: ['Computer Lab', 'Workshops', 'Placement Cell', 'Online Portal'],
    schemeIds: ['scheme-006'],
    image: 'skill-center',
  },
];

export const educationFilters = [
  { id: 'all', label: 'All' },
  { id: 'School', label: 'Schools' },
  { id: 'College', label: 'Colleges' },
  { id: 'Coaching Center', label: 'Coaching Centers' },
  { id: 'Skill Development Center', label: 'Skill Development Centers' },
];

export const getSchoolById = (id) => schools.find((s) => s.id === id);

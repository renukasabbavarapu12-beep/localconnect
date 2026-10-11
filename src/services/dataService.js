import { hospitals, getHospitalById } from '../data/hospitals';
import { schools, getSchoolById } from '../data/schools';
import { businesses, getBusinessById } from '../data/businesses';
import { governmentServices, getGovernmentServiceById } from '../data/governmentServices';
import { agricultureServices, getAgricultureServiceById } from '../data/agricultureServices';
import { womenChildServices, getWomenChildServiceById } from '../data/womenChildServices';
import { schemes, getSchemeById, getSchemesByIds } from '../data/schemes';
import { categories, getCategoryById } from '../data/categories';
import { locations } from '../data/locations';

export const dataService = {
  getCategories: () => categories,
  getCategoryById,

  getLocations: () => locations,

  getHospitals: () => hospitals,
  getHospitalById,

  getSchools: () => schools,
  getSchoolById,

  getBusinesses: () => businesses,
  getBusinessById,

  getGovernmentServices: () => governmentServices,
  getGovernmentServiceById,

  getAgricultureServices: () => agricultureServices,
  getAgricultureServiceById,

  getWomenChildServices: () => womenChildServices,
  getWomenChildServiceById,

  getSchemes: () => schemes,
  getSchemeById,
  getSchemesByIds,

  searchAll: (query) => {
    if (!query || query.trim().length === 0) return [];
    const q = query.toLowerCase().trim();

    const hospitalResults = hospitals
      .filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.type.toLowerCase().includes(q) ||
          h.address.toLowerCase().includes(q)
      )
      .map((h) => ({ ...h, resultType: 'Hospital', route: `/medical/hospital/${h.id}` }));

    const schoolResults = schools
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.type.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
      )
      .map((s) => ({ ...s, resultType: 'School', route: `/education/school/${s.id}` }));

    const businessResults = businesses
      .filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.address.toLowerCase().includes(q)
      )
      .map((b) => ({ ...b, resultType: 'Business', route: `/business/business/${b.id}` }));

    const govResults = governmentServices
      .filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.type.toLowerCase().includes(q) ||
          g.address.toLowerCase().includes(q)
      )
      .map((g) => ({ ...g, resultType: 'Government Service', route: `/government/office/${g.id}` }));

    const schemeResults = schemes
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.overview.toLowerCase().includes(q)
      )
      .map((s) => ({ ...s, resultType: 'Scheme', route: `/scheme/${s.id}` }));

    return [...hospitalResults, ...schoolResults, ...businessResults, ...govResults, ...schemeResults];
  },
};

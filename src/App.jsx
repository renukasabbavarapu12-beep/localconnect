import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LocationProvider } from './context/LocationContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Medical from './pages/Medical';
import HospitalDetails from './pages/HospitalDetails';
import Education from './pages/Education';
import SchoolDetails from './pages/SchoolDetails';
import Business from './pages/Business';
import BusinessDetails from './pages/BusinessDetails';
import Government from './pages/Government';
import GovernmentOfficeDetails from './pages/GovernmentOfficeDetails';
import Agriculture from './pages/Agriculture';
import WomenChild from './pages/WomenChild';
import SearchPage from './pages/Search';
import SchemeDetails from './pages/SchemeDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Categories from './pages/Categories';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medical" element={<Medical />} />
            <Route path="/medical/hospital/:id" element={<HospitalDetails />} />
            <Route path="/education" element={<Education />} />
            <Route path="/education/school/:id" element={<SchoolDetails />} />
            <Route path="/business" element={<Business />} />
            <Route path="/business/business/:id" element={<BusinessDetails />} />
            <Route path="/government" element={<Government />} />
            <Route path="/government/office/:id" element={<GovernmentOfficeDetails />} />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/women-child" element={<WomenChild />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/scheme/:id" element={<SchemeDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </LocationProvider>
    </BrowserRouter>
  );
}

export default App;

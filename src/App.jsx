import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import GetInTouch from "./sections/get-in-touch";
import OurTestimonials from "./sections/our-testimonials";
import Pricing from "./sections/pricing";
import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import AboutOurApps from "./sections/about-our-apps";
import HeroSection from "./sections/hero-section";
import OurLatestCreation from "./sections/our-latest-creation";
import TrustedCompanies from "./sections/trusted-companies";
import SupportedProviders from "./sections/supported-providers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function HomePage() {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <HeroSection />
            <TrustedCompanies />
            <SupportedProviders />
            <main className="px-6 md:px-16 lg:px-24 xl:px-32">
                <OurLatestCreation />
                <AboutOurApps />
                <OurTestimonials />
                <Pricing />
                <GetInTouch />
            </main>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <LanguageProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
        </LanguageProvider>
    );
}
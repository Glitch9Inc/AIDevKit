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

export default function Page() {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <HeroSection />
            <TrustedCompanies />
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
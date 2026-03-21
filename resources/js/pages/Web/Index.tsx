import ClientsSection from "@/components/Web/Home/ClientsSection";
import AboutSection from "@/components/Web/Home/AboutSection";
import ContactSection from "@/components/Web/Home/ContactSection";
import Footer from "@/components/Web/Footer";
import HeroSection from "@/components/Web/Home/HeroSection";
import Navbar from "@/components/Web/Navbar";
import ProcessSection from "@/components/Web/Home/ProcessSection";
import ServicesSection from "@/components/Web/Home/ServicesSection";
import CinematicSection from "@/components/ui/CinematicSection";
import BlackTransition from "@/components/ui/BlackTransition";
import TrailerText from "@/components/ui/TrailerText";
import SectionReveal from "@/components/ui/SectionReveal";
import { LocaleProvider } from "@/contexts/LocaleContext";

const Index = () => {
  return (
    <LocaleProvider>

      <div className="bg-black text-white antialiased selection:bg-white/20">

        <Navbar />

        <CinematicSection
          backgroundImage="/images/fondo.png"
          fullScreen
        >
          <HeroSection />
        </CinematicSection>

        <CinematicSection
          backgroundImage="/images/fondo.png"
          fullScreen
          cameraPush
        >
          <AboutSection />
        </CinematicSection>

        <CinematicSection
          backgroundImage="/images/back.jpg"
          parallaxIntensity={100}
        >
          <ServicesSection />
        </CinematicSection>

        {/* <CinematicSection
        blurEffect
        fade
      >
        <TrailerText text="The process" className="text-[250px] font-bold text-center" />
      </CinematicSection> */}

        <ProcessSection />

        <CinematicSection>
          <ClientsSection />
        </CinematicSection>

        <CinematicSection backgroundImage="/images/fondo.png">
          <ContactSection />
        </CinematicSection>

        <Footer />
      </div>
    </LocaleProvider>
  );
};

export default Index;

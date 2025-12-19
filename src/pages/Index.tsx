import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyUsSection from "@/components/WhyUsSection";
import DoctorSection from "@/components/DoctorSection";
import SimulatorSection from "@/components/SimulatorSection";
import GallerySection from "@/components/GallerySection";
import JourneySection from "@/components/JourneySection";
import ResourcesSection from "@/components/ResourcesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhyUsSection />
        <DoctorSection />
        <SimulatorSection />
        <GallerySection />
        <JourneySection />
        <ResourcesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

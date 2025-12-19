import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DoctorSection from "@/components/DoctorSection";
import WhyUsSection from "@/components/WhyUsSection";
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
        <DoctorSection />
        <WhyUsSection />
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

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DoctorSection from "@/components/DoctorSection";
import WhyUsSection from "@/components/WhyUsSection";
import GallerySection from "@/components/GallerySection";
import JourneySection from "@/components/JourneySection";
import ResourcesSection from "@/components/ResourcesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Rentéa Aesthetic Clinique | Augmentare Mamară București | Implanturi Mentor, Motiva"
        description="Clinică de chirurgie estetica din București dedicată augmentării mamare. Specializare 100% în implanturi mamare Mentor și Motiva. Rezultate naturale."
        keywords="augmentare mamara, implant mamar bucuresti, implanturi silicon, chirurgie estetica sani, marire sani, implant anatomic, implant rotund"
        canonical="/"
      />
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

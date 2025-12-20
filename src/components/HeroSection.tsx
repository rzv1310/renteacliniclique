import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroImage from "@/assets/hero-image.webp";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Echipa Rentéa Aesthetic Clinique"
          className="w-full h-full object-cover object-top -translate-y-[30px]"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content - Two columns at bottom */}
      <div className="relative container mx-auto px-4 lg:px-8 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          {/* Left - Text and Buttons */}
          <div className="animate-fade-in-up order-2 lg:order-1">
            <p className="text-body leading-relaxed mb-6 max-w-md">
              Rentéa Aesthetic Clinique - Lider în chirurgia estetică din București, supra-specializați în augmentare mamară.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-glow-border bg-transparent text-white border border-rose-gold/60 hover:bg-rose-gold/10 hover:border-rose-gold">
                <Phone className="w-5 h-5 mr-2" />
                Fă primul pas pentru transformare
              </Button>
            </div>
          </div>

          {/* Right - Title */}
          <div className="animate-fade-in-up animation-delay-100 order-1 lg:order-2">
            <h1 className="h1-hero text-foreground lg:text-right">
              Nu facem "de toate".
              <br />
              <span className="text-gradient-gold italic">Facem sâni perfecți.</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

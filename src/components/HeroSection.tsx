import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Femeie elegantă încrezătoare"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne-light border border-champagne/30 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-rose-gold animate-pulse" />
            <span className="text-sm font-medium text-soft-brown tracking-wide">
              Specializare Exclusivă în Augmentare Mamară
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-deep-brown leading-[1.1] mb-6 animate-fade-in-up animation-delay-100">
            Nu facem "de toate".
            <br />
            <span className="text-gradient-gold">Facem sâni perfecți.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-soft-brown leading-relaxed mb-10 max-w-xl animate-fade-in-up animation-delay-200">
            Singura clinică din București dedicată exclusiv augmentării mamare.
            Specializare 100% pentru siguranța și feminitatea ta.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <Button variant="hero" size="xl" className="group">
              Vezi Galeria Foto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="elegant" size="xl" className="group">
              <Play className="w-5 h-5" />
              Solicită Simulare 3D
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-border/50 animate-fade-in-up animation-delay-400">
            <div className="flex flex-wrap gap-8 md:gap-12">
              <div>
                <p className="text-3xl md:text-4xl font-serif font-semibold text-rose-gold">500+</p>
                <p className="text-sm text-soft-brown mt-1">Intervenții Reușite</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif font-semibold text-rose-gold">15+</p>
                <p className="text-sm text-soft-brown mt-1">Ani Experiență</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif font-semibold text-rose-gold">99%</p>
                <p className="text-sm text-soft-brown mt-1">Paciente Mulțumite</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-rose-gold/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-rose-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

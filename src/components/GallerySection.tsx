import { useState } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import galleryBefore from "@/assets/gallery/gallery-before.webp";
import galleryAfter from "@/assets/gallery/gallery-after.webp";
import voluptuousBefore from "@/assets/gallery/voluptuous-before.png";
import voluptuousAfter from "@/assets/gallery/voluptuous-after.png";
import sportyBefore from "@/assets/gallery/sporty-before.png";
import sportyAfter from "@/assets/gallery/sporty-after.png";

const GallerySection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState("natural");
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCase, setActiveCase] = useState(0);

  const filters = [
    { id: "natural", label: "Natural Look" },
    { id: "voluptuous", label: "Voluptuous Look" },
    { id: "sporty", label: "Sporty Look" },
  ];

  const casesByFilter: Record<string, { before: string; after: string; label: string }[]> = {
    natural: [
      { before: galleryAfter, after: galleryBefore, label: "Caz #1 - Natural 350cc" },
    ],
    voluptuous: [
      { before: voluptuousAfter, after: voluptuousBefore, label: "Caz #1 - Voluptuous 450cc" },
    ],
    sporty: [
      { before: sportyAfter, after: sportyBefore, label: "Caz #1 - Sporty 300cc" },
    ],
  };

  const cases = casesByFilter[activeFilter] || [];

  const imagePositions: Record<string, { before: string; after: string }> = {
    natural: { before: "object-[40%_center]", after: "object-[30%_center]" },
    voluptuous: { before: "object-[40%_center]", after: "object-[30%_center]" },
    sporty: { before: "object-center", after: "object-[35%_center]" },
  };

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <section 
      id="galerie" 
      className="py-16 lg:py-20 bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Row with Title and Filters */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left side - Title */}
          <div className="max-w-xl">
            <span className="text-label mb-4 block">
              TRANSFORMĂRI AUTENTICE
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              <span className="italic">Rezultate Reale. Fără Filtre.</span>
            </h2>
          </div>

          {/* Right side - Filters */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-sans font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-rose-gold text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-rose-gold/50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Before/After Comparison Slider */}
        <div className={`max-w-5xl mx-auto mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cases.length > 0 ? (
            <div
              className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden bg-card border border-border cursor-ew-resize select-none"
              onMouseMove={handleSliderMove}
              onTouchMove={handleTouchMove}
            >
              {/* Before Image */}
              <img
                src={cases[activeCase]?.before}
                alt="Înainte"
                className={`absolute inset-0 w-full h-full object-cover ${imagePositions[activeFilter]?.before || "object-center"}`}
              />

              {/* After Image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
              <img
                  src={cases[activeCase]?.after}
                  alt="După"
                  className={`absolute inset-0 w-full h-full object-cover ${imagePositions[activeFilter]?.after || "object-center"}`}
                />
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                <span className="text-sm font-sans font-medium text-foreground">Înainte</span>
              </div>
              <div className="absolute top-4 right-4 bg-rose-gold px-4 py-2 rounded-full">
                <span className="text-sm font-sans font-medium text-primary-foreground">După (3 luni)</span>
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-foreground/50"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full shadow-elegant flex items-center justify-center">
                  <MaterialIcon name="code" className="text-xl text-rose-gold" />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden bg-card border border-border flex items-center justify-center">
              <p className="text-muted-foreground font-sans text-center px-8">
                Imagini pentru acest stil vor fi adăugate în curând.
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA Text */}
        <div className={`text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a 
            href="/galerie" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-rose-gold transition-colors mb-8"
          >
            <span className="font-sans text-sm">Explorează Galeria Foto</span>
            <span className="text-rose-gold">•</span>
            <span className="font-sans text-sm">Filtrează după înălțimea ta</span>
          </a>
          
          {/* Simulator 3D Button */}
          <div className="mt-8 flex justify-center">
            <Link to="/simulator-3d">
              <Button size="lg" className="btn-glow-border bg-transparent text-foreground border border-rose-gold/60 hover:bg-rose-gold/10 hover:border-rose-gold">
                <MaterialIcon name="3d_rotation" className="text-xl mr-2" />
                Simulator 3D
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

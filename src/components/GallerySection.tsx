import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sliderPosition, setSliderPosition] = useState(50);

  const filters = [
    { id: "all", label: "Toate" },
    { id: "natural", label: "Natural Look" },
    { id: "voluptuous", label: "Voluptuous" },
    { id: "sporty", label: "Sporty Look" },
  ];

  // Placeholder for before/after comparison
  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <section id="galerie" className="py-24 lg:py-32 bg-champagne-light/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
            Galerie
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-deep-brown mb-6">
            Rezultate Reale. Fără Filtre.
          </h2>
          <p className="text-soft-brown text-lg leading-relaxed">
            Fiecare corp este unic. Răsfoiește peste 500 de cazuri rezolvate în clinica noastră.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-rose-gold text-primary-foreground shadow-gold"
                  : "bg-card text-soft-brown hover:bg-champagne"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Before/After Comparison Slider */}
        <div className="max-w-4xl mx-auto mb-12">
          <div
            className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-elegant cursor-ew-resize select-none"
            onMouseMove={handleSliderMove}
          >
            {/* Before Image (Placeholder with gradient) */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              <div className="text-center">
                <p className="text-soft-brown font-serif text-2xl">Înainte</p>
                <p className="text-muted-foreground text-sm mt-2">Rezultat Natural - 350cc</p>
              </div>
            </div>

            {/* After Image (Placeholder) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-champagne-light to-champagne flex items-center justify-center"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="text-center">
                <p className="text-deep-brown font-serif text-2xl">După</p>
                <p className="text-soft-brown text-sm mt-2">Rezultat Natural - 350cc</p>
              </div>
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary-foreground rounded-full shadow-elegant flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-rose-gold" />
                <ChevronRight className="w-4 h-4 text-rose-gold" />
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Trage slider-ul pentru a vedea diferența
          </p>
        </div>

        {/* Gallery Grid Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-[3/4] rounded-xl bg-gradient-to-br from-secondary to-muted hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group"
            >
              <div className="w-full h-full flex items-center justify-center bg-champagne-light/50 group-hover:bg-champagne/50 transition-colors">
                <span className="text-soft-brown text-sm">Caz #{item}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="xl" className="group">
            Explorează Galeria Completă
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Filtrează după înălțime, greutate și tip de implant
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

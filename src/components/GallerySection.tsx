import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("natural");
  const [sliderPosition, setSliderPosition] = useState(50);

  const filters = [
    { id: "natural", label: "Natural Look" },
    { id: "voluptuous", label: "Voluptuous Look" },
    { id: "sporty", label: "Sporty Look" },
  ];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <section id="galerie" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-label mb-4 block">
            Transformări Autentice
          </span>
          <h2 className="h2-section text-foreground mb-6">
            Rezultate Reale. Fără Filtre.
          </h2>
          <p className="text-body leading-relaxed">
            Fiecare corp este unic și merită o atenție deosebită. Explorează peste 500 de cazuri rezolvate, ce subliniază măiestria noastră și armonia rezultatelor obținute.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full text-sm font-sans font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-rose-gold text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-rose-gold/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Before/After Comparison Slider */}
        <div className="max-w-4xl mx-auto mb-12">
          <div
            className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-card border border-border cursor-ew-resize select-none"
            onMouseMove={handleSliderMove}
          >
            {/* Before Image (Placeholder) */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-card flex items-center justify-center">
              <div className="text-center">
                <p className="text-foreground font-display text-2xl">ÎNAINTE</p>
              </div>
            </div>

            {/* After Image (Placeholder) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-card to-muted flex items-center justify-center"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="text-center">
                <p className="text-foreground font-display text-2xl">DUPĂ (3 LUNI)</p>
              </div>
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-foreground/50"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full shadow-elegant flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-rose-gold" />
                <ChevronRight className="w-4 h-4 text-rose-gold" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="/galerie">
            <button className="btn-primary-rose-gold">
              Explorează Galeria Completă
              <span className="text-sm opacity-80">(Filtrează după înălțimea ta)</span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

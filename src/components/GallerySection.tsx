import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import case1Before from "@/assets/gallery/case-1-before.jpg";
import case1After from "@/assets/gallery/case-1-after.jpg";
import case2Before from "@/assets/gallery/case-2-before.jpg";
import case2After from "@/assets/gallery/case-2-after.jpg";
import case3Before from "@/assets/gallery/case-3-before.jpg";
import case3After from "@/assets/gallery/case-3-after.jpg";

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("natural");
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCase, setActiveCase] = useState(0);

  const filters = [
    { id: "natural", label: "Natural Look" },
    { id: "voluptuous", label: "Voluptuous Look" },
    { id: "sporty", label: "Sporty Look" },
  ];

  const cases = [
    { before: case1Before, after: case1After, label: "Caz #1 - Natural 350cc" },
    { before: case2Before, after: case2After, label: "Caz #2 - Voluptuous 400cc" },
    { before: case3Before, after: case3After, label: "Caz #3 - Sporty 300cc" },
  ];

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
        <div className="max-w-4xl mx-auto mb-8">
          <div
            className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-card border border-border cursor-ew-resize select-none"
            onMouseMove={handleSliderMove}
            onTouchMove={handleTouchMove}
          >
            {/* Before Image */}
            <img
              src={cases[activeCase].before}
              alt="Înainte"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* After Image */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={cases[activeCase].after}
                alt="După"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-sans font-medium text-foreground">ÎNAINTE</span>
            </div>
            <div className="absolute top-4 right-4 bg-rose-gold/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-sans font-medium text-primary-foreground">DUPĂ (3 LUNI)</span>
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

          {/* Case selector */}
          <div className="flex justify-center gap-2 mt-4">
            {cases.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCase(index);
                  setSliderPosition(50);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeCase
                    ? "w-8 bg-rose-gold"
                    : "bg-border hover:bg-rose-gold/50"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {cases[activeCase].label}
          </p>
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

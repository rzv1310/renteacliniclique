import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import GalleryLightbox from "@/components/GalleryLightbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Import hero image
import heroImage from "@/assets/heroes/hero-galerie.jpg";

// Import gallery images
import case1Before from "@/assets/gallery/case-1-before.jpg";
import case1After from "@/assets/gallery/case-1-after.jpg";
import case2Before from "@/assets/gallery/case-2-before.jpg";
import case2After from "@/assets/gallery/case-2-after.jpg";
import case3Before from "@/assets/gallery/case-3-before.jpg";
import case3After from "@/assets/gallery/case-3-after.jpg";
import case4Before from "@/assets/gallery/case-4-before.jpg";
import case4After from "@/assets/gallery/case-4-after.jpg";
import case5Before from "@/assets/gallery/case-5-before.jpg";
import case5After from "@/assets/gallery/case-5-after.jpg";
import case6Before from "@/assets/gallery/case-6-before.jpg";
import case6After from "@/assets/gallery/case-6-after.jpg";

// Gallery data with real images - varied styles
const galleryData = [
  { id: 1, height: 160, weight: 52, size: 300, type: "rotund", style: "natural", beforeImg: case1Before, afterImg: case1After, technique: "Dual Plane", implantBrand: "Motiva", recoveryDays: 7 },
  { id: 2, height: 165, weight: 55, size: 350, type: "anatomic", style: "natural", beforeImg: case2Before, afterImg: case2After, technique: "Subglandular", implantBrand: "Mentor", recoveryDays: 10 },
  { id: 3, height: 170, weight: 60, size: 400, type: "ergonomic", style: "voluptuous", beforeImg: case3Before, afterImg: case3After, technique: "Dual Plane", implantBrand: "Motiva Ergonomix", recoveryDays: 8 },
  { id: 4, height: 158, weight: 48, size: 275, type: "rotund", style: "sporty", beforeImg: case4Before, afterImg: case4After, technique: "Submuscular", implantBrand: "Mentor", recoveryDays: 9 },
  { id: 5, height: 172, weight: 65, size: 450, type: "anatomic", style: "voluptuous", beforeImg: case5Before, afterImg: case5After, technique: "Dual Plane", implantBrand: "Motiva", recoveryDays: 10 },
  { id: 6, height: 163, weight: 54, size: 325, type: "ergonomic", style: "natural", beforeImg: case6Before, afterImg: case6After, technique: "Subglandular", implantBrand: "Motiva Ergonomix", recoveryDays: 7 },
  { id: 7, height: 168, weight: 58, size: 375, type: "rotund", style: "voluptuous", beforeImg: case1Before, afterImg: case1After, technique: "Dual Plane", implantBrand: "Mentor", recoveryDays: 8 },
  { id: 8, height: 155, weight: 50, size: 250, type: "anatomic", style: "sporty", beforeImg: case4Before, afterImg: case4After, technique: "Submuscular", implantBrand: "Motiva", recoveryDays: 9 },
  { id: 9, height: 175, weight: 68, size: 500, type: "ergonomic", style: "voluptuous", beforeImg: case5Before, afterImg: case5After, technique: "Dual Plane", implantBrand: "Motiva Ergonomix", recoveryDays: 10 },
  { id: 10, height: 162, weight: 56, size: 350, type: "rotund", style: "natural", beforeImg: case2Before, afterImg: case2After, technique: "Subglandular", implantBrand: "Mentor", recoveryDays: 7 },
  { id: 11, height: 167, weight: 62, size: 400, type: "anatomic", style: "natural", beforeImg: case6Before, afterImg: case6After, technique: "Dual Plane", implantBrand: "Motiva", recoveryDays: 8 },
  { id: 12, height: 159, weight: 51, size: 300, type: "ergonomic", style: "sporty", beforeImg: case3Before, afterImg: case3After, technique: "Submuscular", implantBrand: "Motiva Ergonomix", recoveryDays: 9 },
  { id: 13, height: 164, weight: 53, size: 320, type: "rotund", style: "natural", beforeImg: case4Before, afterImg: case4After, technique: "Dual Plane", implantBrand: "Mentor", recoveryDays: 7 },
  { id: 14, height: 171, weight: 63, size: 425, type: "anatomic", style: "voluptuous", beforeImg: case5Before, afterImg: case5After, technique: "Subglandular", implantBrand: "Motiva", recoveryDays: 9 },
  { id: 15, height: 156, weight: 49, size: 280, type: "ergonomic", style: "sporty", beforeImg: case6Before, afterImg: case6After, technique: "Submuscular", implantBrand: "Motiva Ergonomix", recoveryDays: 8 },
  { id: 16, height: 169, weight: 59, size: 380, type: "rotund", style: "voluptuous", beforeImg: case3Before, afterImg: case3After, technique: "Dual Plane", implantBrand: "Mentor", recoveryDays: 10 },
];

interface BeforeAfterSliderProps {
  caseData: typeof galleryData[0];
  onClick: () => void;
}

const BeforeAfterSlider = ({ caseData, onClick }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-ew-resize select-none group"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image */}
      <img
        src={caseData.beforeImg}
        alt="Înainte"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* After Image with Clip */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={caseData.afterImg}
          alt="După"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-elegant flex items-center justify-center transition-transform group-hover:scale-110">
          <ChevronLeft className="w-3 h-3 text-primary -mr-1" />
          <ChevronRight className="w-3 h-3 text-primary -ml-1" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-20">
        <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
          Înainte
        </Badge>
      </div>
      <div className="absolute top-3 right-3 z-20">
        <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
          După
        </Badge>
      </div>

      {/* View Details Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Badge className="bg-white/95 text-foreground hover:bg-white cursor-pointer flex items-center gap-1.5 py-1.5 px-3">
          <ZoomIn className="w-3.5 h-3.5" />
          Vezi Detalii
        </Badge>
      </button>

      {/* Case Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 z-20">
        <div className="flex flex-wrap gap-1.5">
          <Badge className="bg-primary/90 text-primary-foreground text-xs">
            {caseData.size}cc
          </Badge>
          <Badge variant="outline" className="bg-white/20 border-white/30 text-white text-xs capitalize">
            {caseData.type}
          </Badge>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [filters, setFilters] = useState({
    heightRange: [150, 180] as [number, number],
    weightRange: [45, 75] as [number, number],
    sizeRange: [200, 550] as [number, number],
    type: "all",
    style: "all",
  });
  const [showFilters, setShowFilters] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number | null>(null);

  const filteredGallery = galleryData.filter((item) => {
    const heightMatch = item.height >= filters.heightRange[0] && item.height <= filters.heightRange[1];
    const weightMatch = item.weight >= filters.weightRange[0] && item.weight <= filters.weightRange[1];
    const sizeMatch = item.size >= filters.sizeRange[0] && item.size <= filters.sizeRange[1];
    const typeMatch = filters.type === "all" || item.type === filters.type;
    const styleMatch = filters.style === "all" || item.style === filters.style;
    return heightMatch && weightMatch && sizeMatch && typeMatch && styleMatch;
  });

  const resetFilters = () => {
    setFilters({
      heightRange: [150, 180],
      weightRange: [45, 75],
      sizeRange: [200, 550],
      type: "all",
      style: "all",
    });
  };

  const hasActiveFilters = 
    filters.heightRange[0] !== 150 || 
    filters.heightRange[1] !== 180 ||
    filters.weightRange[0] !== 45 || 
    filters.weightRange[1] !== 75 ||
    filters.sizeRange[0] !== 200 || 
    filters.sizeRange[1] !== 550 ||
    filters.type !== "all" || 
    filters.style !== "all";

  const openLightbox = (index: number) => {
    setSelectedCaseIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    if (selectedCaseIndex !== null && selectedCaseIndex < filteredGallery.length - 1) {
      setSelectedCaseIndex(selectedCaseIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedCaseIndex !== null && selectedCaseIndex > 0) {
      setSelectedCaseIndex(selectedCaseIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Galerie Foto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 pt-20">
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 block animate-fade-in">
            Galerie Foto
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up">
            Rezultate Reale,
            <br />
            <span className="text-gradient-gold">Filtrabile</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            Peste 500 de transformări documentate. Găsește cazuri similare cu profilul tău 
            pentru a vizualiza rezultate realiste.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              {filteredGallery.length} cazuri afișate
            </span>
            <span className="text-border">|</span>
            <span>Click pentru detalii complete</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Filter & Gallery Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Ascunde Filtrele" : "Arată Filtrele"}
            </Button>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={resetFilters}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
                Resetează Filtrele
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-card rounded-2xl p-6 lg:p-8 mb-10 shadow-soft border border-border/50 animate-fade-in">
              <h3 className="font-serif text-xl text-foreground mb-6">
                Filtrează după caracteristicile tale
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {/* Height Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground flex items-center justify-between">
                    <span>Înălțime</span>
                    <span className="text-primary">
                      {filters.heightRange[0]} - {filters.heightRange[1]} cm
                    </span>
                  </label>
                  <Slider
                    value={filters.heightRange}
                    onValueChange={(value) => setFilters({ ...filters, heightRange: value as [number, number] })}
                    min={150}
                    max={180}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Weight Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground flex items-center justify-between">
                    <span>Greutate</span>
                    <span className="text-primary">
                      {filters.weightRange[0]} - {filters.weightRange[1]} kg
                    </span>
                  </label>
                  <Slider
                    value={filters.weightRange}
                    onValueChange={(value) => setFilters({ ...filters, weightRange: value as [number, number] })}
                    min={45}
                    max={75}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Size Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground flex items-center justify-between">
                    <span>Mărime Implant</span>
                    <span className="text-primary">
                      {filters.sizeRange[0]} - {filters.sizeRange[1]} cc
                    </span>
                  </label>
                  <Slider
                    value={filters.sizeRange}
                    onValueChange={(value) => setFilters({ ...filters, sizeRange: value as [number, number] })}
                    min={200}
                    max={550}
                    step={25}
                    className="w-full"
                  />
                </div>

                {/* Type Select */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Tip Implant</label>
                  <Select
                    value={filters.type}
                    onValueChange={(value) => setFilters({ ...filters, type: value })}
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Toate tipurile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toate tipurile</SelectItem>
                      <SelectItem value="rotund">Rotund</SelectItem>
                      <SelectItem value="anatomic">Anatomic</SelectItem>
                      <SelectItem value="ergonomic">Ergonomic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Style Select */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Stil Rezultat</label>
                  <Select
                    value={filters.style}
                    onValueChange={(value) => setFilters({ ...filters, style: value })}
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Toate stilurile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toate stilurile</SelectItem>
                      <SelectItem value="natural">Natural Look</SelectItem>
                      <SelectItem value="voluptuous">Voluptuous</SelectItem>
                      <SelectItem value="sporty">Sporty Look</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Quick Filter Tags */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-3">Filtre rapide:</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({ ...filters, style: "natural" })}
                    className={filters.style === "natural" ? "bg-primary/10 border-primary text-primary" : ""}
                  >
                    Natural Look
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({ ...filters, style: "voluptuous" })}
                    className={filters.style === "voluptuous" ? "bg-primary/10 border-primary text-primary" : ""}
                  >
                    Voluptuous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({ ...filters, style: "sporty" })}
                    className={filters.style === "sporty" ? "bg-primary/10 border-primary text-primary" : ""}
                  >
                    Sporty Look
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({ ...filters, sizeRange: [200, 300] })}
                    className={filters.sizeRange[0] === 200 && filters.sizeRange[1] === 300 ? "bg-primary/10 border-primary text-primary" : ""}
                  >
                    Mărimi Mici (200-300cc)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({ ...filters, sizeRange: [300, 400] })}
                    className={filters.sizeRange[0] === 300 && filters.sizeRange[1] === 400 ? "bg-primary/10 border-primary text-primary" : ""}
                  >
                    Mărimi Medii (300-400cc)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({ ...filters, sizeRange: [400, 550] })}
                    className={filters.sizeRange[0] === 400 && filters.sizeRange[1] === 550 ? "bg-primary/10 border-primary text-primary" : ""}
                  >
                    Mărimi Mari (400-550cc)
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          {filteredGallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGallery.map((caseData, index) => (
                <BeforeAfterSlider
                  key={caseData.id}
                  caseData={caseData}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                Nu am găsit cazuri care să corespundă filtrelor selectate.
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Resetează Filtrele
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedCaseIndex !== null && (
        <GalleryLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          caseData={filteredGallery[selectedCaseIndex]}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedCaseIndex < filteredGallery.length - 1}
          hasPrev={selectedCaseIndex > 0}
        />
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;

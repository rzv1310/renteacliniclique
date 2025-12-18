import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, Ruler, Weight, Maximize2 } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface GalleryCase {
  id: number;
  height: number;
  weight: number;
  size: number;
  type: string;
  style: string;
  beforeImg: string;
  afterImg: string;
  technique?: string;
  recoveryDays?: number;
  implantBrand?: string;
}

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: GalleryCase | null;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const GalleryLightbox = ({
  isOpen,
  onClose,
  caseData,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: GalleryLightboxProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    setSliderPosition(50);
  }, [caseData?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hasNext, hasPrev, onNext, onPrev, onClose]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = () => {
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

  if (!caseData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 bg-background border-border/50 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Caz #{caseData.id} - Detalii</DialogTitle>
        </VisuallyHidden>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Navigation Arrows */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
        )}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        )}

        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Comparison Area */}
          <div className="flex-1 p-4 lg:p-8 flex items-center justify-center bg-muted/30">
            <div
              ref={containerRef}
              className="relative w-full max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-elegant"
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
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-elegant flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4 text-rose-gold -mr-1" />
                  <ChevronRight className="w-4 h-4 text-rose-gold -ml-1" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 z-20">
                <Badge className="bg-white/95 text-deep-brown shadow-sm">Înainte</Badge>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <Badge className="bg-white/95 text-deep-brown shadow-sm">După</Badge>
              </div>

              {/* Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <Badge variant="outline" className="bg-black/50 border-white/20 text-white text-xs">
                  <Maximize2 className="w-3 h-3 mr-1" />
                  Trage pentru comparație
                </Badge>
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-full lg:w-80 xl:w-96 bg-card border-t lg:border-t-0 lg:border-l border-border p-6 lg:p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Case Header */}
              <div>
                <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">
                  Caz #{caseData.id}
                </span>
                <h3 className="font-serif text-2xl text-deep-brown mt-1">
                  Detalii Pacientă
                </h3>
              </div>

              {/* Physical Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Ruler className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Înălțime</span>
                  </div>
                  <p className="text-xl font-semibold text-deep-brown">{caseData.height} cm</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Weight className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Greutate</span>
                  </div>
                  <p className="text-xl font-semibold text-deep-brown">{caseData.weight} kg</p>
                </div>
              </div>

              {/* Implant Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Detalii Implant</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Mărime</span>
                    <Badge className="bg-rose-gold/10 text-rose-gold border-rose-gold/30">
                      {caseData.size}cc
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Tip</span>
                    <span className="text-sm font-medium text-foreground capitalize">{caseData.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Stil</span>
                    <span className="text-sm font-medium text-foreground capitalize">{caseData.style}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Tehnică</span>
                    <span className="text-sm font-medium text-foreground">
                      {caseData.technique || "Dual Plane"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Brand</span>
                    <span className="text-sm font-medium text-foreground">
                      {caseData.implantBrand || "Motiva"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Recuperare</span>
                    <span className="text-sm font-medium text-foreground">
                      {caseData.recoveryDays || "7-10"} zile
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {caseData.style === "natural" ? "Natural Look" : caseData.style === "voluptuous" ? "Voluptuous" : "Sporty"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {caseData.type}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {caseData.size}cc
                </Badge>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4">
                  Vrei un rezultat similar? Programează o consultație pentru o evaluare personalizată.
                </p>
                <Button variant="hero" className="w-full">
                  Programează Consultația
                </Button>
              </div>

              {/* Navigation Hint */}
              <p className="text-xs text-center text-muted-foreground">
                Folosește săgețile ← → pentru a naviga între cazuri
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryLightbox;

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryCase {
  id: string;
  beforeImage: string;
  afterImage: string;
  title: string;
  details: string;
}

interface GalleryLightboxProps {
  cases: GalleryCase[];
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

const GalleryLightboxAugmentare = ({
  cases,
  isOpen,
  initialIndex,
  onClose,
}: GalleryLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const currentCase = cases[currentIndex];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
    setSliderPosition(50);
  }, [cases.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === cases.length - 1 ? 0 : prev + 1));
    setSliderPosition(50);
  }, [cases.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToPrevious, goToNext, onClose]);

  // Slider drag handlers
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    },
    [isDragging]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(e.touches[0].clientX - rect.left, rect.width)
      );
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    },
    []
  );

  if (!currentCase) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/50 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-card/80 border border-border/50 hover:border-primary/50 transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Navigation arrows */}
        {cases.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-card/80 border border-border/50 hover:border-primary/50 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-card/80 border border-border/50 hover:border-primary/50 transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </>
        )}

        <div className="flex flex-col lg:flex-row h-full">
          {/* Image comparison area */}
          <div className="flex-1 relative flex items-center justify-center p-6 lg:p-10">
            <div
              className="relative w-full max-w-2xl aspect-[3/4] rounded-xl overflow-hidden cursor-ew-resize select-none"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* Before image (full) */}
              <img
                src={currentCase.beforeImage}
                alt="Înainte"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              {/* After image (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentCase.afterImage}
                  alt="După"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    width: `${(100 / sliderPosition) * 100}%`,
                    maxWidth: "none",
                  }}
                  draggable={false}
                />
              </div>

              {/* Slider line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <div className="flex items-center gap-0.5">
                    <ChevronLeft className="w-4 h-4 text-primary-foreground -mr-1" />
                    <ChevronRight className="w-4 h-4 text-primary-foreground -ml-1" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 text-white text-sm rounded-full">
                Înainte
              </span>
              <span className="absolute bottom-4 right-4 px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-full">
                După
              </span>
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:w-80 bg-card/50 border-t lg:border-t-0 lg:border-l border-border/50 p-6 lg:p-8 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                {currentIndex + 1} / {cases.length}
              </span>
            </div>

            <h3 className="font-display text-2xl font-light text-foreground mb-2">
              {currentCase.title}
            </h3>
            <p className="text-muted-foreground mb-8">{currentCase.details}</p>

            <div className="text-sm text-muted-foreground mb-8">
              <p className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-primary" />
                Trage slider-ul pentru a compara
              </p>
            </div>

            {/* Thumbnails */}
            {cases.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {cases.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setSliderPosition(50);
                    }}
                    className={`flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentIndex
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={c.afterImage}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryLightboxAugmentare;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Accessibility, X, ZoomIn, ZoomOut, Eye, Moon, RotateCcw } from "lucide-react";

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem("a11y-fontSize");
    const savedContrast = localStorage.getItem("a11y-highContrast");
    const savedMotion = localStorage.getItem("a11y-reducedMotion");

    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedContrast === "true") setHighContrast(true);
    if (savedMotion === "true") setReducedMotion(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem("a11y-fontSize", fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
    localStorage.setItem("a11y-highContrast", highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
    localStorage.setItem("a11y-reducedMotion", reducedMotion.toString());
  }, [reducedMotion]);

  const increaseFontSize = () => {
    if (fontSize < 150) setFontSize(fontSize + 10);
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) setFontSize(fontSize - 10);
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setReducedMotion(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label={isOpen ? "Închide meniul de accesibilitate" : "Deschide meniul de accesibilitate"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Accessibility className="w-5 h-5 group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-card border border-border rounded-xl shadow-2xl p-4 w-64 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground text-sm uppercase tracking-wider">Accesibilitate</h3>
            <button
              onClick={resetAll}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              aria-label="Resetează setările"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <div className="space-y-3">
            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Dimensiune text</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  className="h-8 w-8 p-0"
                  aria-label="Micșorează textul"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium text-foreground w-12 text-center">
                  {fontSize}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseFontSize}
                  disabled={fontSize >= 150}
                  className="h-8 w-8 p-0"
                  aria-label="Mărește textul"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* High Contrast */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                highContrast 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted text-foreground"
              }`}
              aria-pressed={highContrast}
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm">Contrast ridicat</span>
              {highContrast && (
                <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                  Activ
                </span>
              )}
            </button>

            {/* Reduced Motion */}
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                reducedMotion 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted text-foreground"
              }`}
              aria-pressed={reducedMotion}
            >
              <Moon className="w-4 h-4" />
              <span className="text-sm">Reduce animațiile</span>
              {reducedMotion && (
                <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                  Activ
                </span>
              )}
            </button>
          </div>

          <p className="text-[10px] text-muted-foreground mt-4 pt-3 border-t border-border">
            Setările se salvează automat pentru vizitele viitoare.
          </p>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;

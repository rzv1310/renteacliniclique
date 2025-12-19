import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, User, RotateCcw, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

type ImplantType = "rotund" | "anatomic" | "ergonomic";
type ImplantSize = 200 | 275 | 350 | 425 | 500;

interface ImplantOption {
  type: ImplantType;
  name: string;
  description: string;
}

const implantTypes: ImplantOption[] = [
  { type: "rotund", name: "Rotund", description: "Volum uniform, aspect plin" },
  { type: "anatomic", name: "Anatomic", description: "Formă naturală de lacrimă" },
  { type: "ergonomic", name: "Ergonomic", description: "Adaptabil la mișcare" },
];

const implantSizes: ImplantSize[] = [200, 275, 350, 425, 500];

const avatars = [
  { id: 1, name: "Model A", silhouette: "athletic" },
  { id: 2, name: "Model B", silhouette: "slim" },
  { id: 3, name: "Model C", silhouette: "curvy" },
];

const Simulator3DPage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<ImplantType>("anatomic");
  const [selectedSize, setSelectedSize] = useState<ImplantSize>(350);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const [zoom, setZoom] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const heroAnimation = useScrollAnimation();
  const controlsAnimation = useScrollAnimation();
  const visualAnimation = useScrollAnimation();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComparisonMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!comparisonRef.current) return;
    
    const rect = comparisonRef.current.getBoundingClientRect();
    let clientX: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setComparisonPosition(percentage);
  }, []);

  const resetSimulator = () => {
    setUploadedImage(null);
    setSelectedAvatar(1);
    setSelectedType("anatomic");
    setSelectedSize(350);
    setShowComparison(false);
    setZoom(1);
    setGeneratedImage(null);
  };

  const generateAIVisualization = async () => {
    if (!uploadedImage) {
      toast.error("Încarcă o fotografie pentru a genera vizualizarea AI");
      return;
    }

    setIsGenerating(true);
    toast.info("Se generează vizualizarea AI...", { duration: 10000 });

    try {
      const { data, error } = await supabase.functions.invoke('generate-implant-visualization', {
        body: {
          imageBase64: uploadedImage,
          implantType: selectedType,
          implantSize: selectedSize,
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Eroare la generarea vizualizării');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.generatedImage) {
        setGeneratedImage(data.generatedImage);
        setShowComparison(true);
        toast.success("Vizualizare AI generată cu succes!");
      } else {
        throw new Error('Nu s-a putut genera imaginea');
      }
    } catch (error) {
      console.error('Error generating AI visualization:', error);
      toast.error(error instanceof Error ? error.message : 'Eroare la generarea vizualizării AI');
    } finally {
      setIsGenerating(false);
    }
  };

  const getImplantTransform = () => {
    const sizeMultiplier = (selectedSize - 200) / 300;
    const baseScale = 1 + sizeMultiplier * 0.15;
    
    let shapeModifier = 0;
    if (selectedType === "rotund") shapeModifier = 0.05;
    if (selectedType === "anatomic") shapeModifier = 0.02;
    if (selectedType === "ergonomic") shapeModifier = 0.03;
    
    return {
      scale: baseScale + shapeModifier,
      projection: selectedType === "rotund" ? "fuller" : selectedType === "anatomic" ? "natural" : "adaptive",
    };
  };

  const transform = getImplantTransform();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div ref={heroAnimation.ref as React.RefObject<HTMLDivElement>} className={`text-center max-w-3xl mx-auto scroll-animate ${heroAnimation.isVisible ? 'visible' : ''}`}>
            <span className="text-label mb-6 inline-block">
              Simulator 3D Interactiv cu AI
            </span>
            <h1 className="h2-section text-foreground mb-6">
              Vizualizează-ți <span className="text-gradient-gold">Transformarea</span>
            </h1>
            <p className="text-body">
              Încarcă o poză și folosește AI pentru a vedea rezultate realiste cu diferite tipuri și mărimi de implanturi.
            </p>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Panel - Controls */}
            <div ref={controlsAnimation.ref as React.RefObject<HTMLDivElement>} className={`space-y-8 scroll-animate ${controlsAnimation.isVisible ? 'visible' : ''}`}>
              {/* Image Upload Section */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border/30">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  1. Încarcă Poza sau Alege Avatar
                </h3>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <Button
                  className="w-full mb-4 btn-primary-rose-gold"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Încarcă Fotografie
                </Button>

                {uploadedImage && (
                  <p className="text-sm text-green-500 text-center mb-4">
                    ✓ Fotografie încărcată - gata pentru generare AI
                  </p>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/30" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-4 text-sm text-muted-foreground">sau alege avatar</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => {
                        setUploadedImage(null);
                        setSelectedAvatar(avatar.id);
                        setGeneratedImage(null);
                      }}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        !uploadedImage && selectedAvatar === avatar.id
                          ? "border-rose-gold shadow-gold"
                          : "border-border/30 hover:border-rose-gold/50"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-muted flex items-center justify-center">
                        <User className="w-12 h-12 text-rose-gold/60" />
                      </div>
                      <span className="absolute bottom-2 left-0 right-0 text-center text-xs font-medium text-muted-foreground">
                        {avatar.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Implant Type Selection */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border/30">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  2. Alege Tipul de Implant
                </h3>
                
                <div className="space-y-3">
                  {implantTypes.map((implant) => (
                    <button
                      key={implant.type}
                      onClick={() => setSelectedType(implant.type)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        selectedType === implant.type
                          ? "border-rose-gold bg-rose-gold/10 shadow-md"
                          : "border-border/30 hover:border-rose-gold/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{implant.name}</p>
                          <p className="text-sm text-muted-foreground">{implant.description}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          selectedType === implant.type ? "bg-rose-gold" : "bg-muted"
                        }`}>
                          {implant.type === "rotund" && (
                            <div className="w-6 h-6 rounded-full transition-all duration-300" 
                                 style={{ backgroundColor: selectedType === implant.type ? "white" : "hsl(var(--rose-gold))", opacity: 0.6 }} />
                          )}
                          {implant.type === "anatomic" && (
                            <div className="w-6 h-7 rounded-t-full rounded-b-[70%] transition-all duration-300"
                                 style={{ backgroundColor: selectedType === implant.type ? "white" : "hsl(var(--rose-gold))", opacity: 0.6 }} />
                          )}
                          {implant.type === "ergonomic" && (
                            <div className="w-6 h-6 transform rotate-12 transition-all duration-300"
                                 style={{ 
                                   backgroundColor: selectedType === implant.type ? "white" : "hsl(var(--rose-gold))",
                                   opacity: 0.6,
                                   borderRadius: "50% 50% 40% 40%"
                                 }} />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Implant Size Selection */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border/30">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  3. Selectează Mărimea
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>200cc</span>
                    <span>500cc</span>
                  </div>
                  
                  <input
                    type="range"
                    min={200}
                    max={500}
                    step={25}
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(Number(e.target.value) as ImplantSize)}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-rose-gold"
                  />
                  
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-rose-gold/10 rounded-full transition-all duration-300">
                      <span className="text-2xl font-display font-semibold text-rose-gold transition-all duration-300">{selectedSize}</span>
                      <span className="text-muted-foreground">cc</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2 mt-4">
                    {implantSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-rose-gold text-white"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Generate Button */}
              {uploadedImage && (
                <Button
                  className="w-full btn-primary-rose-gold h-14 text-lg"
                  onClick={generateAIVisualization}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Se generează...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generează Vizualizare AI
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Right Panel - Visualization */}
            <div ref={visualAnimation.ref as React.RefObject<HTMLDivElement>} className={`lg:sticky lg:top-24 scroll-animate ${visualAnimation.isVisible ? 'visible' : ''}`}>
              <div className="bg-card rounded-2xl overflow-hidden shadow-elegant border border-border/30">
                {/* Toolbar */}
                <div className="flex items-center justify-between p-4 border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground w-16 text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button
                    variant={showComparison ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowComparison(!showComparison)}
                    disabled={!generatedImage && !uploadedImage}
                    className={showComparison ? "bg-rose-gold hover:bg-rose-gold/90" : "border-border/50 text-muted-foreground"}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <ChevronRight className="w-4 h-4 -ml-2" />
                    <span className="ml-1">Comparare</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" onClick={resetSimulator} className="text-muted-foreground hover:text-foreground">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                {/* Visualization Area */}
                <div 
                  ref={comparisonRef}
                  className="relative aspect-[3/4] bg-gradient-to-b from-muted to-background overflow-hidden cursor-ew-resize"
                  onMouseMove={showComparison ? handleComparisonMove : undefined}
                  onTouchMove={showComparison ? handleComparisonMove : undefined}
                >
                  {/* Loading Overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                      <Loader2 className="w-12 h-12 text-rose-gold animate-spin mb-4" />
                      <p className="text-foreground font-medium">Se generează vizualizarea AI...</p>
                      <p className="text-sm text-muted-foreground mt-2">Acest proces poate dura câteva secunde</p>
                    </div>
                  )}

                  {/* Before View (Left) */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ 
                      clipPath: showComparison ? `inset(0 ${100 - comparisonPosition}% 0 0)` : "none",
                      transform: `scale(${zoom})`,
                      transition: "transform 0.2s ease"
                    }}
                  >
                    {uploadedImage ? (
                      <img 
                        src={uploadedImage} 
                        alt="Înainte" 
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="relative">
                        {/* Avatar Silhouette - Before */}
                        <svg viewBox="0 0 200 300" className="w-48 h-72">
                          <defs>
                            <linearGradient id="skinGradientBefore" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="hsl(var(--rose-gold))" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.5" />
                            </linearGradient>
                          </defs>
                          <ellipse cx="100" cy="60" rx="35" ry="45" fill="url(#skinGradientBefore)" />
                          <path 
                            d="M 60 100 Q 50 120 45 160 Q 40 200 50 250 L 80 300 L 120 300 L 150 250 Q 160 200 155 160 Q 150 120 140 100 Z" 
                            fill="url(#skinGradientBefore)"
                          />
                          <ellipse cx="75" cy="140" rx="18" ry="15" fill="hsl(var(--rose-gold))" opacity="0.2" />
                          <ellipse cx="125" cy="140" rx="18" ry="15" fill="hsl(var(--rose-gold))" opacity="0.2" />
                        </svg>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-muted-foreground whitespace-nowrap">
                          Înainte
                        </span>
                      </div>
                    )}
                  </div>

                  {/* After View (Right / Full when not comparing) */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ 
                      clipPath: showComparison ? `inset(0 0 0 ${comparisonPosition}%)` : "none",
                      transform: `scale(${zoom})`,
                      transition: "transform 0.2s ease"
                    }}
                  >
                    {generatedImage ? (
                      <img 
                        src={generatedImage} 
                        alt="După - AI Generated" 
                        className="max-w-full max-h-full object-contain transition-opacity duration-500"
                      />
                    ) : uploadedImage ? (
                      <div className="relative">
                        <img 
                          src={uploadedImage} 
                          alt="După" 
                          className="max-w-full max-h-full object-contain"
                        />
                        <div 
                          className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
                          style={{
                            background: `radial-gradient(ellipse ${40 + (selectedType === "rotund" ? 5 : 0)}% ${30 + (selectedSize - 200) / 20}% at 35% 45%, hsla(var(--rose-gold), ${selectedType === "ergonomic" ? 0.2 : 0.15}) 0%, transparent 70%),
                                         radial-gradient(ellipse ${40 + (selectedType === "rotund" ? 5 : 0)}% ${30 + (selectedSize - 200) / 20}% at 65% 45%, hsla(var(--rose-gold), ${selectedType === "ergonomic" ? 0.2 : 0.15}) 0%, transparent 70%)`,
                            transform: `scaleY(${transform.scale})`,
                            transformOrigin: "center 45%"
                          }}
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        {/* Avatar Silhouette - After with implants */}
                        <svg viewBox="0 0 200 300" className="w-48 h-72">
                          <defs>
                            <linearGradient id="skinGradientAfter" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="hsl(var(--rose-gold))" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.6" />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <ellipse cx="100" cy="60" rx="35" ry="45" fill="url(#skinGradientAfter)" />
                          <path 
                            d="M 60 100 Q 50 120 45 160 Q 40 200 50 250 L 80 300 L 120 300 L 150 250 Q 160 200 155 160 Q 150 120 140 100 Z" 
                            fill="url(#skinGradientAfter)"
                          />
                          <ellipse 
                            cx="75" 
                            cy={140 + (selectedType === "anatomic" ? 3 : 0)} 
                            rx={18 + (selectedSize - 200) / 25} 
                            ry={15 + (selectedSize - 200) / 30 + (selectedType === "anatomic" ? 3 : selectedType === "rotund" ? -1 : 1)} 
                            fill="hsl(var(--rose-gold))" 
                            opacity={selectedType === "ergonomic" ? 0.4 : 0.35}
                            filter="url(#glow)"
                            className="transition-all duration-500 ease-out"
                          />
                          <ellipse 
                            cx="125" 
                            cy={140 + (selectedType === "anatomic" ? 3 : 0)} 
                            rx={18 + (selectedSize - 200) / 25} 
                            ry={15 + (selectedSize - 200) / 30 + (selectedType === "anatomic" ? 3 : selectedType === "rotund" ? -1 : 1)} 
                            fill="hsl(var(--rose-gold))" 
                            opacity={selectedType === "ergonomic" ? 0.4 : 0.35}
                            filter="url(#glow)"
                            className="transition-all duration-500 ease-out"
                          />
                          <ellipse 
                            cx={70 + (selectedType === "rotund" ? 2 : 0)} 
                            cy={135 + (selectedType === "anatomic" ? 2 : 0)} 
                            rx={8 + (selectedSize - 200) / 50} 
                            ry={6 + (selectedSize - 200) / 60} 
                            fill="white" 
                            opacity="0.3"
                            className="transition-all duration-500 ease-out"
                          />
                          <ellipse 
                            cx={120 + (selectedType === "rotund" ? 2 : 0)} 
                            cy={135 + (selectedType === "anatomic" ? 2 : 0)} 
                            rx={8 + (selectedSize - 200) / 50} 
                            ry={6 + (selectedSize - 200) / 60} 
                            fill="white" 
                            opacity="0.3"
                            className="transition-all duration-500 ease-out"
                          />
                        </svg>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-rose-gold whitespace-nowrap">
                          După - {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} {selectedSize}cc
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Comparison Slider Line */}
                  {showComparison && (
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-foreground shadow-lg cursor-ew-resize z-10"
                      style={{ left: `${comparisonPosition}%`, transform: "translateX(-50%)" }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center border border-border/30">
                        <ChevronLeft className="w-4 h-4 text-rose-gold" />
                        <ChevronRight className="w-4 h-4 text-rose-gold -ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Labels when comparing */}
                  {showComparison && (
                    <>
                      <div className="absolute top-4 left-4 px-3 py-1 bg-muted/80 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
                        Înainte
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 bg-rose-gold/80 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                        {generatedImage ? "După (AI)" : "După"}
                      </div>
                    </>
                  )}
                </div>

                {/* Info Panel */}
                <div className="p-4 bg-muted/50 border-t border-border/30">
                  <div className="flex items-center justify-between text-sm">
                    <div className="transition-all duration-300">
                      <span className="text-muted-foreground">Tip selectat:</span>
                      <span className="ml-2 font-semibold text-foreground transition-colors duration-300">
                        {implantTypes.find(t => t.type === selectedType)?.name}
                      </span>
                    </div>
                    <div className="transition-all duration-300">
                      <span className="text-muted-foreground">Mărime:</span>
                      <span className="ml-2 font-semibold text-rose-gold transition-all duration-300">{selectedSize}cc</span>
                    </div>
                  </div>
                  {generatedImage && (
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Vizualizare generată cu AI
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6 text-center">
                <Button className="w-full sm:w-auto btn-primary-rose-gold h-14 px-8 text-base">
                  Programează Consultație pentru Simulare 3D Profesională
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Simularea finală se realizează în cabinet cu echipament profesional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Simulator3DPage;

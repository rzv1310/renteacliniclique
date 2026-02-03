import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, User, RotateCcw, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Sparkles, Loader2, HelpCircle, Clock, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SEOHead from "@/components/SEOHead";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroSimulator from "@/assets/heroes/hero-simulator.jpg";

interface RateLimits {
  limits: {
    minute: { used: number; limit: number; remaining: number };
    hour: { used: number; limit: number; remaining: number };
    day: { used: number; limit: number; remaining: number };
  };
  canGenerate: boolean;
  limitType: 'minute' | 'hour' | 'day' | null;
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Cât de precisă este simularea AI?",
    answer: "Simularea AI oferă o aproximare realistă bazată pe algoritmi avansați de inteligență artificială. Totuși, rezultatul final poate varia în funcție de anatomia individuală, tehnica chirurgicală și procesul de vindecare. Recomandăm consultația în cabinet pentru o simulare 3D profesională cu echipament dedicat."
  },
  {
    question: "Ce tip de implant este potrivit pentru mine?",
    answer: "Alegerea tipului de implant depinde de mai mulți factori: anatomia ta naturală, stilul de viață, preferințele estetice și recomandările medicului. Implanturile rotunde oferă volum uniform, cele anatomice au formă naturală de lacrimă, iar cele ergonomice se adaptează la mișcare. Consultația cu medicul este esențială pentru alegerea optimă."
  },
  {
    question: "Ce mărime ar trebui să aleg?",
    answer: "Mărimea ideală depinde de proporțiile corpului, lățimea toracelui și așteptările tale. Simulatorul te ajută să vizualizezi diferite opțiuni, dar decizia finală se ia împreună cu medicul specialist care va lua în considerare toți factorii anatomici și dorințele tale."
  },
  {
    question: "Pot încărca orice tip de fotografie?",
    answer: "Pentru cele mai bune rezultate, recomandăm o fotografie din față sau ușor din lateral, cu iluminare uniformă și un fundal simplu. Fotografiile trebuie să fie clare și să arate zona toracică pentru ca AI-ul să poată genera o vizualizare cât mai precisă."
  },
  {
    question: "Datele mele sunt în siguranță?",
    answer: "Da, confidențialitatea ta este prioritară. Fotografiile încărcate sunt procesate securizat și nu sunt stocate permanent pe serverele noastre. Utilizăm criptare end-to-end și respectăm toate reglementările GDPR pentru protecția datelor personale."
  },
  {
    question: "Cum mă programez pentru o consultație?",
    answer: "Poți programa o consultație direct prin pagina de contact sau sunând la clinică. În cadrul consultației, vei beneficia de o simulare 3D profesională cu echipament dedicat, discuții detaliate despre opțiuni și un plan personalizat de tratament."
  }
];

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
  const [rateLimits, setRateLimits] = useState<RateLimits | null>(null);
  const [isLoadingLimits, setIsLoadingLimits] = useState(true);
  const [resetTimer, setResetTimer] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const controlsAnimation = useScrollAnimation();
  const visualAnimation = useScrollAnimation();

  const fetchRateLimits = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-rate-limits');
      if (error) {
        console.error('Error fetching rate limits:', error);
        return;
      }
      setRateLimits(data);
    } catch (error) {
      console.error('Error fetching rate limits:', error);
    } finally {
      setIsLoadingLimits(false);
    }
  }, []);

  useEffect(() => {
    fetchRateLimits();
  }, [fetchRateLimits]);

  // Timer effect for minute reset countdown
  useEffect(() => {
    if (rateLimits && rateLimits.limits.minute.remaining === 0) {
      // Start 60 second countdown
      setResetTimer(60);
    }
  }, [rateLimits]);

  useEffect(() => {
    if (resetTimer > 0) {
      const interval = setInterval(() => {
        setResetTimer(prev => {
          if (prev <= 1) {
            // Timer finished, refresh limits
            fetchRateLimits();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resetTimer, fetchRateLimits]);

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

  const downloadGeneratedImage = () => {
    if (!generatedImage) {
      toast.error("Nu există imagine de descărcat");
      return;
    }

    try {
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `simulare-implant-${selectedType}-${selectedSize}cc-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Imaginea a fost descărcată!");
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error("Eroare la descărcarea imaginii");
    }
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
        // Show tips if available
        if (data?.tips && data?.showTips) {
          toast.error(
            <div className="space-y-2">
              <p className="font-medium">{data.error}</p>
              <p className="text-sm text-muted-foreground">Sfaturi pentru o vizualizare reușită:</p>
              <ul className="text-sm list-disc pl-4 space-y-1">
                {data.tips.slice(0, 3).map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>,
            { duration: 20000 }
          );
        } else {
          throw new Error(data.error);
        }
        fetchRateLimits();
        return;
      }

      if (data?.generatedImage) {
        setGeneratedImage(data.generatedImage);
        setShowComparison(true);
        toast.success("Vizualizare AI generată cu succes!");
        // Refresh rate limits after generation
        fetchRateLimits();
      } else {
        throw new Error('Nu s-a putut genera imaginea');
      }
    } catch (error) {
      console.error('Error generating AI visualization:', error);
      toast.error(
        <div className="space-y-2">
          <p>{error instanceof Error ? error.message : 'Eroare la generarea vizualizării AI'}</p>
          <p className="text-xs text-muted-foreground">Încercați cu o fotografie frontală clară.</p>
        </div>,
        { duration: 12000 }
      );
      // Refresh rate limits on error too (in case it was a rate limit error)
      fetchRateLimits();
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
      <SEOHead
        title="Simulator 3D Implanturi Mamare AI | Vizualizare Rezultate | Rentéa București"
        description="Simulator AI pentru vizualizarea rezultatelor de augmentare mamară. Încarcă o poză și vezi cum vei arăta cu diferite tipuri de implanturi."
        keywords="simulator implant mamar, vizualizare augmentare, simulator 3d sani, preview implant"
        canonical="/simulator-3d"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroSimulator} 
            alt="Simulator 3D cu Inteligență Artificială" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <span className="text-label mb-6 inline-block">
            Simulator 3D Interactiv cu AI
          </span>
          <h1 className="h2-section text-foreground mb-6">
            Vizualizează-ți <span className="text-gradient-gold">Transformarea</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Încarcă o poză și folosește AI pentru a vedea rezultate realiste cu diferite tipuri și mărimi de implanturi.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Simulator Section */}
      <section className="py-24 bg-background">
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
                    <div className="bg-rose-gold/10 border border-rose-gold/30 rounded-xl px-6 py-3 text-center">
                      <p className="text-2xl font-bold text-rose-gold">{selectedSize}cc</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedSize <= 275 ? "Subtil & Natural" : 
                         selectedSize <= 375 ? "Moderat & Feminin" : 
                         "Dramatic & Voluptuos"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Limits Display */}
              {!isLoadingLimits && rateLimits && (
                <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border/30">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-rose-gold" />
                    Limite Generare AI
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Pe minut:</span>
                      <span className={rateLimits.limits.minute.remaining === 0 ? "text-destructive font-medium" : "text-foreground"}>
                        {rateLimits.limits.minute.remaining} / {rateLimits.limits.minute.limit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Pe oră:</span>
                      <span className={rateLimits.limits.hour.remaining === 0 ? "text-destructive font-medium" : "text-foreground"}>
                        {rateLimits.limits.hour.remaining} / {rateLimits.limits.hour.limit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Pe zi:</span>
                      <span className={rateLimits.limits.day.remaining === 0 ? "text-destructive font-medium" : "text-foreground"}>
                        {rateLimits.limits.day.remaining} / {rateLimits.limits.day.limit}
                      </span>
                    </div>
                    {resetTimer > 0 && (
                      <p className="text-xs text-rose-gold mt-2">
                        Limita pe minut se resetează în {resetTimer}s
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Generate Button */}
              <Button
                className="w-full btn-primary-rose-gold py-6 text-lg"
                onClick={generateAIVisualization}
                disabled={isGenerating || !uploadedImage || (rateLimits && !rateLimits.canGenerate)}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Se generează...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generează cu AI
                  </>
                )}
              </Button>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={resetSimulator}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Resetează
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={downloadGeneratedImage}
                  disabled={!generatedImage}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descarcă
                </Button>
              </div>
            </div>

            {/* Right Panel - Visualization */}
            <div ref={visualAnimation.ref as React.RefObject<HTMLDivElement>} className={`scroll-animate ${visualAnimation.isVisible ? 'visible' : ''}`}>
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border/30 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Previzualizare
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">{Math.round(zoom * 100)}%</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Visualization Area */}
                <div 
                  ref={comparisonRef}
                  className="relative aspect-[3/4] bg-muted rounded-xl overflow-hidden cursor-ew-resize"
                  onMouseMove={showComparison ? handleComparisonMove : undefined}
                  onTouchMove={showComparison ? handleComparisonMove : undefined}
                >
                  {uploadedImage ? (
                    <>
                      {/* Original Image */}
                      <div 
                        className="absolute inset-0 overflow-hidden"
                        style={{ 
                          clipPath: showComparison ? `inset(0 ${100 - comparisonPosition}% 0 0)` : 'none',
                          transform: `scale(${zoom})`,
                          transformOrigin: 'center'
                        }}
                      >
                        <img 
                          src={uploadedImage} 
                          alt="Original" 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Generated Image */}
                      {generatedImage && showComparison && (
                        <div 
                          className="absolute inset-0 overflow-hidden"
                          style={{ 
                            clipPath: `inset(0 0 0 ${comparisonPosition}%)`,
                            transform: `scale(${zoom})`,
                            transformOrigin: 'center'
                          }}
                        >
                          <img 
                            src={generatedImage} 
                            alt="Rezultat AI" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Comparison Slider */}
                      {showComparison && generatedImage && (
                        <div 
                          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
                          style={{ left: `${comparisonPosition}%` }}
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <ChevronLeft className="w-4 h-4 text-muted-foreground absolute -left-0.5" />
                            <ChevronRight className="w-4 h-4 text-muted-foreground absolute -right-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Labels */}
                      {showComparison && generatedImage && (
                        <>
                          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                            Înainte
                          </div>
                          <div className="absolute top-4 right-4 bg-rose-gold text-white px-3 py-1 rounded-full text-xs">
                            După (AI)
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <User className="w-24 h-24 mb-4 opacity-30" />
                      <p className="text-sm">Încarcă o fotografie pentru a începe</p>
                    </div>
                  )}

                  {/* Loading Overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-20">
                      <Loader2 className="w-12 h-12 text-rose-gold animate-spin mb-4" />
                      <p className="text-foreground font-medium">Se generează vizualizarea AI...</p>
                      <p className="text-sm text-muted-foreground mt-2">Aceasta poate dura până la 30 de secunde</p>
                    </div>
                  )}
                </div>

                {/* Selected Options Summary */}
                <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                  <h4 className="text-sm font-medium text-foreground mb-2">Selecție curentă:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tip:</span>
                      <span className="ml-2 text-foreground font-medium capitalize">{selectedType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Mărime:</span>
                      <span className="ml-2 text-foreground font-medium">{selectedSize}cc</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-gold/10 mb-4">
                <HelpCircle className="w-6 h-6 text-rose-gold" />
              </div>
              <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
                Întrebări Frecvente
              </h2>
              <p className="text-muted-foreground">
                Răspunsuri la cele mai comune întrebări despre simulatorul AI
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-background rounded-xl border border-border/30 px-6"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-rose-gold py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Simulator3DPage;

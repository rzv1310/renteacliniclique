import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, User, RotateCcw, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Sparkles, Loader2, HelpCircle, Download, Crop, Clapperboard } from "lucide-react";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SEOHead from "@/components/SEOHead";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  API_UNAVAILABLE_MESSAGE,
  buildApiUrl,
  isServerUnavailableError,
  isUnavailableProxyResponse,
  parseJsonSafely,
} from "@/lib/api";
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

interface AnimationRateLimits {
  user: RateLimits;
  global: RateLimits;
  canAnimate: boolean;
}

interface AnimationStartResponse {
  jobId: string;
  status: "queued" | "processing" | "completed" | "failed";
}

interface AnimationStatusResponse {
  jobId: string;
  status: "queued" | "processing" | "completed" | "failed";
  error?: string | null;
  videoReady?: boolean;
  videoUrl?: string | null;
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CLIENT_GENERATION_LIMIT_PER_HOUR = 3;
const CLIENT_GENERATION_WINDOW_MS = 60 * 60 * 1000;
const CLIENT_GENERATION_STORAGE_KEY = "simulator-client-generations-v1";
const CLIENT_ANIMATION_LIMIT_PER_HOUR = 1;
const CLIENT_ANIMATION_WINDOW_MS = 60 * 60 * 1000;
const CLIENT_ANIMATION_STORAGE_KEY = "simulator-client-animations-v1";
const GENERIC_ANIMATION_FAILURE_MESSAGE =
  "Nu am putut genera animația în acest moment. Te rugăm să încerci din nou.";

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
type CropHandle = "move" | "nw" | "ne" | "sw" | "se";

type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ClientGenerationLimitSnapshot = {
  used: number;
  limit: number;
  remaining: number;
  canGenerate: boolean;
  nextResetAt: number | null;
};

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

const DEFAULT_CROP_RECT: CropRect = {
  x: 0,
  y: 0,
  width: 1,
  height: 1,
};

const MIN_CROP_SIZE = 0.15;
const FULL_CROP_EPSILON = 0.002;

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const loadClientTimestamps = (storageKey: string): number[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  } catch {
    return [];
  }
};

const saveClientTimestamps = (storageKey: string, timestamps: number[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(timestamps));
  } catch {
    // Ignore storage errors.
  }
};

const loadClientGenerationTimestamps = (): number[] => loadClientTimestamps(CLIENT_GENERATION_STORAGE_KEY);
const saveClientGenerationTimestamps = (timestamps: number[]) =>
  saveClientTimestamps(CLIENT_GENERATION_STORAGE_KEY, timestamps);
const loadClientAnimationTimestamps = (): number[] => loadClientTimestamps(CLIENT_ANIMATION_STORAGE_KEY);
const saveClientAnimationTimestamps = (timestamps: number[]) =>
  saveClientTimestamps(CLIENT_ANIMATION_STORAGE_KEY, timestamps);

const buildClientLimitSnapshot = (
  timestamps: number[],
  limit: number,
  now = Date.now()
): ClientGenerationLimitSnapshot => {
  const recent = timestamps.filter((timestamp) => timestamp > now - CLIENT_GENERATION_WINDOW_MS);
  const used = recent.length;
  const remaining = Math.max(0, limit - used);
  const canGenerate = remaining > 0;
  const oldestRecent = recent.length > 0 ? Math.min(...recent) : null;
  const nextResetAt = oldestRecent ? oldestRecent + CLIENT_GENERATION_WINDOW_MS : null;

  return {
    used,
    limit,
    remaining,
    canGenerate,
    nextResetAt,
  };
};

const formatRemainingTime = (milliseconds: number): string => {
  const totalSeconds = Math.max(1, Math.ceil(milliseconds / 1000));
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }

  const totalMinutes = Math.ceil(totalSeconds / 60);
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const totalHours = Math.ceil(totalMinutes / 60);
  return `${totalHours}h`;
};

const Simulator3DPage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<ImplantType>("anatomic");
  const [selectedSize, setSelectedSize] = useState<ImplantSize>(350);
  const [customPrompt, setCustomPrompt] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const [zoom, setZoom] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [animationJobId, setAnimationJobId] = useState<string | null>(null);
  const [animationRateLimits, setAnimationRateLimits] = useState<AnimationRateLimits | null>(null);
  const [rateLimits, setRateLimits] = useState<RateLimits | null>(null);
  const [clientLimitSnapshot, setClientLimitSnapshot] = useState<ClientGenerationLimitSnapshot>(
    () => buildClientLimitSnapshot([], CLIENT_GENERATION_LIMIT_PER_HOUR)
  );
  const [clientAnimationSnapshot, setClientAnimationSnapshot] = useState<ClientGenerationLimitSnapshot>(
    () =>
      buildClientLimitSnapshot(
        loadClientAnimationTimestamps().filter(
          (timestamp) => timestamp > Date.now() - CLIENT_ANIMATION_WINDOW_MS
        ),
        CLIENT_ANIMATION_LIMIT_PER_HOUR
      )
  );
  const [cropSourceImage, setCropSourceImage] = useState<string | null>(null);
  const [cropRect, setCropRect] = useState<CropRect>(DEFAULT_CROP_RECT);
  const [cropActiveHandle, setCropActiveHandle] = useState<CropHandle | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const cropImageFrameRef = useRef<HTMLDivElement>(null);
  const cropDragStartRef = useRef<{
    handle: CropHandle;
    startClientX: number;
    startClientY: number;
    initialRect: CropRect;
  } | null>(null);

  const controlsAnimation = useScrollAnimation();
  const visualAnimation = useScrollAnimation();

  const refreshClientLimitSnapshot = useCallback(() => {
    const now = Date.now();
    const timestamps = loadClientGenerationTimestamps().filter(
      (timestamp) => timestamp > now - CLIENT_GENERATION_WINDOW_MS
    );
    saveClientGenerationTimestamps(timestamps);
    setClientLimitSnapshot(buildClientLimitSnapshot(timestamps, CLIENT_GENERATION_LIMIT_PER_HOUR, now));
  }, []);

  const recordClientGeneration = useCallback(() => {
    const now = Date.now();
    const timestamps = loadClientGenerationTimestamps().filter(
      (timestamp) => timestamp > now - CLIENT_GENERATION_WINDOW_MS
    );
    timestamps.push(now);
    saveClientGenerationTimestamps(timestamps);
    setClientLimitSnapshot(buildClientLimitSnapshot(timestamps, CLIENT_GENERATION_LIMIT_PER_HOUR, now));
  }, []);

  const refreshClientAnimationSnapshot = useCallback(() => {
    const now = Date.now();
    const timestamps = loadClientAnimationTimestamps().filter(
      (timestamp) => timestamp > now - CLIENT_ANIMATION_WINDOW_MS
    );
    saveClientAnimationTimestamps(timestamps);
    setClientAnimationSnapshot(
      buildClientLimitSnapshot(timestamps, CLIENT_ANIMATION_LIMIT_PER_HOUR, now)
    );
  }, []);

  const recordClientAnimation = useCallback(() => {
    const now = Date.now();
    const timestamps = loadClientAnimationTimestamps().filter(
      (timestamp) => timestamp > now - CLIENT_ANIMATION_WINDOW_MS
    );
    timestamps.push(now);
    saveClientAnimationTimestamps(timestamps);
    setClientAnimationSnapshot(
      buildClientLimitSnapshot(timestamps, CLIENT_ANIMATION_LIMIT_PER_HOUR, now)
    );
  }, []);

  const fetchRateLimits = useCallback(async () => {
    try {
      console.info("[Simulator] Fetching rate limits...");
      const response = await fetch(buildApiUrl('/api/check-rate-limits'));
      const rawResponse = await response.text();
      const data = parseJsonSafely<RateLimits | { error?: string }>(rawResponse);
      console.info("[Simulator] Rate limit response", {
        status: response.status,
        data,
      });

      if (!response.ok) {
        if (isUnavailableProxyResponse(response.status, rawResponse)) {
          console.error(API_UNAVAILABLE_MESSAGE);
          return;
        }
        console.error('Error fetching rate limits:', data);
        return;
      }

      if (!data) {
        console.error("Rate limits response was not valid JSON.");
        return;
      }

      setRateLimits(data as RateLimits);
    } catch (error) {
      if (isServerUnavailableError(error)) {
        console.error(API_UNAVAILABLE_MESSAGE, error);
        return;
      }
      console.error('Error fetching rate limits:', error);
    }
  }, []);

  const fetchAnimationRateLimits = useCallback(async () => {
    try {
      console.info("[Simulator] Fetching animation rate limits...");
      const response = await fetch(buildApiUrl('/api/check-animation-rate-limits'));
      const rawResponse = await response.text();
      const data = parseJsonSafely<AnimationRateLimits | { error?: string }>(rawResponse);

      if (!response.ok) {
        if (isUnavailableProxyResponse(response.status, rawResponse)) {
          console.error(API_UNAVAILABLE_MESSAGE);
          return;
        }
        console.error('Error fetching animation rate limits:', data);
        return;
      }

      if (!data) {
        console.error("Animation rate limits response was not valid JSON.");
        return;
      }

      setAnimationRateLimits(data as AnimationRateLimits);
    } catch (error) {
      if (isServerUnavailableError(error)) {
        console.error(API_UNAVAILABLE_MESSAGE, error);
        return;
      }
      console.error('Error fetching animation rate limits:', error);
    }
  }, []);

  useEffect(() => {
    fetchRateLimits();
    fetchAnimationRateLimits();
  }, [fetchRateLimits, fetchAnimationRateLimits]);

  useEffect(() => {
    refreshClientLimitSnapshot();
    refreshClientAnimationSnapshot();
  }, [refreshClientLimitSnapshot, refreshClientAnimationSnapshot]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshClientLimitSnapshot();
      refreshClientAnimationSnapshot();
    }, 1000);

    return () => clearInterval(interval);
  }, [refreshClientLimitSnapshot, refreshClientAnimationSnapshot]);

  useEffect(() => {
    if (!rateLimits || rateLimits.canGenerate) {
      return;
    }

    const interval = setInterval(() => {
      fetchRateLimits();
    }, 10_000);

    return () => clearInterval(interval);
  }, [rateLimits, fetchRateLimits]);

  useEffect(() => {
    if (!animationRateLimits || animationRateLimits.canAnimate) {
      return;
    }

    const interval = setInterval(() => {
      fetchAnimationRateLimits();
    }, 10_000);

    return () => clearInterval(interval);
  }, [animationRateLimits, fetchAnimationRateLimits]);

  useEffect(() => {
    if (!cropActiveHandle) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      const dragStart = cropDragStartRef.current;
      const frame = cropImageFrameRef.current;
      if (!dragStart || !frame) {
        return;
      }

      const frameRect = frame.getBoundingClientRect();
      if (!frameRect.width || !frameRect.height) {
        return;
      }

      const deltaX = (event.clientX - dragStart.startClientX) / frameRect.width;
      const deltaY = (event.clientY - dragStart.startClientY) / frameRect.height;
      const { initialRect, handle } = dragStart;
      const startLeft = initialRect.x;
      const startTop = initialRect.y;
      const startRight = initialRect.x + initialRect.width;
      const startBottom = initialRect.y + initialRect.height;

      let left = startLeft;
      let top = startTop;
      let right = startRight;
      let bottom = startBottom;

      if (handle === "move") {
        const width = initialRect.width;
        const height = initialRect.height;
        left = clamp(startLeft + deltaX, 0, 1 - width);
        top = clamp(startTop + deltaY, 0, 1 - height);
        right = left + width;
        bottom = top + height;
      } else if (handle === "nw") {
        left = clamp(startLeft + deltaX, 0, startRight - MIN_CROP_SIZE);
        top = clamp(startTop + deltaY, 0, startBottom - MIN_CROP_SIZE);
      } else if (handle === "ne") {
        right = clamp(startRight + deltaX, startLeft + MIN_CROP_SIZE, 1);
        top = clamp(startTop + deltaY, 0, startBottom - MIN_CROP_SIZE);
      } else if (handle === "sw") {
        left = clamp(startLeft + deltaX, 0, startRight - MIN_CROP_SIZE);
        bottom = clamp(startBottom + deltaY, startTop + MIN_CROP_SIZE, 1);
      } else if (handle === "se") {
        right = clamp(startRight + deltaX, startLeft + MIN_CROP_SIZE, 1);
        bottom = clamp(startBottom + deltaY, startTop + MIN_CROP_SIZE, 1);
      }

      setCropRect({
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
      });
    };

    const onPointerUp = () => {
      setCropActiveHandle(null);
      cropDragStartRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [cropActiveHandle]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setCropSourceImage(result);
          setCropRect(DEFAULT_CROP_RECT);
          setGeneratedImage(null);
          setGeneratedVideoUrl(null);
          setAnimationJobId(null);
          setShowComparison(false);
          setComparisonPosition(50);
        }
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    }
  };

  const startCropDrag = (handle: CropHandle, event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    cropDragStartRef.current = {
      handle,
      startClientX: event.clientX,
      startClientY: event.clientY,
      initialRect: cropRect,
    };
    setCropActiveHandle(handle);
  };

  const closeCropper = () => {
    setCropSourceImage(null);
    setCropActiveHandle(null);
    cropDragStartRef.current = null;
  };

  const applyCropToImage = async () => {
    if (!cropSourceImage) {
      return;
    }

    try {
      const cropRight = cropRect.x + cropRect.width;
      const cropBottom = cropRect.y + cropRect.height;
      const isFullCropSelection =
        cropRect.x <= FULL_CROP_EPSILON &&
        cropRect.y <= FULL_CROP_EPSILON &&
        cropRight >= 1 - FULL_CROP_EPSILON &&
        cropBottom >= 1 - FULL_CROP_EPSILON;

      if (isFullCropSelection) {
        setUploadedImage(cropSourceImage);
        setGeneratedImage(null);
        setGeneratedVideoUrl(null);
        setAnimationJobId(null);
        setShowComparison(false);
        setComparisonPosition(50);
        closeCropper();
        toast.success("Imaginea completă a fost păstrată.");
        return;
      }

      const image = new Image();
      image.src = cropSourceImage;
      await image.decode();

      const sourceX = clamp(Math.floor(cropRect.x * image.naturalWidth), 0, image.naturalWidth - 1);
      const sourceY = clamp(Math.floor(cropRect.y * image.naturalHeight), 0, image.naturalHeight - 1);
      const sourceRight = clamp(
        Math.ceil((cropRect.x + cropRect.width) * image.naturalWidth),
        sourceX + 1,
        image.naturalWidth
      );
      const sourceBottom = clamp(
        Math.ceil((cropRect.y + cropRect.height) * image.naturalHeight),
        sourceY + 1,
        image.naturalHeight
      );
      const sourceWidth = sourceRight - sourceX;
      const sourceHeight = sourceBottom - sourceY;

      const canvas = document.createElement("canvas");
      canvas.width = sourceWidth;
      canvas.height = sourceHeight;
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Nu s-a putut inițializa editorul de imagine.");
      }

      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        sourceWidth,
        sourceHeight
      );

      const croppedImage = canvas.toDataURL("image/png");
      setUploadedImage(croppedImage);
      setGeneratedImage(null);
      setGeneratedVideoUrl(null);
      setAnimationJobId(null);
      setShowComparison(false);
      setComparisonPosition(50);
      closeCropper();
      toast.success("Decuparea a fost aplicată.");
    } catch (error) {
      console.error("Error applying crop:", error);
      toast.error("Nu am putut aplica decuparea imaginii.");
    }
  };

  const openCropperForCurrentImage = () => {
    if (!uploadedImage) {
      toast.error("Încarcă mai întâi o fotografie.");
      return;
    }
    setCropSourceImage(uploadedImage);
    setCropRect(DEFAULT_CROP_RECT);
    setCropActiveHandle(null);
    cropDragStartRef.current = null;
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
    setCustomPrompt("");
    setShowComparison(false);
    setZoom(1);
    setGeneratedImage(null);
    setGeneratedVideoUrl(null);
    setAnimationJobId(null);
    closeCropper();
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

    if (clientLocked) {
      toast.error(lockDescription);
      return;
    }

    if (serverLocked) {
      toast.error(serverLimitMessage);
      return;
    }

    setIsGenerating(true);
    toast.info("Se generează vizualizarea AI...", { duration: 10000 });

    try {
      const requestPayload = {
        imageBase64: uploadedImage,
        implantType: selectedType,
        implantSize: selectedSize,
        customPrompt: customPrompt,
      };
      const startedAt = performance.now();
      console.info("[Simulator] Sending generation request", {
        implantType: selectedType,
        implantSize: selectedSize,
        customPromptLength: customPrompt.length,
        imagePayloadLength: uploadedImage.length,
      });

      const response = await fetch(buildApiUrl('/api/generate-implant-visualization'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      const rawResponse = await response.text();
      const data = parseJsonSafely<{ error?: string; tips?: string[]; showTips?: boolean; generatedImage?: string }>(rawResponse);
      console.info("[Simulator] Generation response", {
        status: response.status,
        durationMs: Math.round(performance.now() - startedAt),
        hasGeneratedImage: Boolean(data?.generatedImage),
        error: data?.error ?? null,
      });

      if (isUnavailableProxyResponse(response.status, rawResponse)) {
        throw new Error(API_UNAVAILABLE_MESSAGE);
      }

      if (response.status === 429 && data?.error) {
        toast.error(data.error);
        fetchRateLimits();
        return;
      }

      if (!response.ok && !data?.error) {
        throw new Error('Eroare la generarea vizualizării');
      }

      if (!data) {
        throw new Error('Răspuns invalid de la API.');
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
        setGeneratedVideoUrl(null);
        setAnimationJobId(null);
        setShowComparison(true);
        recordClientGeneration();
        toast.success("Vizualizare AI generată cu succes!");
        // Refresh rate limits after generation
        fetchRateLimits();
      } else {
        throw new Error('Nu s-a putut genera imaginea');
      }
    } catch (error) {
      if (isServerUnavailableError(error)) {
        console.error(API_UNAVAILABLE_MESSAGE, error);
        toast.error(API_UNAVAILABLE_MESSAGE);
        return;
      }
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

  const pollAnimationJob = useCallback(
    async (jobId: string) => {
      const startedAt = Date.now();

      while (Date.now() - startedAt < 8 * 60 * 1000) {
        const response = await fetch(buildApiUrl(`/api/animation-jobs/${jobId}`));
        const raw = await response.text();
        const data = parseJsonSafely<AnimationStatusResponse | { error?: string }>(raw);

        if (!response.ok) {
          if (isUnavailableProxyResponse(response.status, raw)) {
            throw new Error(API_UNAVAILABLE_MESSAGE);
          }

          const errorMessage = data && "error" in data && data.error ? data.error : "Eroare la verificarea statusului animației.";
          throw new Error(errorMessage);
        }

        const parsed = data as AnimationStatusResponse | null;
        if (!parsed) {
          throw new Error("Răspuns invalid la status animație.");
        }

        if (parsed.status === "failed") {
          // Keep detailed policy/debug reasons on server logs, not in user-facing toasts.
          throw new Error(GENERIC_ANIMATION_FAILURE_MESSAGE);
        }

        if (parsed.status === "completed" && parsed.videoReady && parsed.videoUrl) {
          return parsed.videoUrl;
        }

        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      throw new Error("Animația a expirat sau durează prea mult. Încearcă din nou.");
    },
    []
  );

  const animateVisualization = async () => {
    if (!generatedImage) {
      toast.error("Generează mai întâi imaginea AI.");
      return;
    }

    if (animationClientLocked) {
      toast.error(animationClientLockMessage);
      return;
    }

    if (animationServerLocked) {
      toast.error(animationServerLockMessage);
      return;
    }

    setIsAnimating(true);
    toast.info("Se pornește animația video (4 sec)...", { duration: 8000 });

    try {
      const response = await fetch(buildApiUrl("/api/animate-implant-visualization"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: generatedImage,
          implantType: selectedType,
          implantSize: selectedSize,
          customPrompt,
        }),
      });

      const raw = await response.text();
      const data = parseJsonSafely<AnimationStartResponse | { error?: string }>(raw);

      if (isUnavailableProxyResponse(response.status, raw)) {
        throw new Error(API_UNAVAILABLE_MESSAGE);
      }

      if (!response.ok) {
        const errorMessage = data && "error" in data && data.error ? data.error : "Nu am putut porni animația.";
        throw new Error(errorMessage);
      }

      const parsed = data as AnimationStartResponse | null;
      if (!parsed?.jobId) {
        throw new Error("Nu am primit jobId pentru animație.");
      }

      setAnimationJobId(parsed.jobId);
      recordClientAnimation();
      fetchAnimationRateLimits();

      toast.info("Animația este în procesare. Poate dura până la câteva minute.", { duration: 12000 });
      const videoPath = await pollAnimationJob(parsed.jobId);
      const resolvedVideoUrl = buildApiUrl(videoPath);
      setGeneratedVideoUrl(`${resolvedVideoUrl}${resolvedVideoUrl.includes("?") ? "&" : "?"}t=${Date.now()}`);
      toast.success("Animația video a fost generată cu succes!");
    } catch (error) {
      if (isServerUnavailableError(error)) {
        console.error(API_UNAVAILABLE_MESSAGE, error);
        toast.error(API_UNAVAILABLE_MESSAGE);
        return;
      }
      console.error("Error generating animation:", error);
      toast.error(GENERIC_ANIMATION_FAILURE_MESSAGE);
    } finally {
      setIsAnimating(false);
      fetchAnimationRateLimits();
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
  const clientLocked = !clientLimitSnapshot.canGenerate;
  const serverLocked = Boolean(rateLimits && !rateLimits.canGenerate);
  const animationClientLocked = !clientAnimationSnapshot.canGenerate;
  const animationServerLocked = Boolean(animationRateLimits && !animationRateLimits.canAnimate);
  const isSimulatorLocked = clientLocked || serverLocked;
  const clientRemainingMs = clientLimitSnapshot.nextResetAt
    ? Math.max(0, clientLimitSnapshot.nextResetAt - Date.now())
    : 0;
  const animationClientRemainingMs = clientAnimationSnapshot.nextResetAt
    ? Math.max(0, clientAnimationSnapshot.nextResetAt - Date.now())
    : 0;

  const serverLimitMessage =
    rateLimits?.limitType === "minute"
      ? "Generarea este temporar indisponibilă. Te rugăm să aștepți puțin și să încerci din nou."
      : rateLimits?.limitType === "hour"
      ? "Ai atins limita orară de generare. Revino mai târziu."
      : rateLimits?.limitType === "day"
      ? "Ai atins limita zilnică de generare. Revino mâine."
      : "Generarea este temporar indisponibilă.";

  const lockTitle = clientLocked
    ? "Ai atins limita locală de generare"
    : "Generare indisponibilă temporar";
  const lockDescription = clientLocked
    ? `Poți genera maximum ${CLIENT_GENERATION_LIMIT_PER_HOUR} imagini pe oră pe acest dispozitiv. Încearcă din nou peste ${formatRemainingTime(clientRemainingMs)}.`
    : serverLimitMessage;

  const animationServerLockMessage = !animationRateLimits
    ? "Animația este temporar indisponibilă."
    : !animationRateLimits.user.canGenerate
    ? "Ai atins limita de 1 animație pe oră pe acest dispozitiv."
    : animationRateLimits.global.limitType === "hour"
    ? "Limita globală de 3 animații pe oră a fost atinsă."
    : animationRateLimits.global.limitType === "day"
    ? "Limita globală de 10 animații pe zi a fost atinsă."
    : "Animația este temporar indisponibilă.";

  const animationClientLockMessage = `Poți genera maximum ${CLIENT_ANIMATION_LIMIT_PER_HOUR} animație pe oră pe acest dispozitiv. Încearcă din nou peste ${formatRemainingTime(animationClientRemainingMs)}.`;

  useEffect(() => {
    const hasGeneratedMedia = Boolean(generatedImage || generatedVideoUrl);
    if (!hasGeneratedMedia) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // Required for cross-browser leave confirmation dialogs.
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [generatedImage, generatedVideoUrl]);

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
          <div className="relative">
            <div
              className={`grid lg:grid-cols-2 gap-12 items-start transition-opacity ${
                isSimulatorLocked ? "pointer-events-none opacity-45" : ""
              }`}
            >
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

                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Confidențialitate: fotografia este procesată doar pentru generare în sesiunea curentă și nu este stocată în baza de date sau pe disc.
                </p>

                {uploadedImage && (
                  <div className="text-center mb-4">
                    <p className="text-sm text-green-500 mb-1">
                      ✓ Fotografie încărcată - gata pentru generare AI
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={openCropperForCurrentImage}
                    >
                      <Crop className="w-4 h-4 mr-2" />
                      Decupează fotografia
                    </Button>
                  </div>
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
                        setGeneratedVideoUrl(null);
                        setAnimationJobId(null);
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

              {/* Custom Prompt Selection */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border/30">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  4. Instrucțiuni Suplimentare (Opțional)
                </h3>
                
                <div className="space-y-4">
                  <Label htmlFor="custom-prompt" className="text-sm text-muted-foreground">
                    Adaugă detalii clinice pentru AI (ex: "proiecție moderată", "simetrie naturală", "contur discret")
                  </Label>
                  <Input
                    id="custom-prompt"
                    placeholder="Ex: Vreau un aspect foarte natural..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="w-full bg-background border-input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Instrucțiunile explicite sau sexualizate sunt blocate automat.
                  </p>
                </div>
              </div>

              {/* Generate Button */}
              <div className="rounded-xl border border-border/40 bg-muted/40 p-3 text-sm">
                <p className="text-foreground">
                  Limită locală dispozitiv: {clientLimitSnapshot.used}/{clientLimitSnapshot.limit} imagini/oră
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {clientLocked && clientRemainingMs > 0
                    ? `Poți genera din nou peste ${formatRemainingTime(clientRemainingMs)}.`
                    : `Disponibile acum: ${clientLimitSnapshot.remaining}`}
                </p>
              </div>

              <div className="rounded-xl border border-border/40 bg-muted/40 p-3 text-sm">
                <p className="text-foreground">
                  Limită animație dispozitiv: {clientAnimationSnapshot.used}/{CLIENT_ANIMATION_LIMIT_PER_HOUR} video/oră
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {animationClientLocked && animationClientRemainingMs > 0
                    ? `Poți anima din nou peste ${formatRemainingTime(animationClientRemainingMs)}.`
                    : `Disponibile acum: ${Math.max(0, CLIENT_ANIMATION_LIMIT_PER_HOUR - clientAnimationSnapshot.used)}`}
                </p>
                {animationRateLimits && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Global server: {animationRateLimits.global.limits.hour.used}/{animationRateLimits.global.limits.hour.limit} video/oră,{" "}
                    {animationRateLimits.global.limits.day.used}/{animationRateLimits.global.limits.day.limit} video/zi.
                  </p>
                )}
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
                            className="w-full h-full object-contain"
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
                            className="w-full h-full object-contain"
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

                {!generatedImage && (
                  <div className="mt-5">
                    <Button
                      className="w-full btn-primary-rose-gold py-6 text-lg"
                      onClick={generateAIVisualization}
                      disabled={isGenerating || !uploadedImage || isSimulatorLocked}
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
                  </div>
                )}

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetSimulator}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Resetează
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={downloadGeneratedImage}
                    disabled={!generatedImage}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descarcă
                  </Button>
                </div>

                {generatedImage && !generatedVideoUrl && (
                  <div className="mt-5">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={animateVisualization}
                      disabled={isAnimating || animationClientLocked || animationServerLocked}
                    >
                      {isAnimating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Se animează...
                        </>
                      ) : (
                        <>
                          <Clapperboard className="w-4 h-4 mr-2" />
                          Animează 4s
                        </>
                      )}
                    </Button>
                    {(animationClientLocked || animationServerLocked) && (
                      <p className="text-xs text-muted-foreground mt-3 mb-2">
                        {animationClientLocked ? animationClientLockMessage : animationServerLockMessage}
                      </p>
                    )}
                  </div>
                )}

                {generatedVideoUrl && (
                  <div className="mt-5 p-4 bg-muted/30 rounded-xl border border-border/40">
                    <p className="text-sm font-medium text-foreground mb-3">Animație generată (4s)</p>
                    <video
                      key={generatedVideoUrl}
                      src={generatedVideoUrl}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full rounded-lg bg-black"
                    />
                  </div>
                )}

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

            {isSimulatorLocked && (
              <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
                <div className="max-w-xl w-full rounded-2xl border border-border bg-card/95 shadow-elegant p-6 md:p-8 text-center backdrop-blur-sm">
                  <p className="text-lg font-display text-foreground mb-2">{lockTitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{lockDescription}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    Limitele server-side sunt aplicate automat pentru toate cererile.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {cropSourceImage && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-card border border-border/40 rounded-2xl shadow-xl p-4 md:p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display text-xl md:text-2xl text-foreground">Decupează fotografia</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Trage zona selectată sau colțurile pentru a ajusta exact ce vrei să procesezi.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border/40 bg-black/30 p-3 overflow-auto max-h-[72vh]">
              <div className="relative w-fit mx-auto select-none" ref={cropImageFrameRef}>
                <img
                  src={cropSourceImage}
                  alt="Imagine pentru decupare"
                  className="block max-h-[65vh] max-w-full"
                  draggable={false}
                />

                <div
                  className="absolute border-2 border-rose-gold shadow-[0_0_0_9999px_rgba(0,0,0,0.45)] cursor-move"
                  style={{
                    left: `${cropRect.x * 100}%`,
                    top: `${cropRect.y * 100}%`,
                    width: `${cropRect.width * 100}%`,
                    height: `${cropRect.height * 100}%`,
                  }}
                  onPointerDown={(event) => startCropDrag("move", event)}
                >
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <div key={index} className="border border-white/20" />
                    ))}
                  </div>
                  <div
                    className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full bg-rose-gold border-2 border-white cursor-nwse-resize"
                    onPointerDown={(event) => startCropDrag("nw", event)}
                  />
                  <div
                    className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-rose-gold border-2 border-white cursor-nesw-resize"
                    onPointerDown={(event) => startCropDrag("ne", event)}
                  />
                  <div
                    className="absolute -bottom-2.5 -left-2.5 w-5 h-5 rounded-full bg-rose-gold border-2 border-white cursor-nesw-resize"
                    onPointerDown={(event) => startCropDrag("sw", event)}
                  />
                  <div
                    className="absolute -bottom-2.5 -right-2.5 w-5 h-5 rounded-full bg-rose-gold border-2 border-white cursor-nwse-resize"
                    onPointerDown={(event) => startCropDrag("se", event)}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Datele imaginii rămân în browser pentru decupare și sunt trimise doar la apăsarea butonului de generare.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 justify-end">
              <Button variant="outline" onClick={closeCropper}>
                Anulează
              </Button>
              <Button variant="outline" onClick={() => setCropRect(DEFAULT_CROP_RECT)}>
                Resetare decupare
              </Button>
              <Button className="btn-primary-rose-gold" onClick={applyCropToImage}>
                Aplică decuparea
              </Button>
            </div>
          </div>
        </div>
      )}

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

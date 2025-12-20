import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import Index from "./pages/Index";

// Lazy loaded pages
const PricingPage = lazy(() => import("./pages/PricingPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Proceduri - Lazy loaded
const ProceduriIndex = lazy(() => import("./pages/proceduri/ProceduriIndex"));
const ImplantMamarBucurestiPage = lazy(() => import("./pages/proceduri/ImplantMamarBucurestiPage"));
const ImplanturiRotundePage = lazy(() => import("./pages/proceduri/ImplanturiRotundePage"));
const ImplanturiAnatomicePage = lazy(() => import("./pages/proceduri/ImplanturiAnatomicePage"));
const ImplanturiErgonomicePage = lazy(() => import("./pages/proceduri/ImplanturiErgonomicePage"));
const MastopexiePage = lazy(() => import("./pages/proceduri/MastopexiePage"));
const ReviziePage = lazy(() => import("./pages/proceduri/ReviziePage"));
const ReductieMamaraPage = lazy(() => import("./pages/proceduri/ReductieMamaraPage"));
const LipofillingMamarPage = lazy(() => import("./pages/proceduri/LipofillingMamarPage"));

// Pagini independente - Lazy loaded
const DespreNoiPage = lazy(() => import("./pages/DespreNoiPage"));
const GhidRecuperarePage = lazy(() => import("./pages/GhidRecuperarePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TurismMedicalPage = lazy(() => import("./pages/TurismMedicalPage"));
const FinantarePage = lazy(() => import("./pages/FinantarePage"));
const Simulator3DPage = lazy(() => import("./pages/Simulator3DPage"));

// Legal pages - Lazy loaded
const CookiesPage = lazy(() => import("./pages/legal/CookiesPage"));
const GDPRPage = lazy(() => import("./pages/legal/GDPRPage"));
const TermeniConditiiPage = lazy(() => import("./pages/legal/TermeniConditiiPage"));

// Blog - Lazy loaded
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const ArticleRotundVsAnatomic = lazy(() => import("./pages/blog/ArticleRotundVsAnatomic"));
const ArticleDespreAlaptare = lazy(() => import("./pages/blog/ArticleDespreAlaptare"));
const ArticleTehnici = lazy(() => import("./pages/blog/ArticleTehnici"));
const ArticleGhidMarimi = lazy(() => import("./pages/blog/ArticleGhidMarimi"));
const ArticleProfilImplant = lazy(() => import("./pages/blog/ArticleProfilImplant"));
const ArticleMacromastie = lazy(() => import("./pages/blog/ArticleMacromastie"));
const ArticleAnestezie = lazy(() => import("./pages/blog/ArticleAnestezie"));
const ArticlePlasareImplant = lazy(() => import("./pages/blog/ArticlePlasareImplant"));
const ArticleCumDecurgeOperatia = lazy(() => import("./pages/blog/ArticleCumDecurgeOperatia"));
const ArticleAlaptareCuImplanturi = lazy(() => import("./pages/blog/ArticleAlaptareCuImplanturi"));
const ArticleSport = lazy(() => import("./pages/blog/ArticleSport"));
const ArticleContracturaCapsulara = lazy(() => import("./pages/blog/ArticleContracturaCapsulara"));
const ArticleBalonare = lazy(() => import("./pages/blog/ArticleBalonare"));
const ArticleDureri = lazy(() => import("./pages/blog/ArticleDureri"));
const ArticleImplantDeplasat = lazy(() => import("./pages/blog/ArticleImplantDeplasat"));
const ArticleMasaj = lazy(() => import("./pages/blog/ArticleMasaj"));
const ArticleSomnPeSpate = lazy(() => import("./pages/blog/ArticleSomnPeSpate"));
const ArticleAsezareImplant = lazy(() => import("./pages/blog/ArticleAsezareImplant"));
const ArticleCicatrici = lazy(() => import("./pages/blog/ArticleCicatrici"));
const ArticleMentorVsMotiva = lazy(() => import("./pages/blog/ArticleMentorVsMotiva"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <CookieConsent />
        <AccessibilityWidget />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Proceduri */}
            <Route path="/proceduri" element={<ProceduriIndex />} />
            <Route path="/proceduri/implant-mamar-bucuresti" element={<ImplantMamarBucurestiPage />} />
            <Route path="/proceduri/implant-mamar-bucuresti/implanturi-mamare-rotunde" element={<ImplanturiRotundePage />} />
            <Route path="/proceduri/implant-mamar-bucuresti/implanturi-mamare-anatomice" element={<ImplanturiAnatomicePage />} />
            <Route path="/proceduri/implant-mamar-bucuresti/implanturi-mamare-ergonomice" element={<ImplanturiErgonomicePage />} />
            <Route path="/proceduri/lifting-mamar-mastopexie-ridicare-sani" element={<MastopexiePage />} />
            <Route path="/proceduri/schimbare-inlocuire-implant-mamar-revizie" element={<ReviziePage />} />
            <Route path="/proceduri/micsorare-sani-reductie-mamara" element={<ReductieMamaraPage />} />
            <Route path="/proceduri/lipofilling-mamar" element={<LipofillingMamarPage />} />
            
            {/* Pagini principale */}
            <Route path="/galerie" element={<GalleryPage />} />
            <Route path="/simulator-3d" element={<Simulator3DPage />} />
            <Route path="/implant-mamar-pret" element={<PricingPage />} />
            <Route path="/recuperare-implant-mamar" element={<GhidRecuperarePage />} />
            <Route path="/despre-noi" element={<DespreNoiPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/turism-medical-intern" element={<TurismMedicalPage />} />
            <Route path="/implant-mamar-in-rate" element={<FinantarePage />} />
            
            {/* Blog Index */}
            <Route path="/blog" element={<BlogIndex />} />
            
            {/* Blog - Cluster 1: Mărime și Formă */}
            <Route path="/blog/implanturi-rotunde-vs-anatomice" element={<ArticleRotundVsAnatomic />} />
            <Route path="/blog/implant-mamar-250-ml-400ml" element={<ArticleGhidMarimi />} />
            <Route path="/blog/implant-mamar-cu-profil-inalt-sau-moderat" element={<ArticleProfilImplant />} />
            <Route path="/blog/sani-mari-macromastie-gigantomastie" element={<ArticleMacromastie />} />
            
            {/* Blog - Cluster 2: Procedura Chirurgicală */}
            <Route path="/blog/tehnici-insertie-implanturi" element={<ArticleTehnici />} />
            <Route path="/blog/anestezie-augmentare-mamara" element={<ArticleAnestezie />} />
            <Route path="/blog/plasare-implant-subglandular-submuscular" element={<ArticlePlasareImplant />} />
            <Route path="/blog/cum-decurge-operatia-augmentare-mamara" element={<ArticleCumDecurgeOperatia />} />
            
            {/* Blog - Cluster 3: Siguranță și Recuperare */}
            <Route path="/blog/alaptarea-cu-implanturi-mamare" element={<ArticleAlaptareCuImplanturi />} />
            <Route path="/blog/sport-dupa-implant-mamar" element={<ArticleSport />} />
            <Route path="/blog/contractura-capsulara" element={<ArticleContracturaCapsulara />} />
            <Route path="/blog/balonare-dupa-implant-mamar" element={<ArticleBalonare />} />
            <Route path="/blog/durerile-dupa-implant-mamar" element={<ArticleDureri />} />
            <Route path="/blog/implant-mamar-deplasat" element={<ArticleImplantDeplasat />} />
            <Route path="/blog/masajul-sanilor-dupa-implant" element={<ArticleMasaj />} />
            <Route path="/blog/cat-timp-trebuie-sa-dormi-pe-spate-dupa-implant-mamar" element={<ArticleSomnPeSpate />} />
            <Route path="/blog/in-cat-timp-se-aseaza-implantul-mamar" element={<ArticleAsezareImplant />} />
            <Route path="/blog/cicatrici-dupa-implant" element={<ArticleCicatrici />} />
            
            {/* Blog - Cluster 4: Branduri */}
            <Route path="/blog/mentor-vs-motiva" element={<ArticleMentorVsMotiva />} />
            
            {/* Pagini legale */}
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/gdpr" element={<GDPRPage />} />
            <Route path="/termeni-si-conditii" element={<TermeniConditiiPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import PricingPage from "./pages/PricingPage";
import GalleryPage from "./pages/GalleryPage";
import NotFound from "./pages/NotFound";

// Proceduri
import ProceduriIndex from "./pages/proceduri/ProceduriIndex";
import AugmentareMamaraPage from "./pages/proceduri/AugmentareMamaraPage";
import ImplanturiRotundePage from "./pages/proceduri/ImplanturiRotundePage";
import ImplanturiAnatomicePage from "./pages/proceduri/ImplanturiAnatomicePage";
import ImplanturiErgonomicePage from "./pages/proceduri/ImplanturiErgonomicePage";
import MastopexiePage from "./pages/proceduri/MastopexiePage";
import ReviziePage from "./pages/proceduri/ReviziePage";
import ReductieMamaraPage from "./pages/proceduri/ReductieMamaraPage";
import LipofillingMamarPage from "./pages/proceduri/LipofillingMamarPage";

// Pagini independente
import DespreNoiPage from "./pages/DespreNoiPage";
import GhidRecuperarePage from "./pages/GhidRecuperarePage";
import ContactPage from "./pages/ContactPage";
import TurismMedicalPage from "./pages/TurismMedicalPage";
import FinantarePage from "./pages/FinantarePage";

// Blog - Existente
import BlogIndex from "./pages/blog/BlogIndex";
import ArticleRotundVsAnatomic from "./pages/blog/ArticleRotundVsAnatomic";
import ArticleDespreAlaptare from "./pages/blog/ArticleDespreAlaptare";
import ArticleTehnici from "./pages/blog/ArticleTehnici";

// Blog - Cluster 1: Mărime și Formă
import ArticleGhidMarimi from "./pages/blog/ArticleGhidMarimi";
import ArticleProfilImplant from "./pages/blog/ArticleProfilImplant";
import ArticleMacromastie from "./pages/blog/ArticleMacromastie";

// Blog - Cluster 2: Procedura Chirurgicală
import ArticleAnestezie from "./pages/blog/ArticleAnestezie";
import ArticlePlasareImplant from "./pages/blog/ArticlePlasareImplant";
import ArticleCumDecurgeOperatia from "./pages/blog/ArticleCumDecurgeOperatia";

// Blog - Cluster 3: Siguranță și Recuperare
import ArticleAlaptareCuImplanturi from "./pages/blog/ArticleAlaptareCuImplanturi";
import ArticleSport from "./pages/blog/ArticleSport";
import ArticleContracturaCapsulara from "./pages/blog/ArticleContracturaCapsulara";
import ArticleBalonare from "./pages/blog/ArticleBalonare";
import ArticleDureri from "./pages/blog/ArticleDureri";
import ArticleImplantDeplasat from "./pages/blog/ArticleImplantDeplasat";
import ArticleMasaj from "./pages/blog/ArticleMasaj";
import ArticleSomnPeSpate from "./pages/blog/ArticleSomnPeSpate";
import ArticleAsezareImplant from "./pages/blog/ArticleAsezareImplant";
import ArticleCicatrici from "./pages/blog/ArticleCicatrici";

// Blog - Cluster 4: Branduri
import ArticleMentorVsMotiva from "./pages/blog/ArticleMentorVsMotiva";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Proceduri */}
          <Route path="/proceduri" element={<ProceduriIndex />} />
          <Route path="/proceduri/augmentare-mamara" element={<AugmentareMamaraPage />} />
          <Route path="/proceduri/augmentare-mamara/implanturi-mamare-rotunde" element={<ImplanturiRotundePage />} />
          <Route path="/proceduri/augmentare-mamara/implanturi-mamare-anatomice" element={<ImplanturiAnatomicePage />} />
          <Route path="/proceduri/augmentare-mamara/implanturi-mamare-ergonomice" element={<ImplanturiErgonomicePage />} />
          <Route path="/proceduri/augmentare-mamara-cu-mastopexie" element={<MastopexiePage />} />
          <Route path="/proceduri/revizie-implant-mamar" element={<ReviziePage />} />
          <Route path="/proceduri/micsorare-sani-reductie-mamara" element={<ReductieMamaraPage />} />
          <Route path="/proceduri/lipofilling-mamar" element={<LipofillingMamarPage />} />
          
          {/* Pagini principale */}
          <Route path="/galerie" element={<GalleryPage />} />
          <Route path="/tarife-finantare" element={<PricingPage />} />
          <Route path="/ghid-recuperare" element={<GhidRecuperarePage />} />
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
          
          {/* Redirects pentru URL-uri vechi */}
          <Route path="/preturi" element={<Navigate to="/tarife-finantare" replace />} />
          <Route path="/implanturi" element={<Navigate to="/proceduri/augmentare-mamara" replace />} />
          <Route path="/blog/alaptare-dupa-augmentare-mamara" element={<Navigate to="/blog/alaptarea-cu-implanturi-mamare" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
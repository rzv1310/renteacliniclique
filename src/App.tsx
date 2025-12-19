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

// Pagini independente
import DespreNoiPage from "./pages/DespreNoiPage";
import GhidRecuperarePage from "./pages/GhidRecuperarePage";
import ContactPage from "./pages/ContactPage";

// Blog
import BlogIndex from "./pages/blog/BlogIndex";
import ArticleRotundVsAnatomic from "./pages/blog/ArticleRotundVsAnatomic";
import ArticleDespreAlaptare from "./pages/blog/ArticleDespreAlaptare";
import ArticleTehnici from "./pages/blog/ArticleTehnici";

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
          
          {/* Pagini principale */}
          <Route path="/galerie" element={<GalleryPage />} />
          <Route path="/tarife-finantare" element={<PricingPage />} />
          <Route path="/ghid-recuperare" element={<GhidRecuperarePage />} />
          <Route path="/despre-noi" element={<DespreNoiPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Blog */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/implanturi-rotunde-vs-anatomice" element={<ArticleRotundVsAnatomic />} />
          <Route path="/blog/alaptare-dupa-augmentare-mamara" element={<ArticleDespreAlaptare />} />
          <Route path="/blog/tehnici-insertie-implanturi" element={<ArticleTehnici />} />
          
          {/* Redirects pentru URL-uri vechi */}
          <Route path="/preturi" element={<Navigate to="/tarife-finantare" replace />} />
          <Route path="/implanturi" element={<Navigate to="/proceduri/augmentare-mamara" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
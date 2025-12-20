import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-profil.jpg";

const ArticleProfilImplant = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Profil implant mamar" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Profil Înalt vs. Profil Moderat: Ce înseamnă proiecția implantului?
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />8 min citire</span>
          </div>
        </div>
      </section>

      <PageBreadcrumb />
      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-soft-brown hover:text-rose-gold transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Înapoi la Blog
            </Link>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                Pe lângă volum și formă, profilul implantului este un factor crucial care determină 
                cât de mult se proiectează sânul de pe peretele toracic. Înțelegerea acestui concept 
                vă va ajuta să faceți o alegere informată.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Ce este profilul implantului?</h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Profilul se referă la gradul de proiecție al implantului - cât de mult "iese în față" 
                de pe peretele toracic. Pentru același volum, un implant cu profil înalt va fi mai îngust 
                la bază și mai proiectat, în timp ce unul cu profil moderat va fi mai lat și mai plat.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Tipuri de profile disponibile</h2>
              
              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">Profil Moderat (Low Profile)</h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Implanturile cu profil moderat au o bază mai largă și o proiecție mai mică. 
                Acestea sunt ideale pentru pacientele cu torace mai lat care doresc un aspect natural 
                și o creștere subtilă a volumului.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">Profil Înalt (High Profile)</h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Implanturile cu profil înalt au o bază mai îngustă și o proiecție maximă. 
                Acestea creează un bust mai plin și mai proeminent.
              </p>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Consultație pentru alegerea profilului ideal
                </h3>
                <p className="text-soft-brown mb-6">
                  Alegerea corectă a profilului este esențială pentru un rezultat armonios. 
                  Programați o consultație pentru o evaluare personalizată.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">
                  Programează consultația
                </Link>
              </div>

              {/* Recommended Section */}
              <div className="mt-16 pt-8 border-t border-border">
                <h3 className="font-serif text-2xl font-semibold text-deep-brown mb-8">Continuă să explorezi</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link to="/proceduri/implant-mamar-bucuresti" className="group block bg-gradient-to-br from-rose-gold/10 to-secondary/50 rounded-2xl p-6 hover:shadow-elegant transition-all duration-300 no-underline">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Serviciu Recomandat</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 mb-2 group-hover:text-rose-gold transition-colors">Augmentare Mamară București</h4>
                    <p className="text-soft-brown text-sm mb-4">Descoperă procedura completă și programează o consultație.</p>
                    <span className="text-rose-gold flex items-center gap-1 text-sm font-medium">Vezi detalii<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                  </Link>
                  <Link to="/blog/implant-mamar-250-ml-400ml" className="group block bg-card rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all duration-300 no-underline">
                    <span className="text-xs uppercase tracking-wider text-soft-brown font-medium">Articol Similar</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 mb-2 group-hover:text-rose-gold transition-colors">Ghidul Mărimilor: 250 ml vs 400 ml</h4>
                    <p className="text-soft-brown text-sm mb-4">Vizualizează diferențele reale între volumele de implant.</p>
                    <span className="text-rose-gold flex items-center gap-1 text-sm font-medium">Citește articolul<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default ArticleProfilImplant;

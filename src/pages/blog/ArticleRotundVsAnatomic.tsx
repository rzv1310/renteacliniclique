import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-rotund-vs-anatomic.png";

const ArticleRotundVsAnatomic = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Comparație implanturi rotunde vs anatomice" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Implanturi Rotunde vs. Anatomice: Ghid Complet
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />8 min citire</span>
          </div>
        </div>
      </section>

      <PageBreadcrumb />
      
      <article className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-soft-brown hover:text-rose-gold transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Înapoi la Blog
            </Link>

            <div className="prose prose-lg max-w-none text-soft-brown">
              <p className="lead text-lg">
                Alegerea între implanturile rotunde și anatomice este una dintre cele mai importante decizii 
                în procesul de augmentare mamară. În acest articol, vom explora diferențele cheie.
              </p>

              <h2 className="font-serif text-2xl text-deep-brown mt-8 mb-4">Implanturile Rotunde</h2>
              <p>Implanturile rotunde oferă volum uniform și un decolteu plin. Sunt ideale pentru femeile care doresc un aspect mai dramatic.</p>

              <h2 className="font-serif text-2xl text-deep-brown mt-8 mb-4">Implanturile Anatomice</h2>
              <p>Implanturile anatomice mimează forma naturală a sânului, cu mai mult volum în partea inferioară.</p>

              <h2 className="font-serif text-2xl text-deep-brown mt-8 mb-4">Concluzie</h2>
              <p>Alegerea depinde de obiectivele tale estetice și anatomia personală. O consultație te va ajuta să iei decizia corectă.</p>

              {/* Recommended Section */}
              <div className="mt-16 pt-8 border-t border-border">
                <h3 className="font-serif text-2xl font-semibold text-deep-brown mb-8">
                  Continuă să explorezi
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Service Recommendation */}
                  <Link 
                    to="/proceduri/implanturi-rotunde"
                    className="group block bg-gradient-to-br from-rose-gold/10 to-secondary/50 rounded-2xl p-6 hover:shadow-elegant transition-all duration-300 no-underline"
                  >
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Serviciu Recomandat</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 mb-2 group-hover:text-rose-gold transition-colors">
                      Implanturi Mamare Rotunde
                    </h4>
                    <p className="text-soft-brown text-sm mb-4">
                      Descoperă avantajele implanturilor rotunde și află dacă sunt potrivite pentru tine.
                    </p>
                    <span className="text-rose-gold flex items-center gap-1 text-sm font-medium">
                      Vezi detalii
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>

                  {/* Related Article */}
                  <Link 
                    to="/blog/implant-mamar-250-ml-400ml"
                    className="group block bg-card rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all duration-300 no-underline"
                  >
                    <span className="text-xs uppercase tracking-wider text-soft-brown font-medium">Articol Similar</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 mb-2 group-hover:text-rose-gold transition-colors">
                      Ghidul Mărimilor: Cum arată 250 ml vs 400 ml
                    </h4>
                    <p className="text-soft-brown text-sm mb-4">
                      Vizualizează diferențele reale între volumele de implant.
                    </p>
                    <span className="text-rose-gold flex items-center gap-1 text-sm font-medium">
                      Citește articolul
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
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

export default ArticleRotundVsAnatomic;

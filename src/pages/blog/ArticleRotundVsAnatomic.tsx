import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-rotund-vs-anatomic.png";

const ArticleRotundVsAnatomic = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Comparație implanturi rotunde vs anatomice" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Implanturi Rotunde vs. Anatomice: Ghid Complet
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />15 Dec 2024</span>
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
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default ArticleRotundVsAnatomic;

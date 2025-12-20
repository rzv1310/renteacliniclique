import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-anestezie.jpg";

const ArticleAnestezie = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Anestezie pentru augmentare mamară" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Anestezia pentru augmentare mamară: Generală vs. Locală cu sedare
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />7 min citire</span>
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
                Una dintre întrebările frecvente ale pacientelor este legată de tipul de anestezie 
                folosit în timpul operației de augmentare mamară.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Anestezia generală</h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Anestezia generală este metoda standard pentru majoritatea intervențiilor de augmentare mamară. 
                Pacienta este complet adormită pe întreaga durată a operației.
              </p>
              
              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">Avantaje</h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Control complet al durerii</li>
                <li>Relaxare musculară totală</li>
                <li>Confort psihologic</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Anestezia locală cu sedare</h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Această metodă combină infiltrarea locală cu anestezice cu sedare intravenoasă 
                care vă relaxează și vă face somnolentă.
              </p>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Discutați despre anestezie în consultație</h3>
                <p className="text-soft-brown mb-6">Toate detaliile despre anestezie vor fi discutate în cadrul consultației.</p>
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
                    <p className="text-soft-brown text-sm mb-4">Descoperă procedura completă de mărire a sânilor.</p>
                    <span className="text-rose-gold flex items-center gap-1 text-sm font-medium">Vezi detalii<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                  </Link>
                  <Link to="/blog/cum-decurge-operatia-augmentare-mamara" className="group block bg-card rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all duration-300 no-underline">
                    <span className="text-xs uppercase tracking-wider text-soft-brown font-medium">Articol Similar</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 mb-2 group-hover:text-rose-gold transition-colors">Cum decurge operația de augmentare</h4>
                    <p className="text-soft-brown text-sm mb-4">Tot ce se întâmplă în sala de operații, pas cu pas.</p>
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

export default ArticleAnestezie;

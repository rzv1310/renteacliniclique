import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-despre-alaptare.jpg";

const ArticleDespreAlaptare = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Alăptarea după augmentare mamară" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Alăptarea După Augmentare Mamară
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />6 min citire</span>
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
                Una dintre cele mai frecvente întrebări pe care le primim este despre posibilitatea alăptării după augmentare.
              </p>

              <h2 className="font-serif text-2xl text-deep-brown mt-8 mb-4">Este Posibilă Alăptarea?</h2>
              <p>Da, majoritatea femeilor pot alăpta normal după augmentare mamară. Tehnicile moderne prezervă țesutul glandular.</p>

              <h2 className="font-serif text-2xl text-deep-brown mt-8 mb-4">Factori Importanți</h2>
              <p>Tipul de incizie și plasarea implantului pot influența capacitatea de alăptare. Discută aceste aspecte cu chirurgul.</p>

              {/* Recommended Section */}
              <div className="mt-16 pt-8 border-t border-border">
                <h3 className="font-serif text-2xl font-semibold text-deep-brown mb-8">Resurse Recomandate</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link to="/proceduri/implant-mamar-bucuresti" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Serviciu</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Augmentare Mamară București</h4>
                    <p className="text-soft-brown text-sm mt-2">Descoperă procedura completă de mărire a sânilor.</p>
                    <span className="inline-flex items-center gap-1 text-rose-gold text-sm mt-4">Află mai multe <ArrowRight className="w-4 h-4" /></span>
                  </Link>
                  <Link to="/blog/alaptarea-dupa-implanturi-mamare" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Articol</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Alăptarea după implanturi: Mituri și Adevăr</h4>
                    <p className="text-soft-brown text-sm mt-2">Ghid complet pentru viitoarele mame.</p>
                    <span className="inline-flex items-center gap-1 text-rose-gold text-sm mt-4">Citește articolul <ArrowRight className="w-4 h-4" /></span>
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

export default ArticleDespreAlaptare;

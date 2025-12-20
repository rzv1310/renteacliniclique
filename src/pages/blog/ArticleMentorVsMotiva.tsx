import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-mentor.jpg";

const ArticleMentorVsMotiva = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Mentor vs Motiva implanturi" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Mentor vs. Motiva: Ce alegem pentru tine?
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
              <ArrowLeft className="w-4 h-4" />Înapoi la Blog
            </Link>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                Mentor și Motiva sunt două dintre cele mai apreciate branduri de implanturi mamare. Comparăm caracteristicile pentru a vă ajuta să înțelegeți diferențele.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Mentor (Johnson & Johnson)</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Cel mai mare producător mondial de implanturi</li>
                <li>Gel MemoryGel - cohesiv și natural la atingere</li>
                <li>Garanție pe viață pentru rupturi</li>
                <li>Istoric lung de siguranță</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Motiva</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Tehnologie inovatoare ProgressiveGel Ultima</li>
                <li>Suprafață SilkSurface sau VelvetSurface</li>
                <li>BluSeal - strat de siguranță vizibil</li>
                <li>Ergonomix - implant care se adaptează la mișcare</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Care este mai bun?</h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Ambele sunt excelente. Alegerea depinde de preferințele individuale, anatomie și rezultatul dorit. În consultație vom discuta ce se potrivește cel mai bine pentru dumneavoastră.
              </p>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Consultație pentru alegerea implantului</h3>
                <p className="text-soft-brown mb-6">Vă ajutăm să alegeți brandul și modelul optim pentru rezultatul dorit.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">
                  Programează consultația
                </Link>
              </div>

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
                  <Link to="/blog/implanturi-rotunde-vs-anatomice" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Articol</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Implanturi Rotunde vs. Anatomice</h4>
                    <p className="text-soft-brown text-sm mt-2">Ghid complet pentru alegerea formei potrivite.</p>
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

export default ArticleMentorVsMotiva;

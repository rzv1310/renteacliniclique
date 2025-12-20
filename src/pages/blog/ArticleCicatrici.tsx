import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-cicatrici.jpg";

const ArticleCicatrici = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Cicatrici după implant" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Cicatrici după implant: Evoluție în primele 12 luni
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
              <ArrowLeft className="w-4 h-4" />Înapoi la Blog
            </Link>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                Cicatricile sunt inevitabile, dar cu îngrijire corectă devin aproape invizibile în timp.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Evoluția cicatricii</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Săptămânile 1-2:</strong> Roșie, ușor umflată - normal</li>
                <li><strong>Lunile 1-3:</strong> Poate deveni mai roșie/roz - faza de maturare</li>
                <li><strong>Lunile 3-6:</strong> Începe să se estompeze</li>
                <li><strong>Lunile 6-12:</strong> Devine mai deschisă la culoare</li>
                <li><strong>După 12 luni:</strong> Aproape invizibilă la majoritatea pacientelor</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Îngrijirea cicatricii</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Folii sau geluri cu silicon (după vindecarea completă)</li>
                <li>Protecție solară - expunerea duce la pigmentare</li>
                <li>Masaj ușor pentru a preveni aderențele</li>
                <li>Hidratare regulată</li>
              </ul>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Sfaturi personalizate</h3>
                <p className="text-soft-brown mb-6">La control vă vom recomanda cele mai bune produse pentru tipul dumneavoastră de piele.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">
                  Programează controlul
                </Link>
              </div>

              {/* Recommended Section */}
              <div className="mt-16 pt-8 border-t border-border">
                <h3 className="font-serif text-2xl font-semibold text-deep-brown mb-8">Resurse Recomandate</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link to="/ghid-recuperare" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Ghid</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Ghid Complet de Recuperare</h4>
                    <p className="text-soft-brown text-sm mt-2">Tot ce trebuie să știi despre perioada postoperatorie.</p>
                    <span className="inline-flex items-center gap-1 text-rose-gold text-sm mt-4">Află mai multe <ArrowRight className="w-4 h-4" /></span>
                  </Link>
                  <Link to="/blog/tehnici-insertie-implanturi" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Articol</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Tehnici de Inserție</h4>
                    <p className="text-soft-brown text-sm mt-2">Tipuri de incizii și impactul asupra cicatricilor.</p>
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

export default ArticleCicatrici;

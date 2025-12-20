import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-macromastie.jpg";

const ArticleMacromastie = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Macromastie și proporții naturale" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Sâni prea mari? Cum evităm efectul de "bile" artificiale
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />9 min citire</span>
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
                O preocupare frecventă a pacientelor este teama de a obține un rezultat artificial, 
                cu sâni care arată ca "bile" sau "baloane". În acest articol, explicăm cum evităm 
                acest efect nedorit și ce înseamnă macromastia sau gigantomastia.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Ce înseamnă macromastie?</h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Macromastia</strong> se referă la sâni anormal de mari care cauzează disconfort fizic, 
                dureri de spate, probleme posturale și dificultăți în activitățile zilnice.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">De ce apar rezultatele "artificiale"?</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Volum prea mare pentru anatomie</strong></li>
                <li><strong>Alegerea greșită a profilului</strong></li>
                <li><strong>Țesut insuficient</strong></li>
                <li><strong>Plasare subglandulară greșită</strong></li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Cum obținem un rezultat natural?</h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Secretul unui rezultat estetic și natural stă în respectarea limitelor anatomice, 
                alegerea corectă a planului de plasare și selectarea formei potrivite.
              </p>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Consultație pentru un rezultat natural</h3>
                <p className="text-soft-brown mb-6">Prioritatea noastră este un rezultat care să vă facă să vă simțiți încrezătoare și confortabilă.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">
                  Programează consultația
                </Link>
              </div>

              {/* Recommended Section */}
              <div className="mt-16 pt-8 border-t border-border">
                <h3 className="font-serif text-2xl font-semibold text-deep-brown mb-8">Continuă să explorezi</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link to="/proceduri/reductie-mamara" className="group block bg-gradient-to-br from-rose-gold/10 to-secondary/50 rounded-2xl p-6 hover:shadow-elegant transition-all duration-300 no-underline">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Serviciu Recomandat</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 mb-2 group-hover:text-rose-gold transition-colors">Reducție Mamară</h4>
                    <p className="text-soft-brown text-sm mb-4">Soluția pentru sânii prea mari care cauzează disconfort.</p>
                    <span className="text-rose-gold flex items-center gap-1 text-sm font-medium">Vezi detalii<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                  </Link>
                  <Link to="/blog/implant-mamar-cu-profil-inalt-sau-moderat" className="group block bg-card rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all duration-300 no-underline">
                    <span className="text-xs uppercase tracking-wider text-soft-brown font-medium">Articol Similar</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 mb-2 group-hover:text-rose-gold transition-colors">Profil Înalt vs. Profil Moderat</h4>
                    <p className="text-soft-brown text-sm mb-4">Ce înseamnă proiecția implantului și cum alegi.</p>
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

export default ArticleMacromastie;

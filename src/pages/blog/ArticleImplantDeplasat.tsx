import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-deplasat.jpg";

const ArticleImplantDeplasat = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Implant mamar deplasat" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Implant mamar deplasat: Semne și soluții
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
                Deplasarea implantului poate apărea în timp și necesită atenție. Iată cum recunoașteți semnele și ce opțiuni de tratament există.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Tipuri de deplasare</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Deplasare laterală</strong> - implantul alunecă spre axilă</li>
                <li><strong>Deplasare în jos (bottoming out)</strong> - implantul coboară sub pliul natural</li>
                <li><strong>Deplasare în sus</strong> - implantul rămâne sau urcă prea sus</li>
                <li><strong>Symmastia</strong> - implanturile se apropie prea mult de centru</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Cauze frecvente</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Buzunar creat prea mare inițial</li>
                <li>Greutate prea mare a implantului pentru țesut</li>
                <li>Sarcină și alăptare</li>
                <li>Fluctuații mari de greutate</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Soluții</h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Revizia chirurgicală poate corecta deplasarea prin reconstrucția buzunarului (capsulorrhaphy) și repoziționarea implantului.
              </p>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Consultație pentru revizie</h3>
                <p className="text-soft-brown mb-6">Dacă observați modificări în poziția implantului, programați o evaluare.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">
                  Programează consultația
                </Link>
              </div>

              {/* Recommended Section */}
              <div className="mt-16 pt-8 border-t border-border">
                <h3 className="font-serif text-2xl font-semibold text-deep-brown mb-8">Resurse Recomandate</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link to="/proceduri/revizie" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Serviciu</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Revizie Implant Mamar</h4>
                    <p className="text-soft-brown text-sm mt-2">Soluții pentru corectarea sau înlocuirea implanturilor.</p>
                    <span className="inline-flex items-center gap-1 text-rose-gold text-sm mt-4">Află mai multe <ArrowRight className="w-4 h-4" /></span>
                  </Link>
                  <Link to="/blog/contractura-capsulara" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Articol</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Contractura Capsulară</h4>
                    <p className="text-soft-brown text-sm mt-2">Ce este și cum reducem riscul la minim.</p>
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

export default ArticleImplantDeplasat;

import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-asezare.jpg";

const ArticleAsezareImplant = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Așezarea implantului mamar" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            În cât timp se așază implantul mamar?
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />6 min citire</span>
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
                Procesul de "drop and fluff" - coborâre și umplere - este normal și necesar pentru rezultatul final.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Ce este "drop and fluff"?</h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Imediat după operație, implanturile par prea sus și prea strânse. În lunile următoare, ele coboară în poziția naturală (drop) și țesuturile se relaxează, creând un aspect mai plin în partea inferioară (fluff).
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Timeline</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Luna 1:</strong> Implanturile sunt sus, sânii par strânși</li>
                <li><strong>Lunile 2-3:</strong> Începe coborârea vizibilă</li>
                <li><strong>Lunile 3-6:</strong> Cea mai mare parte a așezării</li>
                <li><strong>6-12 luni:</strong> Rezultat final, complet stabilizat</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Factori care influențează</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Plasarea submuscular vs subglandular (submuscular = așezare mai lentă)</li>
                <li>Elasticitatea pielii</li>
                <li>Mărimea implantului</li>
                <li>Masajul și exercițiile recomandate</li>
              </ul>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Răbdare este cheia!</h3>
                <p className="text-soft-brown mb-6">Nu judecați rezultatul final în primele luni. Controalele periodice vă vor arăta progresul.</p>
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
                  <Link to="/blog/masajul-sanilor-dupa-implant" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Articol</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Masajul sânilor după implant</h4>
                    <p className="text-soft-brown text-sm mt-2">Tehnică și beneficii pentru rezultate optime.</p>
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

export default ArticleAsezareImplant;

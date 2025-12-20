import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-somn.jpg";

const ArticleSomnPeSpate = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Somn pe spate după implant" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Cât timp să dormi pe spate după implant mamar?
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />5 min citire</span>
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
                Poziția de somn este importantă în recuperare. Aflați recomandările pentru un rezultat optim.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Recomandări pe perioade</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Săptămânile 1-2:</strong> Dormit pe spate, cu trunchiul ridicat la 30-45°</li>
                <li><strong>Săptămânile 3-4:</strong> Puteți coborî treptat unghiul, dar rămâneți pe spate</li>
                <li><strong>Săptămânile 4-6:</strong> Somn pe spate, puteți încerca ușor pe o parte</li>
                <li><strong>După 6 săptămâni:</strong> Puteți dormi în orice poziție confortabilă</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">De ce este important?</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Reduce presiunea pe implanturi</li>
                <li>Previne deplasarea în perioada de vindecare</li>
                <li>Minimizează umflarea</li>
                <li>Permite vindecarea optimă a țesuturilor</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Tips pentru somn confortabil</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Folosiți perne de călătorie în formă de U sub brațe</li>
                <li>O pernă sub genunchi reduce tensiunea din spate</li>
                <li>Puneți perne de-o parte și de alta pentru a nu vă întoarce involuntar</li>
              </ul>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Întrebări despre recuperare?</h3>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">
                  Contactează-ne
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
                  <Link to="/blog/sport-dupa-implant-mamar" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Articol</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Sport după implant mamar</h4>
                    <p className="text-soft-brown text-sm mt-2">Când pot reveni la sală și ce exerciții pot face.</p>
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

export default ArticleSomnPeSpate;

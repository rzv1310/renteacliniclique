import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-balonare.jpg";

const ArticleBalonare = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Balonare după implant mamar" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Balonare după implant mamar: Cauze și Remedii
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
                O plângere surprinzător de frecventă după augmentarea mamară este senzația de 
                balonare abdominală. Deși nu este legată direct de sâni, această problemă 
                poate fi deranjantă în perioada de recuperare.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                De ce apare balonarea după operație?
              </h2>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                1. Efectele anesteziei
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Anestezia generală încetinește temporar funcția intestinală. Tranzitul digestiv 
                poate fi lent timp de câteva zile, ducând la acumulare de gaze și balonare.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                2. Medicamentele pentru durere
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Analgezicele opioide (precum tramadol) sunt cunoscute pentru că provoacă constipație, 
                care la rândul ei cauzează balonare și disconfort abdominal.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                3. Reducerea activității fizice
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                În primele zile, repausul este necesar, dar lipsa mișcării încetinește 
                și ea digestia. Intestinele funcționează mai bine când suntem activi.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                4. Modificări alimentare
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Mulți pacienți mănâncă diferit în perioada de recuperare - fie mai puțin, 
                fie alimente care nu fac parte din dieta obișnuită.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                5. Retenția de lichide
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Organismul reține lichide ca răspuns la stresul chirurgical și inflamație. 
                Acest lucru poate contribui la senzația de "umflare" generală.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Cum ameliorăm balonarea?
              </h2>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Recomandări alimentare
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Hidratare abundentă</strong> - minimum 2 litri de apă pe zi</li>
                <li><strong>Fibre</strong> - fructe, legume, cereale integrale</li>
                <li><strong>Evitați</strong> - băuturi carbogazoase, alimente grase, fasole, varză</li>
                <li><strong>Mese mici și frecvente</strong> - mai ușor de digerat</li>
                <li><strong>Supe și ciorbe</strong> - ușor de procesat și hidratante</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Suplimente și remedii
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Probiotice</strong> - ajută la refacerea florei intestinale</li>
                <li><strong>Ceai de fenicul sau mentă</strong> - ameliorează gazele</li>
                <li><strong>Simeticonă</strong> - medicament fără prescripție pentru gaze</li>
                <li><strong>Laxative ușoare</strong> - dacă constipația persistă (consultați medicul)</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Activitate fizică
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Plimbări scurte de 10-15 minute de câteva ori pe zi</li>
                <li>Mișcarea stimulează peristaltismul intestinal</li>
                <li>Nu stați întinsă toată ziua</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Cât durează?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                În mod normal, balonarea postoperatorie se ameliorează în:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>3-5 zile</strong> - dacă este cauzată de anestezie</li>
                <li><strong>1-2 săptămâni</strong> - dacă este legată de medicație și inactivitate</li>
                <li>Odată ce reluați activitatea normală și renunțați la analgezicele puternice, 
                simptomele dispar rapid</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Când să ne contactați?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Anumite simptome necesită atenție medicală:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Durere abdominală severă sau crampe intense</li>
                <li>Constipație mai mare de 4-5 zile</li>
                <li>Greață sau vărsături persistente</li>
                <li>Febră asociată cu simptome abdominale</li>
                <li>Absența completă a gazelor și scaunului</li>
              </ul>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Întrebări despre recuperare?
                </h3>
                <p className="text-soft-brown mb-6">
                  Echipa noastră este disponibilă pentru orice nelămuriri despre perioada postoperatorie.
                </p>
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
                  <Link to="/blog/durerile-dupa-implant-mamar" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Articol</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Durerile după implant mamar</h4>
                    <p className="text-soft-brown text-sm mt-2">Ce e normal și când să te îngrijorezi.</p>
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

export default ArticleBalonare;

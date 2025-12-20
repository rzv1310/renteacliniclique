import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-sport.jpg";

const ArticleSport = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Sport și implanturi mamare" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Implanturile Mamare și Sportul: Când pot reveni la sală?
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
                Sunteți o persoană activă și vă îngrijorează cum va afecta operația rutina 
                dumneavoastră de fitness? Vă oferim un ghid complet despre revenirea la sport 
                după augmentarea mamară.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Timeline: Când revin la fiecare activitate?
              </h2>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Săptămâna 1-2: Repaus activ
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Plimbări scurte și ușoare (10-15 minute)</li>
                <li>Mișcări ușoare ale picioarelor</li>
                <li>Nu ridicați brațele deasupra umerilor</li>
                <li>Nu cărați obiecte mai grele de 2-3 kg</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Săptămâna 3-4: Activitate ușoară
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Plimbări mai lungi (30-45 minute)</li>
                <li>Exerciții ușoare pentru picioare (fără sărituri)</li>
                <li>Yoga foarte ușoară (fără poziții care solicită brațele)</li>
                <li>Bicicletă staționar la intensitate scăzută</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Săptămâna 4-6: Revenire progresivă
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Cardio moderat (eliptical, bicicletă, mers rapid)</li>
                <li>Exerciții pentru partea inferioară (squats, lunges - fără greutăți)</li>
                <li>Pilates modificat</li>
                <li>Înot (doar picioare, fără brațe)</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                După 6 săptămâni: Revenire completă
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Antrenamente cu greutăți (începeți ușor și creșteți progresiv)</li>
                <li>Exerciții pentru piept și brațe</li>
                <li>HIIT și exerciții cu impact</li>
                <li>Înot complet</li>
                <li>Running și jogging</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Exerciții speciale: Push-ups și bench press
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Dacă aveți implant plasat submuscular sau dual plane:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Așteptați minim 8-12 săptămâni pentru exerciții intense de piept</li>
                <li>Începeți cu greutăți foarte ușoare și creșteți treptat</li>
                <li>Este normal să simțiți implantul "deplasându-se" la contractarea mușchiului</li>
                <li>Acest fenomen ("animation deformity") este temporar și se ameliorează</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Sutienul sportiv: Esențial!
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Purtarea unui sutien sportiv de bună calitate este crucială:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Primele 6 săptămâni:</strong> Purtați sutienul de compresie primit</li>
                <li><strong>După 6 săptămâni:</strong> Investiți într-un sutien sportiv cu suport înalt</li>
                <li>Alegeți modele cu benzi late și compresie bună</li>
                <li>Evitați sutienele push-up în timpul sportului</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Sporturi specifice: Recomandări
              </h2>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Yoga și Pilates
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Revenire completă după 6 săptămâni. Atenție la pozițiile care pun presiune 
                pe brațe și piept (plank, chaturanga) - reintroduceți-le treptat.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Running
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                După 4-6 săptămâni pentru jogging ușor, 8 săptămâni pentru running intens. 
                Un sutien sportiv bun este obligatoriu pentru a minimiza mișcarea.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Înot
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Evitați contactul cu apa în primele 4 săptămâni (risc de infecție). 
                După 6 săptămâni, puteți reveni complet la înot.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Sporturi de contact
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Box, arte marțiale, baschet - așteptați minim 3 luni și purtați întotdeauna 
                protecție adecvată pentru piept.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Semnale de alarmă: Când să vă opriți
              </h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Durere ascuțită sau pulsatilă în zona sânilor</li>
                <li>Umflare bruscă sau asimetrie</li>
                <li>Roșeață sau căldură locală</li>
                <li>Senzație de "lichid" în jurul implantului</li>
              </ul>
              <p className="text-soft-brown leading-relaxed mb-6">
                În oricare dintre aceste cazuri, opriți exercițiile și contactați-ne.
              </p>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Sunteți sportivă activă?
                </h3>
                <p className="text-soft-brown mb-6">
                  Discutați cu noi despre rutina dumneavoastră de fitness. 
                  Vom adapta planul postoperator în funcție de activitățile preferate.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">
                  Programează consultația
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
                  <Link to="/blog/cat-timp-trebuie-sa-dormi-pe-spate-dupa-implant-mamar" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Articol</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Cât timp să dormi pe spate?</h4>
                    <p className="text-soft-brown text-sm mt-2">Recomandări pentru somnul în perioada de recuperare.</p>
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

export default ArticleSport;

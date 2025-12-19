import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const ImplanturiAnatomicePage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
                  Tipuri de Implanturi
                </span>
                <h1 className="font-serif text-4xl md:text-5xl font-semibold text-deep-brown mb-6">
                  Implanturi Mamare
                  <br />
                  <span className="text-gradient-gold">Anatomice</span>
                </h1>
                <p className="text-lg text-soft-brown leading-relaxed mb-6">
                  Implanturile anatomice, cunoscute și ca implanturi „în formă de lacrimă", 
                  mimează forma naturală a sânului cu mai mult volum în partea inferioară. 
                  Oferă cel mai natural rezultat dintre toate tipurile.
                </p>
                <Button variant="hero" size="lg" className="group">
                  Programează Consultația
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="bg-gradient-to-br from-champagne-light to-champagne/30 rounded-2xl aspect-square flex items-center justify-center shadow-elegant">
                <div className="text-center">
                  <div className="w-32 h-40 mx-auto mb-6 rounded-t-[60%] rounded-b-[40%] bg-gradient-to-b from-rose-gold/30 to-champagne/50" />
                  <p className="font-serif text-xl text-deep-brown">Formă de Lacrimă</p>
                  <p className="text-sm text-rose-gold mt-1">Aspect natural</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Avantaje */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mb-6">
                Avantaje
              </h2>
              <ul className="space-y-4">
                {[
                  "Aspectul cel mai natural dintre toate tipurile",
                  "Imită perfect forma naturală a sânului",
                  "Excelente pentru reconstrucție mamară",
                  "Tranziție lină și elegantă la peretele toracic",
                  "Ideale pentru țesut mamar redus",
                  "Aspect natural chiar și la mărime mare",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-rose-gold shrink-0 mt-0.5" />
                    <span className="text-soft-brown">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* De luat în considerare */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mb-6">
                De Luat în Considerare
              </h2>
              <ul className="space-y-4">
                {[
                  "Cost mai ridicat față de implanturile rotunde",
                  "Risc teoretic de rotație (foarte rar cu tehnici moderne)",
                  "Necesită plasare precisă pentru rezultat optimal",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 shrink-0 flex items-center justify-center text-champagne text-lg">•</span>
                    <span className="text-soft-brown">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Candidatul Ideal */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-deep-brown mb-6">
              Candidatul Ideal
            </h2>
            <div className="bg-champagne-light rounded-2xl p-8 lg:p-12">
              <p className="text-lg text-soft-brown leading-relaxed">
                Implanturile anatomice sunt perfecte pentru <strong className="text-deep-brown">femeile care doresc 
                un aspect cât mai natural</strong>, pentru <strong className="text-deep-brown">reconstrucția mamară</strong> după 
                mastectomie, și pentru cele cu <strong className="text-deep-brown">țesut mamar redus</strong> care vor 
                un rezultat discret și elegant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparație */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-deep-brown mb-8 text-center">
              Rotund vs. Anatomic
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <h3 className="font-medium text-deep-brown mb-4">Rotund</h3>
                <ul className="text-sm text-soft-brown space-y-2">
                  <li>✓ Decolteu mai plin</li>
                  <li>✓ Cost mai accesibil</li>
                  <li>✓ Fără risc de rotație</li>
                </ul>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-soft border-2 border-rose-gold">
                <h3 className="font-medium text-rose-gold mb-4">Anatomic</h3>
                <ul className="text-sm text-soft-brown space-y-2">
                  <li>✓ Aspect mai natural</li>
                  <li>✓ Ideal pentru țesut subțire</li>
                  <li>✓ Perfect pentru reconstrucție</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-semibold text-deep-brown mb-4">
              Vrei să afli dacă implanturile anatomice sunt potrivite pentru tine?
            </h2>
            <p className="text-soft-brown mb-8">
              Programează o consultație pentru o evaluare personalizată și recomandări de la specialist.
            </p>
            <Button variant="hero" size="xl" className="group">
              Programează Consultația
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ImplanturiAnatomicePage;
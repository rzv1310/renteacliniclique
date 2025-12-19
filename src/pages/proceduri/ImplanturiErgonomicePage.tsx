import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const ImplanturiErgonomicePage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium">
                    Tipuri de Implanturi
                  </span>
                  <span className="bg-rose-gold text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Premium
                  </span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-semibold text-deep-brown mb-6">
                  Implanturi Mamare
                  <br />
                  <span className="text-gradient-gold">Ergonomice Motiva</span>
                </h1>
                <p className="text-lg text-soft-brown leading-relaxed mb-6">
                  Implanturile ergonomice reprezintă cea mai avansată tehnologie disponibilă. 
                  Se comportă ca un implant rotund când stai în picioare și se aplatizează natural 
                  când te întinzi - exact ca un sân natural.
                </p>
                <Button variant="hero" size="lg" className="group">
                  Programează Consultația
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="bg-gradient-to-br from-champagne-light to-champagne/30 rounded-2xl aspect-square flex items-center justify-center shadow-elegant relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-rose-gold text-primary-foreground text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Motiva
                </div>
                <div className="text-center">
                  <div className="w-32 h-36 mx-auto mb-6 rounded-[45%] bg-gradient-to-b from-rose-gold/30 to-champagne/50" />
                  <p className="font-serif text-xl text-deep-brown">Comportament Dinamic</p>
                  <p className="text-sm text-rose-gold mt-1">Tehnologie de ultimă generație</p>
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
                  "Comportament dinamic - se adaptează la poziția corpului",
                  "Senzație tactilă superioară, cel mai natural la atingere",
                  "Cel mai mic risc de complicații (capsulă, ruptură)",
                  "Garanție pe viață de la producătorul Motiva",
                  "Gel de silicon coerent de ultimă generație",
                  "Suprafață SmoothSilk pentru biocompatibilitate maximă",
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
                  "Cel mai ridicat cost dintre toate tipurile",
                  "Disponibilitate limitată - nu toate clinicile le oferă",
                  "Necesită chirurg certificat Motiva",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 shrink-0 flex items-center justify-center text-champagne text-lg">•</span>
                    <span className="text-soft-brown">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-champagne-light rounded-xl">
                <p className="text-sm text-deep-brown font-medium">
                  La Rentéa suntem clinică certificată Motiva cu experiență de peste 500+ cazuri cu implanturi ergonomice.
                </p>
              </div>
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
                Implanturile ergonomice sunt alegerea perfectă pentru <strong className="text-deep-brown">femeile active</strong> care 
                doresc <strong className="text-deep-brown">cel mai natural rezultat</strong> atât vizual cât și la 
                atingere, și pentru cele care pun accent pe <strong className="text-deep-brown">siguranță maximă</strong> și 
                <strong className="text-deep-brown"> tehnologie de vârf</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tehnologie */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-deep-brown mb-8 text-center">
              Tehnologii Exclusive Motiva
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { 
                  name: "ProgressiveGel Ultima+", 
                  desc: "Gel coerent de ultimă generație care imită țesutul mamar natural" 
                },
                { 
                  name: "SmoothSilk Surface", 
                  desc: "Suprafață nano-texturată pentru integrare tisulară optimă" 
                },
                { 
                  name: "TrueMonobloc", 
                  desc: "Construcție dintr-o singură piesă, fără puncte slabe" 
                },
                { 
                  name: "BluSeal Indicator", 
                  desc: "Indicator vizual de integritate a implantului" 
                },
              ].map((tech) => (
                <div key={tech.name} className="bg-card rounded-xl p-6 shadow-soft">
                  <h3 className="font-medium text-rose-gold mb-2">{tech.name}</h3>
                  <p className="text-sm text-soft-brown">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-semibold text-deep-brown mb-4">
              Interesată de implanturile ergonomice Motiva?
            </h2>
            <p className="text-soft-brown mb-8">
              Suntem una dintre puținele clinici din România certificate pentru implanturile Motiva Ergonomix.
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

export default ImplanturiErgonomicePage;
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import heroImage from "@/assets/heroes/hero-ergonomic.jpg";

const ImplanturiErgonomicePage = () => {
  return (
    <PageLayout>
      {/* Hero - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Femeie elegantă"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 lg:px-8 text-center pt-20">
          <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in">
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium">
              Tipuri de Implanturi
            </span>
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />
              Premium
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up">
            Implanturi Mamare
            <br />
            <span className="text-gradient-gold">Ergonomice Motiva</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            Implanturile ergonomice reprezintă cea mai avansată tehnologie disponibilă. 
            Se comportă ca un implant rotund când stai în picioare și se aplatizează natural 
            când te întinzi - exact ca un sân natural.
          </p>
          <Button variant="hero" size="lg" className="group animate-fade-in-up animation-delay-200">
            Programează Consultația
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Avantaje */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
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
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* De luat în considerare */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                De Luat în Considerare
              </h2>
              <ul className="space-y-4">
                {[
                  "Cel mai ridicat cost dintre toate tipurile",
                  "Disponibilitate limitată - nu toate clinicile le oferă",
                  "Necesită chirurg certificat Motiva",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 shrink-0 flex items-center justify-center text-muted-foreground text-lg">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-secondary/30 rounded-xl">
                <p className="text-sm text-foreground font-medium">
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
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Candidatul Ideal
            </h2>
            <div className="bg-secondary/30 rounded-2xl p-8 lg:p-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Implanturile ergonomice sunt alegerea perfectă pentru <strong className="text-foreground">femeile active</strong> care 
                doresc <strong className="text-foreground">cel mai natural rezultat</strong> atât vizual cât și la 
                atingere, și pentru cele care pun accent pe <strong className="text-foreground">siguranță maximă</strong> și
                <strong className="text-foreground"> tehnologie de vârf</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tehnologie */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8 text-center">
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
                  <h3 className="font-medium text-primary mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.desc}</p>
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
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Interesată de implanturile ergonomice Motiva?
            </h2>
            <p className="text-muted-foreground mb-8">
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

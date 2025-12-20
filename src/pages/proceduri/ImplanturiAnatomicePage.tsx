import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-implants-anatomic.jpg";

const ImplanturiAnatomicePage = () => {
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
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 block animate-fade-in">
            Tipuri de Implanturi
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up">
            Implanturi Mamare
            <br />
            <span className="text-gradient-gold">Anatomice</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            Implanturile anatomice, cunoscute și ca implanturi „în formă de lacrimă", 
            mimează forma naturală a sânului cu mai mult volum în partea inferioară. 
            Oferă cel mai natural rezultat dintre toate tipurile.
          </p>
          <Button variant="hero" size="lg" className="group animate-fade-in-up animation-delay-200">
            Programează Consultația
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

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
                  "Aspectul cel mai natural dintre toate tipurile",
                  "Imită perfect forma naturală a sânului",
                  "Excelente pentru reconstrucție mamară",
                  "Tranziție lină și elegantă la peretele toracic",
                  "Ideale pentru țesut mamar redus",
                  "Aspect natural chiar și la mărime mare",
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
                  "Cost mai ridicat față de implanturile rotunde",
                  "Risc teoretic de rotație (foarte rar cu tehnici moderne)",
                  "Necesită plasare precisă pentru rezultat optimal",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 shrink-0 flex items-center justify-center text-muted-foreground text-lg">•</span>
                    <span className="text-muted-foreground">{item}</span>
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
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Candidatul Ideal
            </h2>
            <div className="bg-secondary/30 rounded-2xl p-8 lg:p-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Implanturile anatomice sunt perfecte pentru <strong className="text-foreground">femeile care doresc 
                un aspect cât mai natural</strong>, pentru <strong className="text-foreground">reconstrucția mamară</strong> după 
                mastectomie, și pentru cele cu <strong className="text-foreground">țesut mamar redus</strong> care vor 
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
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8 text-center">
              Rotund vs. Anatomic
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <h3 className="font-medium text-foreground mb-4">Rotund</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Decolteu mai plin</li>
                  <li>✓ Cost mai accesibil</li>
                  <li>✓ Fără risc de rotație</li>
                </ul>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-soft border-2 border-primary">
                <h3 className="font-medium text-primary mb-4">Anatomic</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
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
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Vrei să afli dacă implanturile anatomice sunt potrivite pentru tine?
            </h2>
            <p className="text-muted-foreground mb-8">
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

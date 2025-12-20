import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-implants-round.jpg";

const ImplanturiRotundePage = () => {
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
            <span className="text-gradient-gold">Rotunde</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            Implanturile rotunde oferă un volum uniform în partea superioară și inferioară a sânului, 
            creând un decolteu vizibil și plin. Sunt alegerea ideală pentru femeile care doresc 
            un aspect mai dramatic și plin.
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
                  "Decolteu mai plin și mai vizibil",
                  "Aspect simetric în orice poziție",
                  "Cost mai accesibil decât alte tipuri",
                  "Risc zero de rotație (sunt simetrice)",
                  "Varietate mare de mărimi disponibile",
                  "Recuperare similară cu alte tipuri",
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
                  "Aspectul poate fi mai puțin natural pentru unele paciente",
                  "Mai vizibile sub țesut mamar subțire",
                  "Pot arăta mai rotunjite în partea superioară",
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
                Implanturile rotunde sunt ideale pentru <strong className="text-foreground">femeile cu țesut 
                mamar suficient</strong> care doresc un <strong className="text-foreground">decolteu plin și vizibil</strong>. 
                Sunt excelente pentru cele care vor un aspect mai glamour, 
                sau pentru compensarea unei asimetrii existente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profiluri */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8 text-center">
              Profiluri Disponibile
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { name: "Profil Scăzut", desc: "Aspect foarte natural, proiecție minimă" },
                { name: "Profil Moderat", desc: "Echilibru între natural și plin" },
                { name: "Profil Înalt", desc: "Proiecție maximă, decolteu dramatic" },
              ].map((profile) => (
                <div key={profile.name} className="bg-card rounded-xl p-6 text-center shadow-soft">
                  <h3 className="font-medium text-foreground mb-2">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.desc}</p>
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
              Vrei să afli dacă implanturile rotunde sunt potrivite pentru tine?
            </h2>
            <p className="text-muted-foreground mb-8">
              Programează o consultație pentru a discuta cu specialistul nostru și a primi recomandări personalizate.
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

export default ImplanturiRotundePage;

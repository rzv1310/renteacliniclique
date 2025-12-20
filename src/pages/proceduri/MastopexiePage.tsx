import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import heroImage from "@/assets/heroes/hero-mastopexy.jpg";

const MastopexiePage = () => {
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
            Procedură Combinată
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up">
            Augmentare Mamară cu
            <br />
            <span className="text-gradient-gold">Mastopexie (Ridicare)</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            Combinația perfectă între mărirea și ridicarea sânilor. Această procedură 
            este ideală pentru femeile care doresc atât volum suplimentar, cât și 
            corectarea ptozei mamare (coborârea sânilor).
          </p>
          <Button variant="hero" size="lg" className="group animate-fade-in-up animation-delay-200">
            Programează Consultația
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Ce este */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
                Ce este Mastopexia cu Augmentare?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Mastopexia (sau liftingul mamar) este procedura de ridicare a sânilor care au coborât 
                din cauza sarcinii, alăptării, pierderii în greutate sau îmbătrânirii naturale.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Când este combinată cu augmentarea, obții simultan ridicarea sânilor în poziția 
                dorită ȘI volumul suplimentar pe care îl dorești - totul într-o singură intervenție.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-elegant">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Beneficii Cheie
              </h3>
              <ul className="space-y-3">
                {[
                  "O singură intervenție, o singură recuperare",
                  "Rezultat complet și armonios",
                  "Corectează atât poziția cât și volumul",
                  "Aspect întinerit și plin",
                  "Durată similară cu augmentarea simplă",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
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
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8 text-center">
              Ești Candidata Ideală Dacă...
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Sânii tăi au coborât după sarcină sau alăptare",
                "Ai pierdut volumul natural al sânilor odată cu trecerea timpului",
                "Mameloanele sunt orientate în jos sau sub pliul submam.",
                "Dorești atât volum suplimentar cât și o poziție mai ridicată",
                "Ai experimentat pierdere semnificativă în greutate",
                "Dorești să-ți recapeți aspectul tineresc al sânilor",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-secondary/30 rounded-xl p-4">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tehnici */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8 text-center">
              Tehnici de Mastopexie
            </h2>
            <div className="space-y-6">
              {[
                {
                  name: "Mastopexie Periareolară",
                  desc: "Cicatrice doar în jurul areolei - pentru ptoză minimă",
                  severity: "Ptoză ușoară",
                },
                {
                  name: "Mastopexie Verticală (Lollipop)",
                  desc: "Cicatrice în jurul areolei + vertical - pentru ptoză moderată",
                  severity: "Ptoză moderată",
                },
                {
                  name: "Mastopexie în Ancoră",
                  desc: "Cicatrice completă în T sau ancoră - pentru ptoză severă",
                  severity: "Ptoză severă",
                },
              ].map((technique) => (
                <div key={technique.name} className="bg-card rounded-xl p-6 shadow-soft">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                        {technique.name}
                      </h3>
                      <p className="text-muted-foreground">{technique.desc}</p>
                    </div>
                    <span className="bg-secondary/30 text-muted-foreground text-sm px-4 py-2 rounded-full whitespace-nowrap">
                      {technique.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recuperare */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
              Recuperare
            </h2>
            <p className="text-muted-foreground mb-8">
              Recuperarea după mastopexie cu augmentare este similară cu cea după augmentare simplă, 
              cu câteva considerații suplimentare pentru vindecarea cicatricilor.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-left">
              {[
                { time: "1-2 săptămâni", desc: "Repaus, evitare efort fizic" },
                { time: "4-6 săptămâni", desc: "Reluarea activităților ușoare" },
                { time: "3-6 luni", desc: "Rezultat final vizibil" },
              ].map((item) => (
                <div key={item.time} className="bg-card rounded-xl p-5 shadow-soft">
                  <p className="font-serif text-lg text-primary mb-1">{item.time}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Ai nevoie de ridicare + volum?
            </h2>
            <p className="text-muted-foreground mb-8">
              Programează o consultație pentru a evalua gradul de ptoză și a discuta opțiunile tale.
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

export default MastopexiePage;

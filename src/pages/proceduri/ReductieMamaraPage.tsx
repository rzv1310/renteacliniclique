import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock, Shield, Heart, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SEOHead from "@/components/SEOHead";
import heroImage from "@/assets/heroes/hero-reduction.jpg";

const ReductieMamaraPage = () => {
  const benefits = [
    "Ameliorarea durerilor de spate și gât",
    "Postură îmbunătățită și echilibru corporal",
    "Eliminarea iritațiilor cutanate sub sâni",
    "Libertate vestimentară și sportivă",
    "Proporții armonioase cu restul corpului",
    "Creșterea stimei de sine",
  ];

  const candidates = [
    {
      icon: Activity,
      title: "Dureri cronice",
      description: "Femei care suferă de dureri de spate, gât sau umeri cauzate de greutatea excesivă a sânilor.",
    },
    {
      icon: Heart,
      title: "Probleme posturale",
      description: "Persoane cu dificultăți în menținerea unei posturi corecte din cauza macromastiei.",
    },
    {
      icon: Shield,
      title: "Iritații cutanate",
      description: "Femei care experimentează iritații, eczeme sau infecții frecvente sub sâni.",
    },
    {
      icon: Users,
      title: "Limitări sportive",
      description: "Active care nu pot practica sporturi sau activități fizice din cauza disconfortului.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultație inițială",
      description: "Evaluare completă, discutarea așteptărilor și planificarea intervenției personalizate.",
    },
    {
      step: "02",
      title: "Ziua intervenției",
      description: "Procedură sub anestezie generală, durată 2-3 ore, folosind tehnici moderne de reducție.",
    },
    {
      step: "03",
      title: "Recuperare",
      description: "2-3 săptămâni repaus relativ, sutien special, controale regulate pentru monitorizare.",
    },
    {
      step: "04",
      title: "Rezultat final",
      description: "Sâni proporționali, ameliorarea simptomelor și libertate de mișcare completă.",
    },
  ];

  return (
    <PageLayout>
      <SEOHead
        title="Reducție Mamară București | Micșorare Sâni | Rentéa Aesthetic"
        description="Reducție mamară profesională în București. Ameliorarea durerilor de spate, îmbunătățirea posturii și calității vieții. Rezultate naturale."
        keywords="reductie mamara bucuresti, micsorare sani, macromastie, chirurgie reducere san"
        canonical="/proceduri/micsorare-sani-reductie-mamara"
      />
      {/* Hero Section - Full Screen */}
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
            Reducție Mamară
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up">
            Micșorarea Sânilor pentru
            <br />
            <span className="text-gradient-gold">O Viață Fără Durere</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            Reducția mamară este soluția chirurgicală pentru femeile care suferă de macromastie – 
            sâni excesiv de mari care cauzează dureri cronice și limitează calitatea vieții.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-200">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="group">
                Programează Consultația
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/galerie">Vezi Rezultate</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* What is it Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-6">
                  Ce este Reducția Mamară?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Reducția mamară (mamoplastia de reducție) este o procedură chirurgicală prin care 
                  se îndepărtează excesul de țesut mamar, grăsime și piele pentru a obține sâni 
                  proporționali cu corpul pacientei.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Intervenția are atât beneficii estetice cât și funcționale, ameliorând semnificativ 
                  durerile de spate, gât și umeri asociate cu sânii prea mari.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Tehnicile moderne permit păstrarea sensibilității și, în multe cazuri, a capacității 
                  de alăptare, minimizând totodată cicatricile.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                  Beneficii Principale
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidates Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Cui se Adresează?
            </h2>
            <p className="text-muted-foreground">
              Reducția mamară este ideală pentru femeile care se confruntă cu următoarele probleme.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {candidates.map((item, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-shadow">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Procesul Chirurgical
            </h2>
            <p className="text-muted-foreground">
              De la consultație până la recuperare completă – iată ce implică reducția mamară.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                  <span className="text-4xl font-serif font-bold text-secondary">{item.step}</span>
                  <h3 className="font-serif text-lg font-semibold text-foreground mt-4 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recovery Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-soft">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">
                  Perioada de Recuperare
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Prima săptămână</h3>
                  <p className="text-sm text-muted-foreground">
                    Repaus la pat, sutien special, medicație pentru durere. Evitarea efortului fizic.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Săptămânile 2-3</h3>
                  <p className="text-sm text-muted-foreground">
                    Reluarea treptată a activităților ușoare. Controale pentru monitorizarea vindecării.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">După 4-6 săptămâni</h3>
                  <p className="text-sm text-muted-foreground">
                    Reluarea activităților normale și sportive. Rezultate vizibile și definitive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-6">
              Eliberează-te de Disconfort
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Programează o consultație pentru a discuta cum reducția mamară îți poate îmbunătăți 
              calitatea vieții.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="group">
                Programează Consultația
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ReductieMamaraPage;

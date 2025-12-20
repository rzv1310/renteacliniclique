import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles, Leaf, Target, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-lipofilling.jpg";

const LipofillingMamarPage = () => {
  const advantages = [
    "100% natural – folosește grăsimea proprie",
    "Fără corp străin sau risc de rejet",
    "Aspect și textură complet naturale",
    "Conturare corporală simultană (liposucție)",
    "Cicatrici minime, aproape invizibile",
    "Recuperare mai rapidă decât la implanturi",
  ];

  const limitations = [
    "Mărire limitată (0.5 – 1 cupă per ședință)",
    "Necesită suficientă grăsime donatoare",
    "Parte din grăsime se resoarbe (30-50%)",
    "Pot fi necesare mai multe ședințe",
  ];

  const processSteps = [
    {
      step: "01",
      title: "Liposucție",
      description: "Se recoltează grăsime din zonele cu exces (abdomen, coapse, șolduri) prin liposucție blândă.",
    },
    {
      step: "02",
      title: "Purificare",
      description: "Grăsimea recoltată este purificată și pregătită pentru reinjectare folosind tehnici avansate.",
    },
    {
      step: "03",
      title: "Reinjectare",
      description: "Grăsimea este injectată în straturi fine pentru integrare optimă și rezultat natural.",
    },
    {
      step: "04",
      title: "Rezultat",
      description: "După stabilizare (3-6 luni), sânii au un aspect și o textură complet naturale.",
    },
  ];

  const idealCandidate = [
    {
      icon: Target,
      title: "Dorește mărire moderată",
      description: "Femei care vor o creștere subtilă, de 0.5-1 cupă, fără schimbări dramatice.",
    },
    {
      icon: Leaf,
      title: "Preferă soluții naturale",
      description: "Paciente care doresc să evite implanturile și orice corp străin în organism.",
    },
    {
      icon: Sparkles,
      title: "Are grăsime disponibilă",
      description: "Femei cu zone de exces de grăsime care pot fi folosite ca sursă donatoare.",
    },
    {
      icon: Clock,
      title: "Acceptă procesul gradual",
      description: "Înțelege că pot fi necesare mai multe ședințe pentru rezultatul dorit.",
    },
  ];

  return (
    <PageLayout>
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
            Lipofilling Mamar
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up">
            Augmentare Mamară cu
            <br />
            <span className="text-gradient-gold">Grăsime Proprie</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            Lipofilling-ul mamar folosește grăsimea proprie pentru a mări sânii natural, 
            fără implanturi. O metodă 100% naturală pentru un rezultat armonios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-200">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="group">
                Programează Consultația
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/proceduri/augmentare-mamara">Compară cu Implanturi</Link>
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
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-6">
                  Ce este Lipofilling-ul Mamar?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Lipofilling-ul mamar (sau transferul de grăsime) este o procedură prin care 
                  grăsimea este recoltată din zone cu exces (abdomen, coapse, șolduri), purificată 
                  și reinjectată în sâni pentru a le mări volumul.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Este soluția ideală pentru femeile care doresc o mărire subtilă și naturală, 
                  evitând implanturile. Bonus: zonele donatoare devin mai conturate!
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Procedura folosește tehnici de liposucție de ultimă generație pentru a păstra 
                  viabilitatea celulelor grase, maximizând rezultatele.
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    Avantaje
                  </h3>
                  <ul className="space-y-3">
                    {advantages.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-soft border-l-4 border-amber-400">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    Limitări
                  </h3>
                  <ul className="space-y-3">
                    {limitations.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs text-amber-600 font-medium">!</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Candidate Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Candidata Ideală
            </h2>
            <p className="text-muted-foreground">
              Lipofilling-ul mamar este potrivit pentru anumite profiluri de paciente.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {idealCandidate.map((item, index) => (
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
              Procesul în 4 Pași
            </h2>
            <p className="text-muted-foreground">
              De la recoltare până la rezultatul final – un proces natural și sigur.
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

      {/* Comparison Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                Lipofilling vs. Implanturi
              </h2>
              <p className="text-muted-foreground">
                Ce metodă ți se potrivește? Hai să comparăm.
              </p>
            </div>
            <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
              <div className="grid grid-cols-3 bg-secondary/50">
                <div className="p-4 font-medium text-foreground text-sm">Aspect</div>
                <div className="p-4 font-medium text-foreground text-sm text-center">Lipofilling</div>
                <div className="p-4 font-medium text-foreground text-sm text-center">Implanturi</div>
              </div>
              {[
                { aspect: "Grad de mărire", lipofilling: "Moderat (0.5-1 cupă)", implanturi: "Semnificativ (1-3+ cupe)" },
                { aspect: "Material", lipofilling: "Grăsime proprie", implanturi: "Silicon / Ser fiziologic" },
                { aspect: "Naturalețe", lipofilling: "Foarte naturală", implanturi: "Naturală până la dramatică" },
                { aspect: "Cicatrici", lipofilling: "Minime", implanturi: "Moderate" },
                { aspect: "Durabilitate", lipofilling: "Permanentă (grăsimea care prinde)", implanturi: "10-20 ani (poate necesita revizie)" },
                { aspect: "Recuperare", lipofilling: "1-2 săptămâni", implanturi: "2-4 săptămâni" },
              ].map((row, index) => (
                <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? "bg-background" : "bg-secondary/20"}`}>
                  <div className="p-4 text-sm text-muted-foreground">{row.aspect}</div>
                  <div className="p-4 text-sm text-muted-foreground text-center">{row.lipofilling}</div>
                  <div className="p-4 text-sm text-muted-foreground text-center">{row.implanturi}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-6">
              Descoperă Dacă Ești Candidată
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Programează o consultație pentru a afla dacă lipofilling-ul mamar este potrivit 
              pentru tine și așteptările tale.
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

export default LipofillingMamarPage;

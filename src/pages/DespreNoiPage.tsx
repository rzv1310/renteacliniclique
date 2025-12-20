import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Heart, Users, Phone } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-despre.jpg";
import doctorImage from "@/assets/dr-lucian-popa.webp";

const DespreNoiPage = () => {
  return (
    <PageLayout>
      {/* Hero - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Despre Noi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 pt-20">
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 block animate-fade-in">
            Despre Noi
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up">
            Rentéa Aesthetic Clinique București
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-100 mb-8">
            La Rentéa, ne dedicăm exclusiv chirurgiei estetice mamare. Această specializare 
            unică ne permite să oferim experiență și rezultate la cel mai înalt nivel.
          </p>
          <Button size="lg" className="btn-glow-border bg-transparent text-white border border-rose-gold/60 hover:bg-rose-gold/10 hover:border-rose-gold animate-fade-in-up animation-delay-200">
            <Phone className="w-5 h-5 mr-2" />
            Fă primul pas pentru transformare
          </Button>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Stats */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "15+", label: "Ani Experiență" },
              { value: "3000+", label: "Paciente Mulțumite" },
              { value: "100%", label: "Specializare" },
              { value: "98%", label: "Rată de Satisfacție" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-4xl lg:text-5xl text-primary font-semibold mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filozofia */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Filozofia Noastră
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Credem că fiecare femeie merită să se simtă încrezătoare în propriul corp. 
                Nu ne propunem să creăm un „ideal", ci să evidențiem frumusețea naturală 
                și să aducem echilibru și armonie.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Abordarea noastră combină artă și știință - folosim cele mai avansate 
                tehnici chirurgicale pentru a obține rezultate care arată și se simt naturale.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, title: "Excelență", desc: "Standarde înalte în tot ceea ce facem" },
                { icon: Heart, title: "Empatie", desc: "Înțelegem nevoile fiecărei paciente" },
                { icon: Users, title: "Personalizare", desc: "Fiecare caz este unic" },
                { icon: Award, title: "Siguranță", desc: "Protocoale stricte de siguranță" },
              ].map((value) => (
                <div key={value.title} className="bg-secondary rounded-xl p-6">
                  <value.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-medium text-foreground mb-1">{value.title}</h3>
                  <p className="text-xs text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Echipa */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">
              Medicină prin ochii unui artist.
            </h2>

            {/* Doctor Header Card */}
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-elegant mb-8 text-center">
              <img 
                src={doctorImage} 
                alt="Dr. Lucian Popa" 
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover object-top mx-auto mb-6 border-4 border-primary/20"
              />
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Dr. Lucian Popa
              </h3>
              <p className="text-primary mb-4">Medic Primar Chirurgie Estetică, Plastică și Reconstructivă</p>
            </div>

            {/* Introduction Card */}
            <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-elegant mb-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Sunt Dr. Lucian Popa și cred că chirurgia estetică este punctul de întâlnire dintre rigoarea științifică și viziunea artistică. Cu o <span className="text-foreground font-medium">experiență de peste 25 de ani</span> în chirurgie plastică și reconstructivă, am învățat că dincolo de bisturiu, cel mai important instrument este capacitatea de a asculta și de a înțelege unicitatea fiecărui pacient.
              </p>
            </div>

            {/* Art Background Card */}
            <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-elegant mb-6 border-l-4 border-primary">
              <p className="text-muted-foreground leading-relaxed">
                Călătoria mea nu a început direct în sala de operație, ci în atelierele Școlii de Muzică și Arte Plastice „N. N. Tonitza". Acolo mi-am educat privirea pentru proporții, forme și armonie – calități pe care, ani mai târziu, le-am integrat în practica mea medicală. Astăzi, nu caut doar să "operez", ci să sculptez rezultate care să se simtă naturale și să ofere încredere.
              </p>
            </div>

            {/* Professional Journey Card */}
            <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-elegant mb-6">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Parcursul Profesional
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Am absolvit Universitatea de Medicină și Farmacie „Gr. T. Popa" din Iași în 1991, iar dorința de perfecționare m-a purtat prin stagii de pregătire internațională, inclusiv la Spitalul St. Elisabeth din Bruxelles. Am parcurs toate etapele ierarhiei medicale, de la medic stagiar la <span className="text-foreground font-medium">Medic Primar și Doctor în Științe Medicale.</span>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Am avut onoarea să formez viitori medici ca Asistent Universitar și să îmi asum responsabilități complexe ca Manager al Spitalului Clinic de Urgențe „Sf. Ioan" Iași. Spiritul antreprenorial și dorința de a ridica standardele m-au determinat să co-fondez Esthetic Center, un reper în medicina estetică ieșeană.
              </p>
            </div>

            {/* Present Day Card */}
            <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-elegant mb-6">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Prezentul
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Astăzi, îmi dedic expertiza pacienților mei în două locații de top: la Omini Clinic în Iași și la <span className="text-foreground font-medium">Rentéa Aesthetic Clinique în București.</span>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sunt membru activ al celor mai prestigioase societăți de profil (Societatea Română de Chirurgie Estetică, de Microchirurgie și de Chirurgie Plastică Reconstructivă), ceea ce îmi permite să rămân conectat la cele mai noi tehnici globale.
              </p>
            </div>

            {/* Philosophy Card */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-10 shadow-elegant border border-primary/20">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Filozofia mea
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Nu cred în șabloane. Abordarea mea este personalizată, minuțioasă și orientată către perfecțiune. Fie că vorbim despre o intervenție complexă sau una de finețe, scopul meu este să îți ofer nu doar un rezultat estetic, ci o experiență medicală sigură și completă.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clinica */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Clinica Noastră
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
              Situată în inima Bucureștiului, clinica noastră oferă un mediu intim și 
              elegant, echipat cu cele mai moderne tehnologii pentru siguranța și 
              confortul pacientelor.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: "Sală de Operație", desc: "Echipament de ultimă generație" },
                { title: "Camere Private", desc: "Confort și intimitate" },
                { title: "Simulare 3D", desc: "Vizualizează rezultatul" },
              ].map((feature) => (
                <div key={feature.title} className="bg-secondary rounded-xl p-6">
                  <h3 className="font-medium text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default DespreNoiPage;

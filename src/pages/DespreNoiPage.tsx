import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Heart, Users } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-despre.jpg";

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
            Singura Clinică Din București
            <br />
            <span className="text-gradient-gold">100% Specializată</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            La Rentéa, ne dedicăm exclusiv chirurgiei estetice mamare. Această specializare 
            unică ne permite să oferim experiență și rezultate la cel mai înalt nivel.
          </p>
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-12">
              Echipa Noastră
            </h2>

            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-elegant">
              <div className="w-32 h-32 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">👩‍⚕️</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                Dr. Maria Rentéa
              </h3>
              <p className="text-primary mb-4">Chirurg Estetician Principal</p>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Cu peste 15 ani de experiență în chirurgie estetică mamară, Dr. Rentéa s-a 
                specializat exclusiv în acest domeniu pentru a oferi cele mai bune rezultate 
                posibile. A efectuat peste 3000 de intervenții și participă regulat la 
                congrese internaționale de specialitate.
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

      {/* CTA */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Vino să ne cunoști
            </h2>
            <p className="text-muted-foreground mb-8">
              Programează o consultație pentru a discuta cu echipa noastră și a vizita clinica.
            </p>
            <Button variant="hero" size="xl" className="group">
              Programează Vizita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DespreNoiPage;

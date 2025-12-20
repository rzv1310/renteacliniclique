import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-proceduri.jpg";

const procedures = [
  {
    title: "Implant Mamar București",
    description: "Procedura principală pentru mărirea sânilor cu implanturi. Descoperă toate tipurile de implanturi disponibile.",
    href: "/proceduri/implant-mamar-bucuresti",
    subPages: [
      { name: "Implanturi Rotunde", href: "/proceduri/implant-mamar-bucuresti/implanturi-mamare-rotunde" },
      { name: "Implanturi Anatomice", href: "/proceduri/implant-mamar-bucuresti/implanturi-mamare-anatomice" },
      { name: "Implanturi Ergonomice", href: "/proceduri/implant-mamar-bucuresti/implanturi-mamare-ergonomice" },
    ],
  },
  {
    title: "Augmentare cu Mastopexie",
    description: "Combinația perfectă între mărirea sânilor și ridicarea lor pentru un rezultat complet și armonios.",
    href: "/proceduri/augmentare-mamara-cu-mastopexie",
    subPages: [],
  },
  {
    title: "Revizie Implant Mamar",
    description: "Schimbarea sau îndepărtarea implanturilor existente pentru rezultate îmbunătățite sau din motive medicale.",
    href: "/proceduri/revizie-implant-mamar",
    subPages: [],
  },
  {
    title: "Reducție Mamară",
    description: "Micșorarea sânilor pentru ameliorarea durerilor de spate și îmbunătățirea calității vieții.",
    href: "/proceduri/micsorare-sani-reductie-mamara",
    subPages: [],
  },
  {
    title: "Lipofilling Mamar",
    description: "Augmentare naturală cu grăsime proprie, fără implanturi – rezultat 100% natural.",
    href: "/proceduri/lipofilling-mamar",
    subPages: [],
  },
];

const ProceduriIndex = () => {
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
            Servicii Specializate
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up">
            Proceduri de
            <br />
            <span className="text-gradient-gold">Augmentare Mamară</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Suntem singura clinică din București dedicată exclusiv chirurgiei estetice mamare.
            Specializarea noastră 100% înseamnă experiență superioară și rezultate excepționale.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Procedures Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 max-w-5xl mx-auto">
            {procedures.map((procedure) => (
              <div
                key={procedure.title}
                className="bg-card rounded-2xl p-8 lg:p-10 shadow-soft hover:shadow-elegant transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-3">
                      {procedure.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {procedure.description}
                    </p>
                    
                    {procedure.subPages.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        {procedure.subPages.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className="text-sm px-4 py-2 bg-secondary/30 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Link
                    to={procedure.href}
                    className="flex items-center gap-2 text-primary hover:text-foreground transition-colors font-medium group shrink-0"
                  >
                    Află mai multe
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProceduriIndex;

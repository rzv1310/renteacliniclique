import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const JourneySection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const steps = [
    {
      step: "1",
      title: "Consultația & Simulare 3D",
      description:
        "O discuție personalizată, măsurători precise și o simulare 3D avansată vă vor dezvălui rezultatul înainte de intervenție.",
    },
    {
      step: "2",
      title: "Ziua Intervenției",
      description:
        "O procedură de aproximativ 60 de minute, sub anestezie generală, efectuată în condiții de maximă siguranță și confort.",
    },
    {
      step: "3",
      title: "Recuperare Expediată",
      description:
        "Protocolul nostru post-operator este conceput pentru o recuperare rapidă, cu disconfort minim, permițându-vă să reveniți la activitățile zilnice.",
    },
    {
      step: "4",
      title: "Noul Dumneavoastră Eu",
      description:
        "După aproximativ 3 luni, veți celebra forma finală a transformării dumneavoastră, însoțită de o nouă încredere și armonie.",
    },
  ];

  return (
    <section 
      className="py-24 lg:py-32 bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-label mb-4 block">
            Parcurs Personalizat
          </span>
          <h2 className="h2-section text-foreground mb-6">
            De la Vis la Realitate în 4 Pași Simfoni.
          </h2>
          <p className="text-body leading-relaxed">
            Transformarea dumneavoastră este o călătorie atent orchestrată, concepută pentru a fi discretă, confortabilă și excepțională la fiecare pas.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Step Number */}
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-rose-gold flex items-center justify-center group-hover:bg-rose-gold/10 transition-colors duration-300">
                  <span className="font-display text-2xl text-rose-gold font-medium">
                    {step.step}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-medium text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-sans">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import MaterialIcon from "@/components/ui/MaterialIcon";

const JourneySection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const steps = [
    {
      step: "01",
      icon: "calendar_month",
      title: "Consultația & Simulare 3D",
      description:
        "O discuție personalizată, măsurători precise și o simulare 3D avansată vă vor dezvălui rezultatul înainte de intervenție.",
    },
    {
      step: "02",
      icon: "medical_services",
      title: "Ziua Intervenției",
      description:
        "O procedură de aproximativ 60 de minute, sub anestezie generală, efectuată în condiții de maximă siguranță și confort.",
    },
    {
      step: "03",
      icon: "healing",
      title: "Recuperare Expediată",
      description:
        "Protocolul nostru post-operator este conceput pentru o recuperare rapidă, cu disconfort minim, permițându-vă să reveniți la activitățile zilnice.",
    },
    {
      step: "04",
      icon: "self_improvement",
      title: "Noua Tu",
      description:
        "După aproximativ 3 luni, veți celebra forma finală a transformării dumneavoastră, însoțită de o nouă încredere și armonie.",
    },
  ];

  return (
    <section 
      className="py-24 lg:py-32 bg-card"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-label mb-4 block">
            PARCURS PERSONALIZAT
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            <span className="italic">De la Vis la Realitate în 4 Pași</span>
          </h2>
          <p className="text-body leading-relaxed">
            Transformarea dumneavoastră este o călătorie atent orchestrată, concepută pentru a fi discretă, confortabilă și excepțională la fiecare pas.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`group bg-background rounded-2xl overflow-hidden border border-border hover:border-rose-gold/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Step Number */}
              <div className="pt-8 pb-4 px-6">
                <span className="font-display text-6xl lg:text-7xl font-light text-rose-gold/30">
                  {step.step}
                </span>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 mb-3">
                  <MaterialIcon name={step.icon} className="text-xl text-rose-gold" />
                  <h3 className="font-display text-base font-medium text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;

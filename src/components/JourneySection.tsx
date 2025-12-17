import { MessageCircle, Calendar, Stethoscope, Sparkles } from "lucide-react";

const JourneySection = () => {
  const steps = [
    {
      icon: MessageCircle,
      step: "01",
      title: "Consultația & Simularea 3D",
      description:
        "Discutăm, măsurăm și îți arătăm cum vei arăta, înainte de operație. Fără surprize.",
    },
    {
      icon: Calendar,
      step: "02",
      title: "Ziua Intervenției",
      description:
        "O procedură de aprox. 60 minute, sub anestezie generală, în condiții de maximă siguranță.",
    },
    {
      icon: Stethoscope,
      step: "03",
      title: "Recuperarea Rapidă",
      description:
        "Pleci acasă a doua zi. Protocolul nostru special reduce durerea și vânătăile la minim.",
    },
    {
      icon: Sparkles,
      step: "04",
      title: "Noul Tu",
      description:
        "La 3 luni te bucuri de forma finală și de o nouă încredere în tine.",
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
            Călătoria Ta
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-deep-brown mb-6">
            De la Vis la Realitate în 4 Pași Simpli
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-champagne to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step Number Badge */}
                <div className="relative z-10 mb-6 lg:mb-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-card shadow-elegant flex items-center justify-center group-hover:shadow-gold transition-all duration-500 border-2 border-champagne-light group-hover:border-rose-gold">
                    <step.icon className="w-8 h-8 text-rose-gold" />
                  </div>
                  {/* Step Number */}
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-rose-gold text-primary-foreground text-sm font-semibold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-serif text-xl font-semibold text-deep-brown mb-3">
                    {step.title}
                  </h3>
                  <p className="text-soft-brown leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Connector - Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 text-champagne">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;

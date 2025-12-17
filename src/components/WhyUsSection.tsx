import { Diamond, Sparkles, Shield } from "lucide-react";

const WhyUsSection = () => {
  const features = [
    {
      icon: Diamond,
      title: "Maestru, nu Generalist",
      description:
        "În timp ce alți chirurgi fac azi un nas și mâine o liposucție, noi facem doar implant mamar. Zi de zi. Această repetiție garantează perfecțiunea tehnică.",
    },
    {
      icon: Sparkles,
      title: "Cele mai bune implanturi din lume",
      description:
        "Lucrăm exclusiv cu branduri premium (Mentor, Motiva) și tehnici de ultimă generație (Dual Plane, Recuperare Rapidă).",
    },
    {
      icon: Shield,
      title: "Rată de Complicații Minimă",
      description:
        "Specializarea strictă ne permite să reducem riscurile la minim și să oferim cea mai ușoară recuperare din industrie.",
    },
  ];

  return (
    <section id="despre" className="py-24 lg:py-32 bg-gradient-soft">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
            Diferențiatorul nostru
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-deep-brown mb-6">
            De ce să alegi un superspecialist?
          </h2>
          <p className="text-soft-brown text-lg leading-relaxed">
            Concentrarea absolută pe o singură procedură ne face lideri în domeniu.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-8 lg:p-10 shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-champagne-light flex items-center justify-center mb-6 group-hover:bg-champagne transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-rose-gold" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl font-semibold text-deep-brown mb-4">
                {feature.title}
              </h3>
              <p className="text-soft-brown leading-relaxed">{feature.description}</p>

              {/* Decorative Line */}
              <div className="mt-6 h-1 w-12 bg-gradient-to-r from-rose-gold to-champagne rounded-full group-hover:w-20 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

import { Diamond, Shield, CheckCircle } from "lucide-react";

const WhyUsSection = () => {
  const features = [
    {
      icon: Diamond,
      title: "Maestru, nu Generalist",
      description:
        "În timp ce alți chirurgi abordează o gamă variată de proceduri, noi ne dedicăm exclusiv augmentării mamare, zi de zi. Această specializare profundă este cheia perfecțiunii tehnice și artistice.",
    },
    {
      icon: CheckCircle,
      title: "Implanturi de Excepție",
      description:
        "Colaborăm exclusiv cu branduri de elită precum Mentor și Motiva, utilizând cele mai avansate tehnici, inclusiv Dual Plane și protocoale de recuperare rapidă, pentru rezultate de durată și aspect natural.",
    },
    {
      icon: Shield,
      title: "Siguranță Neclintită",
      description:
        "Datorită specializării noastre stricte și a protocoalelor riguroase, rata de complicații este minimă. Ne angajăm să oferim cea mai sigură și ușoară recuperare din industrie.",
    },
  ];

  return (
    <section id="despre" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="h2-section text-foreground mb-6">
            De ce să alegi un superspecialist?
          </h2>
          <p className="text-body leading-relaxed">
            La clinica noastră, angajamentul față de excelență se reflectă în fiecare detaliu. Experiența, precizia și dedicarea noastră exclusivă îți garantează rezultate sublime și o liniște absolută.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-8 lg:p-10 border border-border hover:border-rose-gold/50 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-rose-gold/10 border border-rose-gold/30 flex items-center justify-center mb-6 group-hover:bg-rose-gold/20 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-rose-gold" />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-medium text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed font-sans">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

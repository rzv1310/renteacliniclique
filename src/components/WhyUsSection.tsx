import MaterialIcon from "@/components/ui/MaterialIcon";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import maestruImage from "@/assets/maestru-doctor.png";
import sigurantaImage from "@/assets/siguranta-doctor.png";

const WhyUsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const features = [
    {
      icon: "diamond",
      title: "Maestru, nu Generalist",
      description:
        "În timp ce alți chirurgi abordează o gamă variată de proceduri, noi ne dedicăm exclusiv augmentării mamare, zi de zi. Această specializare profundă este cheia perfecțiunii tehnice și artistice.",
      image: maestruImage,
    },
    {
      icon: "verified",
      title: "Implanturi de Excepție",
      description:
        "Colaborăm exclusiv cu branduri de elită precum Mentor și Motiva, utilizând cele mai avansate tehnici, inclusiv Dual Plane și protocoale de recuperare rapidă, pentru rezultate de durată și aspect natural.",
    },
    {
      icon: "shield_lock",
      title: "Siguranță Neclintită",
      description:
        "Datorită specializării noastre stricte și a protocoalelor riguroase, rata de complicații este minimă. Ne angajăm să oferim cea mai sigură și ușoară recuperare din industrie.",
      image: sigurantaImage,
    },
  ];

  return (
    <section 
      id="despre" 
      className="py-24 lg:py-32 bg-card"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-label mb-4 block">DE CE NOI?</span>
          <h2 className="h2-section text-foreground mb-6">
            De ce să alegi un superspecialist?
          </h2>
          <p className="text-body leading-relaxed">
            La RENTÉA, angajamentul nostru față de excelență se reflectă în fiecare detaliu. Experiența, precizia și dedicarea noastră exclusivă îți garantează rezultate sublime și o liniște absolută.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group bg-background rounded-2xl overflow-hidden border border-border hover:border-rose-gold/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image with Icon */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-rose-gold/5 to-rose-gold/10 flex items-center justify-center overflow-hidden">
                {feature.image ? (
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover object-[center_20%] scale-125"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-rose-gold/20 flex items-center justify-center group-hover:bg-rose-gold/30 transition-colors duration-300">
                    <MaterialIcon name={feature.icon} className="text-4xl text-rose-gold" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-medium text-foreground mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm font-sans text-center">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

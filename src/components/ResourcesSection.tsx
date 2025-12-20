import MaterialIcon from "@/components/ui/MaterialIcon";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

// Import resource images
import resource1Image from "@/assets/resources/resource-1.jpg";
import resource2Image from "@/assets/resources/resource-2.jpg";
import resource3Image from "@/assets/resources/resource-3.jpg";

const ResourcesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const resources = [
    {
      title: "Implant Mamar București",
      link: "/proceduri/implant-mamar-bucuresti",
      image: resource1Image,
      buttonText: "Augmentare Mamară",
    },
    {
      title: "Lifting Mamar",
      link: "/proceduri/lifting-mamar-mastopexie-ridicare-sani",
      image: resource2Image,
      buttonText: "Ridicare Sâni",
    },
    {
      title: "Reducție Mamară",
      link: "/proceduri/micsorare-sani-reductie-mamara",
      image: resource3Image,
      buttonText: "Micșorare Sâni",
    },
  ];

  return (
    <section 
      id="resurse" 
      className="py-24 lg:py-32 bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-label mb-4 block">
            CUNOȘTINȚE APROFUNDATE
          </span>
          <h2 className="h2-section text-foreground mb-6">
            Tot ce trebuie să știi despre Augmentarea Mamară
          </h2>
          <p className="text-body leading-relaxed">
            Navigați prin informații esențiale și ghiduri detaliate, create pentru a vă oferi claritate și încredere în decizia dumneavoastră.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <a
              key={resource.title}
              href={resource.link}
              className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-rose-gold/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-medium text-foreground mb-4 group-hover:text-rose-gold transition-colors leading-tight">
                  {resource.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-sm font-sans font-medium text-rose-gold group-hover:gap-3 transition-all">
                  {resource.buttonText}
                  <MaterialIcon name="arrow_forward" className="text-base" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;

import MaterialIcon from "@/components/ui/MaterialIcon";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ResourcesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const resources = [
    {
      category: "Ghid",
      title: "Implant Rotund vs. Anatomic: Care ți se potrivește?",
      link: "/blog/implant-rotund-vs-anatomic",
    },
    {
      category: "Prețuri",
      title: "Cât costă un implant mamar în București?",
      link: "/preturi",
    },
    {
      category: "Recuperare",
      title: "Recuperarea după operație: Când poți merge la sală?",
      link: "/blog/sport-dupa-augmentare-mamara",
    },
  ];

  return (
    <section 
      id="resurse" 
      className="py-24 lg:py-32 bg-card"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-label mb-4 block">
            Cunoștințe Aprofundate
          </span>
          <h2 className="h2-section text-foreground mb-6">
            Tot ce trebuie să știi despre Augmentarea Mamară
          </h2>
          <p className="text-body leading-relaxed">
            Navigați prin informații esențiale și ghiduri detaliate, create pentru a vă oferi claritate și încredere în decizia dumneavoastră.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <a
              key={resource.title}
              href={resource.link}
              className={`group bg-background rounded-2xl overflow-hidden border border-border hover:border-rose-gold/50 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Gradient Header */}
              <div className="aspect-[16/9] bg-gradient-to-br from-rose-gold/20 to-muted flex items-center justify-center">
                <span className="text-rose-gold/30 font-display text-6xl">✦</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-medium text-foreground mb-4 group-hover:text-rose-gold transition-colors leading-tight">
                  {resource.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-sm font-sans font-medium text-rose-gold group-hover:gap-3 transition-all">
                  Citește Ghidul
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

import { ArrowRight } from "lucide-react";

const ResourcesSection = () => {
  const resources = [
    {
      image: "gradient-1",
      category: "Ghid",
      title: "Implant Rotund vs. Anatomic",
      description: "Care ți se potrivește? Descoperă diferențele vizuale și tactile.",
      link: "#",
    },
    {
      image: "gradient-2",
      category: "Prețuri",
      title: "Cât costă un implant mamar în București?",
      description: "Transparență totală asupra costurilor și ce include pachetul nostru.",
      link: "#",
    },
    {
      image: "gradient-3",
      category: "Recuperare",
      title: "Recuperarea după operație",
      description: "Când poți conduce? Când poți merge la sală? Tot ce trebuie să știi.",
      link: "#",
    },
  ];

  return (
    <section id="resurse" className="py-24 lg:py-32 bg-gradient-soft">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
            Centrul de Resurse
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-deep-brown mb-6">
            Tot ce trebuie să știi despre Augmentarea Mamară
          </h2>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <a
              key={resource.title}
              href={resource.link}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Placeholder */}
              <div
                className={`aspect-[16/10] ${
                  index === 0
                    ? "bg-gradient-to-br from-rose-gold/20 to-champagne/40"
                    : index === 1
                    ? "bg-gradient-to-br from-champagne/30 to-rose-gold/20"
                    : "bg-gradient-to-br from-secondary to-champagne-light"
                } flex items-center justify-center`}
              >
                <span className="text-rose-gold/50 font-serif text-4xl">✦</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">
                  {resource.category}
                </span>
                <h3 className="font-serif text-xl font-semibold text-deep-brown mt-2 mb-3 group-hover:text-rose-gold transition-colors">
                  {resource.title}
                </h3>
                <p className="text-soft-brown text-sm leading-relaxed mb-4">
                  {resource.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-rose-gold group-hover:gap-3 transition-all">
                  Citește mai mult
                  <ArrowRight className="w-4 h-4" />
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

import { ArrowRight } from "lucide-react";
import doctorImage from "@/assets/doctor-portrait.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const DoctorSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      className="py-24 lg:py-32 overflow-hidden bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative z-10">
              <img
                src={doctorImage}
                alt="Dr. Gina Wafi"
                className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl shadow-elegant"
              />
              {/* Name overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl p-4">
                <p className="font-display text-xl text-foreground">Dr. Gina Wafi</p>
                <p className="text-sm text-muted-foreground">Chirurg Estetician Principal & Fondator</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`lg:pl-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <span className="text-label mb-4 block">
              Artizan al Frumuseții
            </span>
            <h2 className="h2-section text-foreground mb-6 leading-tight">
              Arhitectul viziunii tale.
            </h2>

            <blockquote className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 italic font-display">
              "Cred că augmentarea mamară nu este doar despre volum, ci despre proporții
              și armonie. M-am dedicat acestei singure proceduri pentru a oferi pacientelor mele
              nu doar un rezultat estetic, ci o experiență de siguranță totală."
            </blockquote>

            <p className="text-body leading-relaxed mb-8">
              Dr. Gina Wafi nu este doar un chirurg, ci un artizan dedicat perfecțiunii. Cu o specializare exclusivă în augmentarea mamară, ea aduce o măiestrie rară și o înțelegere profundă a anatomiei și esteticii feminine, transformând viziuni în realitate cu o precizie excepțională.
            </p>

            <a 
              href="/despre-noi" 
              className="inline-flex items-center gap-2 text-rose-gold font-sans font-medium hover:gap-3 transition-all"
            >
              Citește povestea completă
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;

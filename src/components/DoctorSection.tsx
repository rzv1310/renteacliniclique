import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import doctorImage from "@/assets/doctor-portrait.webp";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const DoctorSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      className="pt-0 pb-12 lg:pt-0 lg:pb-16 overflow-hidden bg-black"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative z-10">
              <img
                src={doctorImage}
                alt="Dr. Lucian Popa"
                className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl shadow-elegant"
              />
              {/* Name overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-border">
                <p className="font-display text-xl text-foreground">Dr. Lucian Popa</p>
                <p className="text-sm text-muted-foreground">Chirurg Estetician</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`lg:pl-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <span className="text-label mb-4 block">
              ARTIZAN AL FRUMUSEȚII
            </span>
            <h2 className="h2-section text-foreground mb-8 leading-tight">
              Arhitectul viziunii tale.
            </h2>

            <p className="text-body leading-relaxed mb-8">
              Pentru tine, anii mei de practică în microchirurgie se traduc într-o mână formată pentru detalii fine.<br />
              Abordez augmentarea mamară cu aceeași rigoare și delicatețe necesară în cele mai complexe reconstrucții, asigurându-ți un parcurs medical sigur și un rezultat impecabil.
            </p>

            <a href="/despre-noi" className="block text-center lg:text-left">
              <Button size="lg" className="btn-glow-border bg-transparent text-white border border-rose-gold/60 hover:bg-rose-gold/10 hover:border-rose-gold group w-full sm:w-auto">
                Citește povestea medicului
                <MaterialIcon name="arrow_forward" className="text-xl ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;

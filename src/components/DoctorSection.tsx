import MaterialIcon from "@/components/ui/MaterialIcon";
import doctorImage from "@/assets/doctor-portrait.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const DoctorSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      className="pt-4 pb-24 lg:pt-8 lg:pb-32 overflow-hidden bg-black"
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
              ARHITECTUL VIZIUNII TALE
            </span>
            <h2 className="h2-section text-foreground mb-8 leading-tight">
              Arhitectul viziunii tale.
            </h2>

            <p className="text-body leading-relaxed mb-6">
              Dr. Lucian Popa este un chirurg estetician renumit, dedicat în mod exclusiv chirurgiei mamare. Cu o experiență vastă și o pasiune pentru perfecțiune, el a transformat viețile a sute de femei prin proceduri atent personalizate.
            </p>

            <p className="text-body leading-relaxed mb-8">
              Dr. Lucian Popa nu este doar un chirurg, ci un artizan dedicat perfecțiunii. Cu o specializare exclusivă în augmentarea mamară, el aduce o măiestrie rară și o înțelegere profundă a anatomiei și esteticii feminine, transformând viziuni în realitate cu o precizie excepțională.
            </p>

            <a 
              href="/despre-noi" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose-gold text-rose-gold font-sans font-medium hover:bg-rose-gold/10 transition-all"
            >
              Citește povestea completă
              <MaterialIcon name="arrow_forward" className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;

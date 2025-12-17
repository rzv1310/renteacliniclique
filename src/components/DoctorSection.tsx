import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import doctorImage from "@/assets/doctor-portrait.jpg";

const DoctorSection = () => {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={doctorImage}
                alt="Dr. Gina Wafi"
                className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl shadow-elegant"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-champagne-light rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-rose-gold/30 rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
              Meet the Doctor
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-deep-brown mb-6 leading-tight">
              Arhitectul schimbării tale.
            </h2>

            <blockquote className="text-xl md:text-2xl text-soft-brown leading-relaxed mb-8 italic font-serif">
              "Cred că augmentarea mamară nu este doar despre volum, ci despre proporții
              și armonie. M-am dedicat acestei proceduri pentru a oferi pacientelor mele
              nu doar un rezultat estetic, ci o experiență de siguranță totală."
            </blockquote>

            {/* Signature */}
            <div className="mb-8">
              <p className="font-serif text-2xl text-deep-brown mb-1">Dr. Gina Wafi</p>
              <p className="text-soft-brown text-sm tracking-wide">
                Medic Primar Chirurgie Plastică și Estetică
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-4 mb-8">
              {["ISAPS", "SECPRE", "ARCE"].map((credential) => (
                <span
                  key={credential}
                  className="px-4 py-2 bg-champagne-light rounded-full text-sm font-medium text-soft-brown"
                >
                  {credential}
                </span>
              ))}
            </div>

            <Button variant="elegant" size="lg" className="group">
              Citește povestea completă
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;

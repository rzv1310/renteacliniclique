import MaterialIcon from "@/components/ui/MaterialIcon";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Echipa Rentéa Aesthetic Clinique"
          className="w-full h-full object-cover object-top -translate-y-[30px]"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content - Two columns at bottom */}
      <div className="relative container mx-auto px-4 lg:px-8 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          {/* Left - Text and Buttons */}
          <div className="animate-fade-in-up order-2 lg:order-1">
            <p className="text-body leading-relaxed mb-6 max-w-md">
              Rentéa Aesthetic Clinique - Lider în chirurgia estetică din București, supra-specializați în augmentare mamară.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/simulator-3d">
                <button className="btn-primary-rose-gold">
                  <MaterialIcon name="3d_rotation" className="text-xl" />
                  Simulator 3D
                </button>
              </a>
            </div>
          </div>

          {/* Right - Title */}
          <div className="animate-fade-in-up animation-delay-100 order-1 lg:order-2">
            <h1 className="h1-hero text-foreground lg:text-right">
              Nu facem "de toate".
              <br />
              <span className="text-gradient-gold italic">Facem sâni perfecți.</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

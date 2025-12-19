import MaterialIcon from "@/components/ui/MaterialIcon";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Femeie elegantă încrezătoare"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1 className="h1-hero text-foreground mb-6 animate-fade-in-up">
            Nu facem "de toate".{" "}
            <br />
            <span className="text-gradient-gold">Facem sâni perfecți.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-body leading-relaxed mb-10 max-w-xl animate-fade-in-up animation-delay-100">
            Singura clinică din București dedicată exclusiv augmentării mamare.{" "}
            <br />
            Specializare 100% pentru siguranța și feminitatea ta.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
            <a href="/galerie">
              <button className="btn-primary-rose-gold">
                <MaterialIcon name="grid_view" className="text-xl" />
                Vezi Galeria Foto
              </button>
            </a>
            <a href="/simulator-3d">
              <button className="btn-secondary-rose-gold">
                <MaterialIcon name="3d_rotation" className="text-xl" />
                Solicită Simulare 3D
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

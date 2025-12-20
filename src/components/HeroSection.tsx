import MaterialIcon from "@/components/ui/MaterialIcon";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Femeie elegantă încrezătoare"
          className="w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/50" />
      </div>

      {/* Content - Centered */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Main Title */}
          <h1 className="h1-hero text-foreground mb-6 animate-fade-in-up">
            Nu facem "de toate".
            <br />
            <span className="text-gradient-gold italic">Facem sâni perfecți.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-body leading-relaxed mb-10 max-w-xl mx-auto animate-fade-in-up animation-delay-100">
            Singura clinică din București dedicată exclusiv augmentării mamare.
            <br />
            Specializare 100% pentru siguranța și feminitatea ta.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-200">
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

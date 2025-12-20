import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "@/components/ui/MaterialIcon";

const Footer = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      
      const rect = parallaxRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        setParallaxOffset(scrollProgress * 50 - 25);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="bg-card text-foreground border-t border-border">
      {/* CTA Section */}
      <div ref={parallaxRef} className="relative overflow-hidden silk-shimmer">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/30 via-transparent to-transparent transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-rose-gold/5 via-transparent to-transparent transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
        />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)]" />
        
        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-28 relative z-10">
          <div 
            className="max-w-3xl mx-auto text-center flex flex-col items-center transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${parallaxOffset * -0.2}px)` }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-white">
              O investiție în încrederea ta pe care o vei purta în fiecare zi.
            </h2>
            <p className="text-zinc-400 text-lg mb-10">
              Primul pas către schimbare începe cu o simplă conversație.
            </p>
            <button className="btn-primary-rose-gold group mx-auto">
              Programează o Consultație
              <MaterialIcon name="arrow_forward" className="text-xl group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-zinc-500 mt-5">
              Cost consultație: 250 RON (deductibil din operație)
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-display text-2xl font-semibold text-foreground">Rentéa</span>
              <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                Aesthetic Clinique
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Singura clinică din București dedicată exclusiv augmentării mamare.
              Specializare 100%.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-rose-gold hover:text-primary-foreground transition-colors duration-300"
              >
                <MaterialIcon name="photo_camera" className="text-xl" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-rose-gold hover:text-primary-foreground transition-colors duration-300"
              >
                <MaterialIcon name="group" className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-medium text-sm uppercase tracking-wider mb-6 text-foreground">
              Linkuri Rapide
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Despre Noi", href: "/despre-noi" },
                { label: "Galerie", href: "/galerie" },
                { label: "Simulator 3D", href: "/simulator-3d" },
                { label: "Tarife", href: "/implant-mamar-pret" },
                { label: "Implant Mamar în Rate", href: "/implant-mamar-in-rate" },
                { label: "Paciente din Provincie", href: "/turism-medical-intern" },
                { label: "Ghid Recuperare", href: "/ghid-recuperare" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-rose-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans font-medium text-sm uppercase tracking-wider mb-6 text-foreground">Proceduri</h4>
            <ul className="space-y-3">
              {[
                { label: "Implant Mamar București", href: "/proceduri/implant-mamar-bucuresti" },
                { label: "Implanturi Rotunde", href: "/proceduri/implant-mamar-bucuresti/implanturi-mamare-rotunde" },
                { label: "Implanturi Anatomice", href: "/proceduri/implant-mamar-bucuresti/implanturi-mamare-anatomice" },
                { label: "Implanturi Ergonomice", href: "/proceduri/implant-mamar-bucuresti/implanturi-mamare-ergonomice" },
                { label: "Lifting Mamar", href: "/proceduri/lifting-mamar-mastopexie-ridicare-sani" },
                { label: "Revizie Implant", href: "/proceduri/schimbare-inlocuire-implant-mamar-revizie" },
                { label: "Reducție Mamară", href: "/proceduri/micsorare-sani-reductie-mamara" },
                { label: "Lipofilling Mamar", href: "/proceduri/lipofilling-mamar" },
              ].map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="text-muted-foreground hover:text-rose-gold transition-colors duration-300 text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-medium text-sm uppercase tracking-wider mb-6 text-foreground">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MaterialIcon name="location_on" className="text-xl text-rose-gold shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Str. Exemplu nr. 123
                  <br />
                  Sector 1, București
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MaterialIcon name="phone" className="text-xl text-rose-gold shrink-0" />
                <a
                  href="tel:+40721000000"
                  className="text-muted-foreground hover:text-rose-gold transition-colors text-sm"
                >
                  +40 721 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MaterialIcon name="mail" className="text-xl text-rose-gold shrink-0" />
                <a
                  href="mailto:contact@implantmamarbucuresti.ro"
                  className="text-muted-foreground hover:text-rose-gold transition-colors text-sm"
                >
                  contact@implantmamarbucuresti.ro
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-xs">
              © 2024 Rentéa Aesthetic Clinique. Toate drepturile rezervate.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
                Politica de Confidențialitate
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
                Termeni și Condiții
              </a>
            </div>
          </div>
          <p className="text-muted-foreground/50 text-xs mt-4 text-center md:text-left">
            Clinica Rentéa – Lider în chirurgie estetică București, specializați exclusiv în
            implant mamar, augmentare mamară cu silicon și ridicare sâni.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-deep-brown text-ivory">
      {/* CTA Section */}
      <div className="border-b border-ivory/10">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              O investiție în încrederea ta pe care o vei purta în fiecare zi.
            </h2>
            <p className="text-ivory/70 text-lg mb-8">
              Primul pas către schimbare începe cu o simplă conversație.
            </p>
            <Button variant="hero" size="xl" className="group">
              Programează o Consultație
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-ivory/50 mt-4">
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
              <span className="font-serif text-2xl font-semibold">Rentéa</span>
              <span className="block text-xs uppercase tracking-[0.2em] text-ivory/60 mt-1">
                Aesthetic Clinique
              </span>
            </div>
            <p className="text-ivory/70 text-sm leading-relaxed mb-6">
              Singura clinică din București dedicată exclusiv augmentării mamare.
              Specializare 100%.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-rose-gold transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-rose-gold transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-6">
              Linkuri Rapide
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Despre Noi", href: "/despre-noi" },
                { label: "Galerie", href: "/galerie" },
                { label: "Tarife", href: "/tarife-finantare" },
                { label: "Finanțare în Rate", href: "/implant-mamar-in-rate" },
                { label: "Paciente din Provincie", href: "/turism-medical-intern" },
                { label: "Ghid Recuperare", href: "/ghid-recuperare" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-ivory/70 hover:text-rose-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-6">Proceduri</h4>
            <ul className="space-y-3">
              {[
                { label: "Augmentare Mamară", href: "/proceduri/augmentare-mamara" },
                { label: "Implanturi Rotunde", href: "/proceduri/augmentare-mamara/implanturi-mamare-rotunde" },
                { label: "Implanturi Anatomice", href: "/proceduri/augmentare-mamara/implanturi-mamare-anatomice" },
                { label: "Implanturi Ergonomice", href: "/proceduri/augmentare-mamara/implanturi-mamare-ergonomice" },
                { label: "Augmentare cu Mastopexie", href: "/proceduri/augmentare-mamara-cu-mastopexie" },
                { label: "Revizie Implant", href: "/proceduri/revizie-implant-mamar" },
              ].map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="text-ivory/70 hover:text-rose-gold transition-colors duration-300 text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-gold shrink-0 mt-0.5" />
                <span className="text-ivory/70 text-sm">
                  Str. Exemplu nr. 123
                  <br />
                  Sector 1, București
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rose-gold shrink-0" />
                <a
                  href="tel:+40721000000"
                  className="text-ivory/70 hover:text-rose-gold transition-colors text-sm"
                >
                  +40 721 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-rose-gold shrink-0" />
                <a
                  href="mailto:contact@rentea.ro"
                  className="text-ivory/70 hover:text-rose-gold transition-colors text-sm"
                >
                  contact@rentea.ro
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ivory/50 text-xs">
              © 2024 Rentéa Aesthetic Clinique. Toate drepturile rezervate.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-ivory/50 hover:text-ivory text-xs transition-colors">
                Politica de Confidențialitate
              </a>
              <a href="#" className="text-ivory/50 hover:text-ivory text-xs transition-colors">
                Termeni și Condiții
              </a>
            </div>
          </div>
          <p className="text-ivory/30 text-xs mt-4 text-center md:text-left">
            Clinica Rentéa – Lider în chirurgie estetică București, specializați exclusiv în
            implant mamar, augmentare mamară cu silicon și ridicare sâni.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

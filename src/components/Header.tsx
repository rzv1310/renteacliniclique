import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const proceduriLinks = [
    { name: "Toate Procedurile", href: "/proceduri" },
    { name: "Augmentare Mamară", href: "/proceduri/augmentare-mamara" },
    { name: "— Implanturi Rotunde", href: "/proceduri/augmentare-mamara/implanturi-mamare-rotunde" },
    { name: "— Implanturi Anatomice", href: "/proceduri/augmentare-mamara/implanturi-mamare-anatomice" },
    { name: "— Implanturi Ergonomice", href: "/proceduri/augmentare-mamara/implanturi-mamare-ergonomice" },
    { name: "Mastopexie (Ridicare)", href: "/proceduri/augmentare-mamara-cu-mastopexie" },
    { name: "Revizie Implant", href: "/proceduri/revizie-implant-mamar" },
    { name: "Reducție Mamară", href: "/proceduri/micsorare-sani-reductie-mamara" },
    { name: "Lipofilling Mamar", href: "/proceduri/lipofilling-mamar" },
  ];

  const navLinks = [
    { name: "Galerie", href: "/galerie" },
    { name: "Tarife", href: "/tarife-finantare" },
    { name: "Finanțare Rate", href: "/implant-mamar-in-rate" },
    { name: "Paciente din Provincie", href: "/turism-medical-intern" },
    { name: "Ghid Recuperare", href: "/ghid-recuperare" },
    { name: "Despre Noi", href: "/despre-noi" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-deep-brown">
              Rentéa
            </span>
            <span className="hidden sm:block text-xs uppercase tracking-[0.3em] text-soft-brown font-sans">
              Aesthetic Clinique
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Proceduri Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-soft-brown hover:text-rose-gold transition-colors duration-300 tracking-wide">
                Proceduri
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-card border-border">
                {proceduriLinks.map((link, index) => (
                  <span key={link.href}>
                    {index === 1 && <DropdownMenuSeparator />}
                    {index === 5 && <DropdownMenuSeparator />}
                    <DropdownMenuItem asChild>
                      <Link
                        to={link.href}
                        className={`w-full cursor-pointer ${link.name.startsWith("—") ? "pl-6 text-muted-foreground" : ""}`}
                      >
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  </span>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-soft-brown hover:text-rose-gold transition-colors duration-300 tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+40721000000"
              className="flex items-center gap-2 text-sm text-soft-brown hover:text-rose-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+40 721 000 000</span>
            </a>
            <Button variant="hero" size="lg">
              Programează Consultația
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-deep-brown"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2 mb-1">Proceduri</p>
              {proceduriLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-base font-medium text-soft-brown hover:text-rose-gold transition-colors py-2 ${link.name.startsWith("—") ? "pl-4 text-sm" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-border my-2" />
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base font-medium text-soft-brown hover:text-rose-gold transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="hero" size="lg" className="mt-4">
                Programează Consultația
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
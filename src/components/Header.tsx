import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "@/components/ui/MaterialIcon";
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const proceduriLinks = [
    { name: "Toate Procedurile", href: "/proceduri" },
    { name: "Implant Mamar București", href: "/proceduri/implant-mamar-bucuresti" },
    { name: "— Implanturi Rotunde", href: "/proceduri/implant-mamar-bucuresti/implanturi-mamare-rotunde" },
    { name: "— Implanturi Anatomice", href: "/proceduri/implant-mamar-bucuresti/implanturi-mamare-anatomice" },
    { name: "— Implanturi Ergonomice", href: "/proceduri/implant-mamar-bucuresti/implanturi-mamare-ergonomice" },
    { name: "Mastopexie (Ridicare)", href: "/proceduri/augmentare-mamara-cu-mastopexie" },
    { name: "Revizie Implant", href: "/proceduri/revizie-implant-mamar" },
    { name: "Reducție Mamară", href: "/proceduri/micsorare-sani-reductie-mamara" },
    { name: "Lipofilling Mamar", href: "/proceduri/lipofilling-mamar" },
  ];

  const utileLinks = [
    { name: "Ghid de Recuperare", href: "/ghid-recuperare" },
    { name: "Turism Medical", href: "/turism-medical-intern" },
    { name: "Finanțare", href: "/implant-mamar-in-rate" },
    { name: "Blog", href: "/blog" },
  ];

  const navLinks = [
    { name: "Galerie", href: "/galerie" },
    { name: "Simulator 3D", href: "/simulator-3d" },
    { name: "Tarife", href: "/tarife-finantare" },
    { name: "Ghid Recuperare", href: "/ghid-recuperare" },
    { name: "Despre Noi", href: "/despre-noi" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
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
              <span className="font-display text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">
                Rentéa
              </span>
              <span className="hidden sm:block text-xs uppercase tracking-[0.3em] text-muted-foreground font-sans">
                Aesthetic Clinique
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-8">
              {/* Proceduri Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-rose-gold transition-colors duration-300 tracking-wide">
                  Proceduri
                  <MaterialIcon name="expand_more" className="text-lg" />
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
                  className="text-sm font-medium text-muted-foreground hover:text-rose-gold transition-colors duration-300 tracking-wide"
                >
                  {link.name}
                </Link>
              ))}

              {/* Utile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-rose-gold transition-colors duration-300 tracking-wide">
                  Utile
                  <MaterialIcon name="expand_more" className="text-lg" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                  {utileLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link to={link.href} className="w-full cursor-pointer">
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* CTA Button */}
            <div className="hidden xl:flex items-center">
              <a
                href="tel:+40721000000"
                className="btn-primary-rose-gold text-sm px-6 h-10 flex items-center gap-2"
              >
                Programează o Consultație
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="xl:hidden p-2 text-foreground z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MaterialIcon name={isMobileMenuOpen ? "close" : "menu"} className="text-2xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="xl:hidden fixed inset-0 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          
          {/* Menu Content */}
          <div 
            className="absolute top-20 left-4 right-4 max-h-[calc(100vh-6rem)] overflow-y-auto bg-card rounded-xl p-4 border border-border animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2 mb-1">Proceduri</p>
              {proceduriLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-base font-medium text-muted-foreground hover:text-rose-gold transition-colors py-2 ${link.name.startsWith("—") ? "pl-4 text-sm" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-border my-2" />
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2 mb-1">Utile</p>
              {utileLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-base font-medium text-muted-foreground hover:text-rose-gold transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button className="btn-primary-rose-gold mt-4">
                Programează Consultația
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

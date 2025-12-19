import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Heart, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere").max(100, "Numele este prea lung"),
  email: z.string().email("Adresa de email nu este validă"),
  phone: z.string().min(10, "Numărul de telefon trebuie să aibă cel puțin 10 cifre").regex(/^[0-9+\s()-]+$/, "Format telefon invalid"),
  package: z.string().optional(),
  message: z.string().max(1000, "Mesajul este prea lung").optional(),
});

// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const PricingPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(60);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const basePrice = 4000;

  // Scroll animation refs
  const heroRef = useScrollAnimation();
  const includedRef = useScrollAnimation();
  const packagesRef = useScrollAnimation();
  const calculatorRef = useScrollAnimation();
  const comparisonRef = useScrollAnimation();
  const faqRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const calculateMonthlyRate = (months: number) => {
    const rate = basePrice / months;
    return Math.round(rate);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    // Validate with zod
    const result = contactFormSchema.safeParse(formData);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Solicitare trimisă!",
      description: "Vă vom contacta în cel mai scurt timp posibil.",
    });
    
    setFormData({ name: "", email: "", phone: "", package: "", message: "" });
    setFormErrors({});
    setIsSubmitting(false);
  };

  const packages = [
    {
      name: "Augmentare Standard",
      subtitle: "Implanturi Rotunde",
      price: "3.XXX",
      features: [
        "Implanturi Rotunde",
        "Spitalizare 1 noapte",
        "Bustieră inclusă",
      ],
      highlight: false,
      cta: "Vreau detalii",
    },
    {
      name: "Augmentare Natural",
      subtitle: "Implanturi Ergonomice/Anatomice",
      price: "4.XXX",
      badge: "Cel mai ales",
      features: [
        "Implanturi Ergonomice",
        "Simulare 3D inclusă",
        "Kit recuperare WOW",
        "Prioritate la programare",
      ],
      highlight: true,
      cta: "Programează Consultația",
    },
    {
      name: "Augmentare + Lifting",
      subtitle: "Mastopexie",
      price: "5.XXX",
      features: [
        "Implant + Mastopexie",
        "2 Bustiere incluse",
        "Anestezie complexă",
      ],
      highlight: false,
      cta: "Vreau o evaluare",
    },
  ];

  const included = [
    { 
      icon: "workspace_premium", 
      title: "Implanturi Premium", 
      subtitle: "Garanție pe viață (Mentor/Motiva)" 
    },
    { 
      icon: "monitor_heart", 
      title: "Anestezie Generală", 
      subtitle: "Medic primar ATI dedicat" 
    },
    { 
      icon: "bed", 
      title: "Spitalizare Lux", 
      subtitle: "1 noapte cu asistență 24/7" 
    },
    { 
      icon: "apparel", 
      title: "Bustieră Medicală", 
      subtitle: "Inclusă în pachet" 
    },
    { 
      icon: "calendar_month", 
      title: "Controale 1 An", 
      subtitle: "Toate pansamentele incluse" 
    },
    { 
      icon: "healing", 
      title: "Kit Recuperare", 
      subtitle: "WOW Factor: Medicamente și creme" 
    },
  ];

  const comparisonData = [
    { service: "Consultație inițială detaliată", us: true, them: "50€-100€" },
    { service: "Bustieră Medicală Premium", us: true, them: "60€" },
    { service: "Kit Medicamente Post-operator", us: true, them: "Rețetă" },
    { service: "Controale 12 luni", us: true, them: "Variabil" },
    { service: "Costuri Ascunse", us: "ZERO", them: "Posibile", isHighlight: true },
  ];

  const faqs = [
    {
      q: "Trebuie să plătesc totul înainte?",
      a: "Se achită un avans pentru rezervarea datei operatorii, iar restul sumei se poate achita în ziua operației sau prin transfer bancar înainte de intervenție. Oferim și posibilitatea plății în rate.",
    },
    {
      q: "Dacă am nevoie de o noapte în plus de spitalizare, cât costă?",
      a: "În pachetul standard este inclusă o noapte de spitalizare, care este suficientă în 99% din cazuri. Dacă medicul consideră necesară prelungirea internării din motive medicale, aceasta nu va implica costuri suplimentare majore neanunțate, dar situațiile sunt extrem de rare.",
    },
    {
      q: "Cât costă înlocuirea implanturilor în viitor?",
      a: "Implanturile Mentor/Motiva au garanție pe viață pentru ruptură. Dacă doriți înlocuirea lor din motive estetice (schimbare mărime) peste 10-15 ani, veți achita doar costurile operaționale ale momentului respectiv, nu prețul întreg al unui pachet nou.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section 
          ref={heroRef.ref as React.RefObject<HTMLElement>}
          className={`relative py-16 md:py-24 overflow-hidden transition-all duration-700 ${
            heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-rose-gold/10 via-background to-background" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                <span className="text-gradient-gold">Transparență Totală.</span>
                <br />
                <span className="text-gradient-gold">Fără Costuri Ascunse.</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto px-4">
                La Rentéa, prețul comunicat este prețul final. Pachetul nostru 
                All-Inclusive acoperă totul, de la prima consultație până la vindecarea completă.
              </p>
              <Button 
                variant="hero" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => document.getElementById('preturi')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Vezi Pachetele
              </Button>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section 
          ref={includedRef.ref as React.RefObject<HTMLElement>}
          className={`py-16 md:py-20 bg-card transition-all duration-700 delay-100 ${
            includedRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-4">
                Ce plătești, de fapt?
              </h2>
              <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4">
                Nu plătești doar intervenția. Plătești liniștea că ești pe mâinile unui specialist dedicat 100% sânilor.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {included.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 sm:gap-4 bg-background rounded-xl p-4 sm:p-5 border border-border hover:border-rose-gold/30 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-gold/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-rose-gold text-lg sm:text-xl">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1 text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section 
          id="preturi" 
          ref={packagesRef.ref as React.RefObject<HTMLElement>}
          className={`py-16 md:py-20 bg-background transition-all duration-700 ${
            packagesRef.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-8 md:mb-12">
              Pachetele de Servicii
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto items-start">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-500 ${
                    pkg.highlight
                      ? "bg-gradient-to-b from-rose-gold/20 to-rose-gold/5 border-2 border-rose-gold shadow-gold md:scale-105 md:-my-4"
                      : "bg-card border border-border hover:border-rose-gold/30"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-rose-gold text-primary-foreground text-xs font-medium rounded-full whitespace-nowrap">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className={`font-serif text-lg sm:text-xl font-semibold mb-1 ${pkg.highlight ? 'text-rose-gold' : 'text-foreground'}`}>
                      {pkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{pkg.subtitle}</p>
                  </div>

                  <div className="text-center mb-4 sm:mb-6">
                    <span className={`font-serif text-3xl sm:text-4xl font-bold ${pkg.highlight ? 'text-rose-gold' : 'text-foreground'}`}>
                      {pkg.price}
                    </span>
                    <span className="text-muted-foreground text-base sm:text-lg ml-1">€</span>
                    <span className="text-muted-foreground text-xs sm:text-sm block">/ operație</span>
                  </div>

                  <Button
                    variant={pkg.highlight ? "hero" : "elegant"}
                    size="lg"
                    className="w-full mb-4 sm:mb-6"
                  >
                    {pkg.cta}
                  </Button>

                  <ul className="space-y-2 sm:space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        {pkg.highlight ? (
                          <div className="w-5 h-5 rounded-full bg-rose-gold/20 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-rose-gold" />
                          </div>
                        ) : (
                          <Check className="w-4 h-4 text-rose-gold shrink-0" />
                        )}
                        <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financing Calculator Section */}
        <section 
          ref={calculatorRef.ref as React.RefObject<HTMLElement>}
          className={`py-16 md:py-20 bg-card transition-all duration-700 ${
            calculatorRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center bg-background rounded-2xl p-6 sm:p-8 border border-border">
                {/* Left side - Title and selector */}
                <div className="text-center md:text-left">
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-2">
                    Frumusețea este accesibilă.
                  </h2>
                  <p className="font-serif text-lg sm:text-xl text-rose-gold italic mb-6 md:mb-8">
                    Plătește în rate.
                  </p>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                    Selectează perioada de finanțare dorită:
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {[12, 24, 60].map((months) => (
                      <button
                        key={months}
                        onClick={() => setSelectedPeriod(months)}
                        className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                          selectedPeriod === months
                            ? "bg-rose-gold text-primary-foreground shadow-gold"
                            : "bg-card text-muted-foreground hover:bg-muted border border-border"
                        }`}
                      >
                        {months} luni
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right side - Rate display */}
                <div className="text-center md:text-right mt-6 md:mt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                    Estimare Rată
                  </p>
                  <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-rose-gold mb-1">
                    {calculateMonthlyRate(selectedPeriod)}€
                    <span className="text-lg sm:text-xl font-normal text-muted-foreground ml-2">/ lună</span>
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-4 md:mb-6">
                    Calcul estimativ pentru suma de {basePrice}€ pe {selectedPeriod} de luni prin TBI Bank.
                  </p>
                  
                  <Button variant="elegant" size="lg" className="uppercase tracking-wider w-full md:w-auto text-xs sm:text-sm">
                    Aplică pentru finanțare
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table / Cards */}
        <section 
          ref={comparisonRef.ref as React.RefObject<HTMLElement>}
          className={`py-16 md:py-20 bg-background transition-all duration-700 ${
            comparisonRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-8 md:mb-12">
                De ce prețul nostru este final?
              </h2>

              {/* Mobile: Card layout */}
              <div className="md:hidden space-y-3">
                {comparisonData.map((row, index) => (
                  <div 
                    key={index} 
                    className={`bg-card rounded-xl border p-4 ${row.isHighlight ? 'border-rose-gold/50 bg-rose-gold/5' : 'border-border'}`}
                  >
                    <p className={`font-medium mb-3 text-sm ${row.isHighlight ? 'text-rose-gold' : 'text-foreground'}`}>
                      {row.service}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Rentéa:</span>
                        {row.us === true ? (
                          <div className="w-6 h-6 rounded-full bg-rose-gold/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-rose-gold" />
                          </div>
                        ) : (
                          <span className="text-rose-gold font-bold text-sm">{row.us}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Alte clinici:</span>
                        {row.them === "Posibile" ? (
                          <span className="text-muted-foreground text-sm">{row.them}</span>
                        ) : (
                          <div className="flex items-center gap-1">
                            <X className="w-3 h-3 text-destructive" />
                            <span className="text-muted-foreground text-xs">{row.them}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: Table layout */}
              <div className="hidden md:block bg-card rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Serviciu / Cost
                      </th>
                      <th className="text-center p-4">
                        <span className="inline-block px-4 py-1.5 bg-rose-gold/20 text-rose-gold text-sm font-medium rounded-full">
                          Rentéa
                        </span>
                      </th>
                      <th className="text-center p-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Alte Clinici
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {comparisonData.map((row, index) => (
                      <tr key={index} className={row.isHighlight ? 'bg-rose-gold/5' : ''}>
                        <td className={`p-4 ${row.isHighlight ? 'text-rose-gold font-medium' : 'text-foreground'}`}>
                          {row.service}
                        </td>
                        <td className="p-4 text-center">
                          {row.us === true ? (
                            <div className="w-8 h-8 rounded-full bg-rose-gold/20 flex items-center justify-center mx-auto">
                              <Check className="w-4 h-4 text-rose-gold" />
                            </div>
                          ) : (
                            <span className="text-rose-gold font-bold">{row.us}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {row.them === "Posibile" ? (
                            <span className="text-muted-foreground">{row.them}</span>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <X className="w-4 h-4 text-destructive" />
                              <span className="text-muted-foreground text-sm">{row.them}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section 
          ref={faqRef.ref as React.RefObject<HTMLElement>}
          className={`py-16 md:py-20 bg-card transition-all duration-700 ${
            faqRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-8 md:mb-12">
                Întrebări Frecvente
              </h2>

              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-background rounded-xl border border-border px-4 sm:px-6 data-[state=open]:border-rose-gold/30"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-rose-gold hover:no-underline py-4 sm:py-5 text-sm sm:text-base">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 sm:pb-5 text-sm">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section 
          ref={contactRef.ref as React.RefObject<HTMLElement>}
          className={`py-16 md:py-24 bg-background relative overflow-hidden transition-all duration-700 ${
            contactRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-rose-gold/5 to-transparent" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8 md:mb-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-gold/20 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-rose-gold" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">
                  Solicită Detalii
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground px-4">
                  Completează formularul și te vom contacta pentru a-ți oferi toate detaliile despre pachetul dorit.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="bg-card rounded-2xl p-6 sm:p-8 border border-border space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nume complet *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Numele tău"
                      className={`bg-background border-border focus:border-rose-gold ${formErrors.name ? 'border-destructive' : ''}`}
                    />
                    {formErrors.name && (
                      <p className="text-destructive text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Telefon *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="07XX XXX XXX"
                      className={`bg-background border-border focus:border-rose-gold ${formErrors.phone ? 'border-destructive' : ''}`}
                    />
                    {formErrors.phone && (
                      <p className="text-destructive text-xs mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@exemplu.ro"
                    className={`bg-background border-border focus:border-rose-gold ${formErrors.email ? 'border-destructive' : ''}`}
                  />
                  {formErrors.email && (
                    <p className="text-destructive text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="package" className="block text-sm font-medium text-foreground mb-2">
                    Pachet de interes
                  </label>
                  <Select
                    value={formData.package}
                    onValueChange={(value) => setFormData({ ...formData, package: value })}
                  >
                    <SelectTrigger className="bg-background border-border focus:border-rose-gold">
                      <SelectValue placeholder="Selectează un pachet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Augmentare Standard - 3.XXX €</SelectItem>
                      <SelectItem value="natural">Augmentare Natural - 4.XXX €</SelectItem>
                      <SelectItem value="lifting">Augmentare + Lifting - 5.XXX €</SelectItem>
                      <SelectItem value="altele">Altele / Nu sunt sigură</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mesaj (opțional)
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Întrebări sau detalii suplimentare..."
                    rows={4}
                    className="bg-background border-border focus:border-rose-gold resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Se trimite..." : "Solicită Detalii"}
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Cost consultație: 250 RON - se deduce integral din prețul operației
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;

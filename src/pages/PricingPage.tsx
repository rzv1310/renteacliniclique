import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Heart, Send } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroPricing from "@/assets/heroes/hero-pricing.jpg";
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
      features: ["Implanturi Rotunde", "Spitalizare 1 noapte", "Bustieră inclusă"],
      highlight: false,
      cta: "Vreau detalii",
    },
    {
      name: "Augmentare Natural",
      subtitle: "Implanturi Ergonomice/Anatomice",
      price: "4.XXX",
      badge: "Cel mai ales",
      features: ["Implanturi Ergonomice", "Simulare 3D inclusă", "Kit recuperare WOW", "Prioritate la programare"],
      highlight: true,
      cta: "Programează Consultația",
    },
    {
      name: "Augmentare + Lifting",
      subtitle: "Mastopexie",
      price: "5.XXX",
      features: ["Implant + Mastopexie", "2 Bustiere incluse", "Anestezie complexă"],
      highlight: false,
      cta: "Vreau o evaluare",
    },
  ];

  const included = [
    { icon: "workspace_premium", title: "Implanturi Premium", subtitle: "Garanție pe viață (Mentor/Motiva)" },
    { icon: "monitor_heart", title: "Anestezie Generală", subtitle: "Medic primar ATI dedicat" },
    { icon: "bed", title: "Spitalizare Lux", subtitle: "1 noapte cu asistență 24/7" },
    { icon: "apparel", title: "Bustieră Medicală", subtitle: "Inclusă în pachet" },
    { icon: "calendar_month", title: "Controale 1 An", subtitle: "Toate pansamentele incluse" },
    { icon: "healing", title: "Kit Recuperare", subtitle: "WOW Factor: Medicamente și creme" },
  ];

  const comparisonData = [
    { service: "Consultație inițială detaliată", us: true, them: "50€-100€" },
    { service: "Bustieră Medicală Premium", us: true, them: "60€" },
    { service: "Kit Medicamente Post-operator", us: true, them: "Rețetă" },
    { service: "Controale 12 luni", us: true, them: "Variabil" },
    { service: "Costuri Ascunse", us: "ZERO", them: "Posibile", isHighlight: true },
  ];

  const faqs = [
    { q: "Trebuie să plătesc totul înainte?", a: "Se achită un avans pentru rezervarea datei operatorii, iar restul sumei se poate achita în ziua operației sau prin transfer bancar înainte de intervenție." },
    { q: "Dacă am nevoie de o noapte în plus de spitalizare, cât costă?", a: "În pachetul standard este inclusă o noapte de spitalizare, care este suficientă în 99% din cazuri." },
    { q: "Cât costă înlocuirea implanturilor în viitor?", a: "Implanturile Mentor/Motiva au garanție pe viață pentru ruptură." },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroPricing} alt="Tarife și Prețuri" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            <span className="text-gradient-gold">Transparență Totală.</span>
            <br />
            <span className="text-gradient-gold">Fără Costuri Ascunse.</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            La Rentéa, prețul comunicat este prețul final. Pachetul nostru All-Inclusive acoperă totul.
          </p>
          <Button variant="hero" size="lg" onClick={() => document.getElementById('preturi')?.scrollIntoView({ behavior: 'smooth' })}>
            Vezi Pachetele
          </Button>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* What's Included Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-4">Ce plătești, de fapt?</h2>
            <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
              Nu plătești doar intervenția. Plătești liniștea că ești pe mâinile unui specialist dedicat 100% sânilor.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {included.map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-background rounded-xl p-5 border border-border hover:border-rose-gold/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-rose-gold text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="preturi" ref={packagesRef.ref as React.RefObject<HTMLElement>} className={`py-16 md:py-20 bg-background transition-all duration-700 ${packagesRef.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-8 md:mb-12">Pachetele de Servicii</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto items-start">
            {packages.map((pkg, index) => (
              <div key={pkg.name} className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-500 ${pkg.highlight ? "bg-gradient-to-b from-rose-gold/20 to-rose-gold/5 border-2 border-rose-gold shadow-gold md:scale-105 md:-my-4" : "bg-card border border-border hover:border-rose-gold/30"}`} style={{ transitionDelay: `${index * 150}ms` }}>
                {pkg.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-rose-gold text-primary-foreground text-xs font-medium rounded-full whitespace-nowrap">{pkg.badge}</div>}
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className={`font-serif text-lg sm:text-xl font-semibold mb-1 ${pkg.highlight ? 'text-rose-gold' : 'text-foreground'}`}>{pkg.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{pkg.subtitle}</p>
                </div>
                <div className="text-center mb-4 sm:mb-6">
                  <span className={`font-serif text-3xl sm:text-4xl font-bold ${pkg.highlight ? 'text-rose-gold' : 'text-foreground'}`}>{pkg.price}</span>
                  <span className="text-muted-foreground text-base sm:text-lg ml-1">€</span>
                </div>
                <Button variant={pkg.highlight ? "hero" : "elegant"} size="lg" className="w-full mb-4 sm:mb-6">{pkg.cta}</Button>
                <ul className="space-y-2 sm:space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-rose-gold shrink-0" />
                      <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section ref={calculatorRef.ref as React.RefObject<HTMLElement>} className={`py-16 md:py-20 bg-card transition-all duration-700 ${calculatorRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center bg-background rounded-2xl p-6 sm:p-8 border border-border">
              <div className="text-center md:text-left">
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-2">Frumusețea este accesibilă.</h2>
                <p className="font-serif text-lg sm:text-xl text-rose-gold italic mb-6">Plătește în rate.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {[12, 24, 60].map((months) => (
                    <button key={months} onClick={() => setSelectedPeriod(months)} className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${selectedPeriod === months ? "bg-rose-gold text-primary-foreground" : "bg-card text-muted-foreground border border-border"}`}>
                      {months} luni
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-center md:text-right mt-6 md:mt-0">
                <p className="font-serif text-4xl sm:text-5xl font-bold text-rose-gold mb-1">{calculateMonthlyRate(selectedPeriod)}€<span className="text-lg font-normal text-muted-foreground ml-2">/ lună</span></p>
                <Button variant="elegant" size="lg" className="mt-4">Aplică pentru finanțare</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef.ref as React.RefObject<HTMLElement>} className={`py-16 md:py-20 bg-background transition-all duration-700 ${faqRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl text-center text-foreground mb-8">Întrebări Frecvente</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-xl border border-border px-4 sm:px-6">
                  <AccordionTrigger className="text-left text-foreground hover:text-rose-gold py-4 text-sm sm:text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-sm">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={contactRef.ref as React.RefObject<HTMLElement>} className={`py-16 md:py-24 bg-card transition-all duration-700 ${contactRef.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-rose-gold/20 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-7 h-7 text-rose-gold" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">Solicită Detalii</h2>
            </div>
            <form onSubmit={handleFormSubmit} className="bg-background rounded-2xl p-6 sm:p-8 border border-border space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nume *</label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={formErrors.name ? 'border-destructive' : ''} />
                  {formErrors.name && <p className="text-destructive text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Telefon *</label>
                  <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={formErrors.phone ? 'border-destructive' : ''} />
                  {formErrors.phone && <p className="text-destructive text-xs mt-1">{formErrors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={formErrors.email ? 'border-destructive' : ''} />
                {formErrors.email && <p className="text-destructive text-xs mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Pachet</label>
                <Select value={formData.package} onValueChange={(value) => setFormData({ ...formData, package: value })}>
                  <SelectTrigger><SelectValue placeholder="Selectează" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard - 3.XXX €</SelectItem>
                    <SelectItem value="natural">Natural - 4.XXX €</SelectItem>
                    <SelectItem value="lifting">Lifting - 5.XXX €</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mesaj</label>
                <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Se trimite..." : "Solicită Detalii"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PricingPage;

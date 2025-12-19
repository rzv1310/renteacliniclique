import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronDown, Heart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(60);
  const basePrice = 4000;

  const calculateMonthlyRate = (months: number) => {
    const rate = basePrice / months;
    return Math.round(rate);
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
        <section className="relative py-24 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-rose-gold/10 via-background to-background" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 animate-fade-in-up">
                <span className="text-gradient-gold">Transparență Totală.</span>
                <br />
                <span className="text-gradient-gold">Fără Costuri Ascunse.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 animate-fade-in-up animation-delay-100 max-w-2xl mx-auto">
                La Rentéa, prețul comunicat este prețul final. Pachetul nostru 
                All-Inclusive acoperă totul, de la prima consultație până la vindecarea completă.
              </p>
              <Button 
                variant="hero" 
                size="xl" 
                className="animate-fade-in-up animation-delay-200"
                onClick={() => document.getElementById('preturi')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Vezi Pachetele
              </Button>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground mb-4">
                Ce plătești, de fapt?
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Nu plătești doar intervenția. Plătești liniștea că ești pe mâinile unui specialist dedicat 100% sânilor.
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {included.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-background rounded-xl p-5 border border-border hover:border-rose-gold/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-rose-gold text-xl">
                        {item.icon}
                      </span>
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
        <section id="preturi" className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground mb-12">
              Pachetele de Servicii
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-2xl p-6 transition-all duration-500 ${
                    pkg.highlight
                      ? "bg-gradient-to-b from-rose-gold/20 to-rose-gold/5 border-2 border-rose-gold md:scale-105 md:-my-4 shadow-gold"
                      : "bg-card border border-border hover:border-rose-gold/30"
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-rose-gold text-primary-foreground text-xs font-medium rounded-full whitespace-nowrap">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className={`font-serif text-xl font-semibold mb-1 ${pkg.highlight ? 'text-rose-gold' : 'text-foreground'}`}>
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{pkg.subtitle}</p>
                  </div>

                  <div className="text-center mb-6">
                    <span className={`font-serif text-4xl font-bold ${pkg.highlight ? 'text-rose-gold' : 'text-foreground'}`}>
                      {pkg.price}
                    </span>
                    <span className="text-muted-foreground text-lg ml-1">€</span>
                    <span className="text-muted-foreground text-sm block">/ operație</span>
                  </div>

                  <Button
                    variant={pkg.highlight ? "hero" : "elegant"}
                    size="lg"
                    className="w-full mb-6"
                  >
                    {pkg.cta}
                  </Button>

                  <ul className="space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        {pkg.highlight ? (
                          <div className="w-5 h-5 rounded-full bg-rose-gold/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-rose-gold" />
                          </div>
                        ) : (
                          <Check className="w-4 h-4 text-rose-gold shrink-0" />
                        )}
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financing Calculator Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center bg-background rounded-2xl p-8 border border-border">
                {/* Left side - Title and selector */}
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                    Frumusețea este accesibilă.
                  </h2>
                  <p className="font-serif text-xl text-rose-gold italic mb-8">
                    Plătește în rate.
                  </p>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Selectează perioada de finanțare dorită:
                  </p>
                  
                  <div className="flex gap-2">
                    {[12, 24, 60].map((months) => (
                      <button
                        key={months}
                        onClick={() => setSelectedPeriod(months)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
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
                <div className="text-center md:text-right">
                  <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                    Estimare Rată
                  </p>
                  <p className="font-serif text-5xl md:text-6xl font-bold text-rose-gold mb-1">
                    {calculateMonthlyRate(selectedPeriod)}€
                    <span className="text-xl font-normal text-muted-foreground ml-2">/ lună</span>
                  </p>
                  <p className="text-xs text-muted-foreground mb-6">
                    Calcul estimativ pentru suma de {basePrice}€ pe {selectedPeriod} de luni prin TBI Bank.
                  </p>
                  
                  <Button variant="elegant" size="lg" className="uppercase tracking-wider">
                    Aplică pentru finanțare
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground mb-12">
                De ce prețul nostru este final?
              </h2>

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
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
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground mb-12">
                Întrebări Frecvente
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-background rounded-xl border border-border px-6 data-[state=open]:border-rose-gold/30"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-rose-gold hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-gold/5 to-transparent" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-rose-gold/20 flex items-center justify-center mx-auto mb-8">
                <Heart className="w-8 h-8 text-rose-gold" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                O investiție în încrederea ta pe care o vei purta în fiecare zi.
              </h2>
              
              <Button variant="hero" size="xl" asChild className="group">
                <Link to="/contact">
                  Programează o Consultație
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <p className="text-sm text-muted-foreground mt-6">
                Cost: 250 RON - se deduce integral din prețul operației
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Material Symbols font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
        rel="stylesheet"
      />
    </div>
  );
};

export default PricingPage;

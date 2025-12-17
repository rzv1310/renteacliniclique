import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Shield, Heart, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import abstractImage from "@/assets/abstract-feminine.jpg";

const PricingPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(24);
  const basePrice = 4000;

  const calculateMonthlyRate = (months: number) => {
    const rate = basePrice / months;
    return Math.round(rate);
  };

  const packages = [
    {
      name: "Augmentare Standard",
      subtitle: "Pentru cine e:",
      description: "Volum vizibil, decolteu plin.",
      price: "3.500",
      features: [
        "Implanturi Rotunde Premium",
        "Anestezie generală",
        "1 noapte spitalizare",
        "Bustiera medicală inclusă",
        "Controale post-operatorii 1 an",
      ],
      highlight: false,
    },
    {
      name: "Augmentare Natural",
      subtitle: "Pentru cine e:",
      description: "Aspect 100% natural, imită forma sânului.",
      price: "4.200",
      badge: "Cel mai ales",
      features: [
        "Implanturi Ergonomice Motiva",
        "Simulare 3D Gratuită",
        "Anestezie generală premium",
        "1 noapte spitalizare de lux",
        "Kit de recuperare acasă",
        "Controale nelimitate 1 an",
      ],
      highlight: true,
    },
    {
      name: "Augmentare + Lifting",
      subtitle: "Pentru cine e:",
      description: "Sâni lăsați care necesită volum și ridicare.",
      price: "5.500",
      features: [
        "Implanturi Premium + Mastopexie",
        "Simulare 3D inclusă",
        "Anestezie generală premium",
        "2 nopți spitalizare",
        "2 bustiere medicale",
        "Controale nelimitate 1 an",
      ],
      highlight: false,
    },
  ];

  const included = [
    { icon: Shield, text: "Implanturi Premium (Mentor/Motiva) cu garanție pe viață" },
    { icon: Heart, text: "Anestezie generală cu medic primar ATI dedicat" },
    { icon: Sparkles, text: "Spitalizare de lux cu asistență 24/7" },
    { icon: Check, text: "Bustiera medicală post-operatorie" },
    { icon: Check, text: "Toate controalele și pansamentele (1 an)" },
    { icon: Check, text: "Kit de recuperare acasă complet" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={abstractImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block animate-fade-in-up">
                Investiție & Tarife
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-deep-brown mb-6 animate-fade-in-up animation-delay-100">
                Transparență Totală.
                <br />
                <span className="text-gradient-gold">Fără Costuri Ascunse.</span>
              </h1>
              <p className="text-lg text-soft-brown leading-relaxed animate-fade-in-up animation-delay-200">
                La Rentéa, prețul comunicat este prețul final. Pachetul nostru All-Inclusive
                acoperă totul, de la prima consultație până la vindecarea completă.
              </p>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 bg-champagne-light/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl text-center text-deep-brown mb-4">
                Ce plătești, de fapt?
              </h2>
              <p className="text-center text-soft-brown mb-10">
                Nu plătești doar intervenția. Plătești liniștea că ești pe mâinile unui specialist dedicat 100% sânilor.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {included.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-soft"
                  >
                    <div className="w-10 h-10 rounded-full bg-champagne-light flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-rose-gold" />
                    </div>
                    <span className="text-sm text-deep-brown">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section id="preturi" className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-2xl p-8 transition-all duration-500 ${
                    pkg.highlight
                      ? "bg-gradient-to-br from-rose-gold/10 to-champagne/20 border-2 border-rose-gold shadow-gold scale-105"
                      : "bg-card border border-border shadow-soft hover:shadow-elegant hover:-translate-y-2"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-rose-gold text-primary-foreground text-xs font-medium rounded-full">
                      {pkg.badge}
                    </div>
                  )}

                  <h3 className="font-serif text-2xl font-semibold text-deep-brown mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-rose-gold mb-1">{pkg.subtitle}</p>
                  <p className="text-soft-brown text-sm mb-6">{pkg.description}</p>

                  <div className="mb-6">
                    <span className="font-serif text-4xl font-semibold text-deep-brown">
                      {pkg.price}
                    </span>
                    <span className="text-soft-brown text-lg ml-1">€</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-rose-gold shrink-0 mt-0.5" />
                        <span className="text-sm text-soft-brown">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={pkg.highlight ? "hero" : "elegant"}
                    size="lg"
                    className="w-full"
                  >
                    {pkg.highlight ? "Programează Consultația" : "Vreau detalii"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20 bg-gradient-soft">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
                Finanțare
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-deep-brown mb-4">
                Frumusețea este accesibilă.
              </h2>
              <p className="text-soft-brown mb-10">Plătește în rate fără dobândă.</p>

              {/* Calculator */}
              <div className="bg-card rounded-2xl p-8 shadow-elegant">
                <p className="text-sm text-soft-brown mb-4">Selectează perioada de plată:</p>
                
                <div className="flex justify-center gap-4 mb-8">
                  {[12, 24, 36, 60].map((months) => (
                    <button
                      key={months}
                      onClick={() => setSelectedPeriod(months)}
                      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedPeriod === months
                          ? "bg-rose-gold text-primary-foreground shadow-gold"
                          : "bg-champagne-light text-soft-brown hover:bg-champagne"
                      }`}
                    >
                      {months} luni
                    </button>
                  ))}
                </div>

                <div className="bg-champagne-light rounded-xl p-6">
                  <p className="text-soft-brown text-sm mb-2">Rata lunară estimată:</p>
                  <p className="font-serif text-5xl font-semibold text-deep-brown">
                    {calculateMonthlyRate(selectedPeriod)}€
                    <span className="text-lg text-soft-brown font-sans font-normal ml-2">/ lună</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    *Calculat pentru un pachet de {basePrice}€. Rata finală poate varia.
                  </p>
                </div>

                <Button variant="hero" size="xl" className="mt-8 group">
                  Aplică pentru finanțare
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl text-center text-deep-brown mb-10">
                De ce prețul nostru este final?
              </h2>

              <div className="bg-card rounded-2xl shadow-elegant overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-champagne-light">
                      <th className="text-left p-4 font-medium text-deep-brown">Serviciu</th>
                      <th className="text-center p-4 font-medium text-rose-gold">Rentéa</th>
                      <th className="text-center p-4 font-medium text-soft-brown">Alții</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { service: "Consultația inițială", us: "Inclusă", them: "100-300€" },
                      { service: "Analize pre-operatorii", us: "Incluse", them: "200-400€" },
                      { service: "Bustiera medicală", us: "Inclusă", them: "150-300€" },
                      { service: "Controale post-op", us: "Nelimitate 1 an", them: "50€/vizită" },
                      { service: "Kit recuperare acasă", us: "Inclus", them: "Nu e oferit" },
                    ].map((row) => (
                      <tr key={row.service}>
                        <td className="p-4 text-soft-brown">{row.service}</td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1 text-rose-gold font-medium">
                            <Check className="w-4 h-4" />
                            {row.us}
                          </span>
                        </td>
                        <td className="p-4 text-center text-muted-foreground">{row.them}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-champagne-light/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl text-center text-deep-brown mb-10">
                Întrebări frecvente despre preț
              </h2>

              <div className="space-y-4">
                {[
                  {
                    q: "Trebuie să plătesc totul înainte?",
                    a: "Doar un avans pentru rezervarea datei, restul în ziua operației sau prin transfer bancar.",
                  },
                  {
                    q: "Dacă am nevoie de o noapte în plus de spitalizare?",
                    a: "Siguranța ta e prioritară. Dacă medicul decide că mai trebuie să stai o noapte, este suportat de noi.",
                  },
                  {
                    q: "Cât costă înlocuirea implanturilor în viitor?",
                    a: "Pacientele noastre beneficiază de tarife preferențiale pentru viitoare intervenții.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 shadow-soft">
                    <h3 className="font-medium text-deep-brown mb-2">{faq.q}</h3>
                    <p className="text-soft-brown text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;

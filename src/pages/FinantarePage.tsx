import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, CreditCard, CheckCircle, Phone, FileText, Clock, Shield, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const FinantarePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(24);
  const totalPrice = 4500; // EUR

  const calculateMonthlyRate = (months: number) => {
    const interestRate = 0.089; // 8.9% annual
    const monthlyRate = interestRate / 12;
    const rate = (totalPrice * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(rate);
  };

  const periods = [12, 18, 24, 36, 48];

  const partners = [
    {
      name: "TBI Credit",
      logo: "TBI",
      features: ["Aprobare în 15 minute", "Fără avans", "Dobândă fixă"],
      highlight: "Cel mai popular"
    },
    {
      name: "BRD Finance",
      logo: "BRD",
      features: ["Rate de la 6 luni", "Perioadă de grație", "Online 100%"],
      highlight: null
    },
    {
      name: "Alpha Bank",
      logo: "Alpha",
      features: ["Clienți existenți", "Dobândă preferențială", "Fără comisioane"],
      highlight: null
    }
  ];

  const steps = [
    {
      icon: FileText,
      title: "1. Consultație & Deviz",
      description: "Primești un deviz exact cu costul total al intervenției dorite."
    },
    {
      icon: CreditCard,
      title: "2. Alege Finanțarea",
      description: "Selectezi partenerul și perioada de rambursare care ți se potrivește."
    },
    {
      icon: Clock,
      title: "3. Aprobare Rapidă",
      description: "Aplicația se completează în clinică, aprobare în 15-30 minute."
    },
    {
      icon: CheckCircle,
      title: "4. Programare",
      description: "După aprobare, programăm intervenția la data convenabilă pentru tine."
    }
  ];

  const faqs = [
    {
      question: "Ce documente am nevoie?",
      answer: "Carte de identitate validă, dovada veniturilor (fluturaș de salariu sau extras de cont pe ultimele 3 luni) și un extras de cont bancar."
    },
    {
      question: "Pot plăti anticipat?",
      answer: "Da, toate variantele de finanțare permit rambursarea anticipată fără penalizări."
    },
    {
      question: "Ce se întâmplă dacă nu sunt aprobată?",
      answer: "Îți oferim alternative: avans mai mare, co-debitor sau alte instituții partenere cu criterii diferite."
    },
    {
      question: "Trebuie să am avans?",
      answer: "Nu este obligatoriu. Majoritatea partenerilor oferă finanțare 100% fără avans."
    }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-blush/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-rose-gold/10 text-rose-gold rounded-full text-sm font-medium mb-6">
              Finanțare Flexibilă
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
              Implant Mamar <span className="text-rose-gold">în Rate</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
              Rate lunare accesibile de la <span className="text-rose-gold font-semibold">{calculateMonthlyRate(48)}€/lună</span>
            </p>
            <p className="text-muted-foreground mb-8">
              Aprobare rapidă în 15 minute • Fără avans • Dobândă fixă
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-rose-gold hover:bg-rose-gold/90 text-white" asChild>
                <Link to="/contact">Solicită Finanțare</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+40721234567">
                  <Phone className="w-4 h-4 mr-2" />
                  Consultanță Gratuită
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                Calculator Rate Lunare
              </h2>
              <p className="text-muted-foreground">
                Estimează rata lunară în funcție de perioada de rambursare
              </p>
            </div>

            <Card className="border-rose-gold/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-8">
                  <Calculator className="w-8 h-8 text-rose-gold mr-3" />
                  <span className="text-2xl font-light">Pachet Standard: <span className="text-rose-gold font-medium">{totalPrice.toLocaleString()}€</span></span>
                </div>

                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-4 text-center">Selectează perioada de rambursare:</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {periods.map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-6 py-3 rounded-lg border transition-all ${
                          selectedPeriod === period
                            ? "bg-rose-gold text-white border-rose-gold"
                            : "border-border hover:border-rose-gold/50"
                        }`}
                      >
                        {period} luni
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blush/30 rounded-xl p-8 text-center">
                  <p className="text-muted-foreground mb-2">Rata lunară estimată</p>
                  <p className="text-5xl font-light text-rose-gold mb-2">
                    {calculateMonthlyRate(selectedPeriod)}€
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPeriod} rate lunare • DAE ~9.8%
                  </p>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  * Calculul este orientativ. Rata finală depinde de scorul de credit și condițiile partenerului financiar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-24 bg-blush/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Parteneri de Finanțare
            </h2>
            <p className="text-muted-foreground">
              Lucrăm cu instituții financiare de încredere
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <Card key={index} className={`border-border/50 relative ${partner.highlight ? 'border-rose-gold/50' : ''}`}>
                {partner.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-rose-gold text-white text-xs px-3 py-1 rounded-full">
                      {partner.highlight}
                    </span>
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-charcoal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-charcoal">{partner.logo}</span>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-4">{partner.name}</h3>
                  <ul className="space-y-2">
                    {partner.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-rose-gold mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Proces Simplu în 4 Pași
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <Card key={index} className="border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-rose-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-rose-gold" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-blush/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-rose-gold" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Fără Risc</h3>
              <p className="text-muted-foreground text-sm">
                Verificarea eligibilității nu afectează scorul de credit
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Percent className="w-8 h-8 text-rose-gold" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Dobândă Fixă</h3>
              <p className="text-muted-foreground text-sm">
                Rata rămâne aceeași pe toată perioada creditului
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-rose-gold" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Aprobare Rapidă</h3>
              <p className="text-muted-foreground text-sm">
                Răspuns în maxim 30 de minute, direct în clinică
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                Întrebări Frecvente
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-charcoal text-ivory">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Hai Să Discutăm Opțiunile Tale
          </h2>
          <p className="text-ivory/70 max-w-2xl mx-auto mb-8">
            Consultanții noștri te pot ajuta să alegi cea mai bună variantă de finanțare 
            pentru situația ta. Consultația este gratuită și fără obligații.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-rose-gold hover:bg-rose-gold/90 text-white" asChild>
              <Link to="/contact">Programează Consultație</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-ivory/30 text-ivory hover:bg-ivory/10" asChild>
              <Link to="/tarife-finantare">Vezi Toate Tarifele</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FinantarePage;

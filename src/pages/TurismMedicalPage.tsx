import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Hotel, Calendar, Car, Phone, CheckCircle, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/heroes/hero-turism.jpg";

const TurismMedicalPage = () => {
  const steps = [
    {
      icon: Phone,
      title: "1. Consultație Online",
      description: "Programăm o consultație video gratuită pentru a discuta dorințele tale și a stabili un plan personalizat."
    },
    {
      icon: Calendar,
      title: "2. Programare Intervenție",
      description: "Stabilim data intervenției și îți trimitem toate detaliile necesare pentru pregătire."
    },
    {
      icon: Car,
      title: "3. Sosire în București",
      description: "Vii cu o zi înainte de operație. Te putem prelua de la aeroport sau gară."
    },
    {
      icon: Hotel,
      title: "4. Cazare Confortabilă",
      description: "Te cazezi la unul din hotelurile partenere, la 5 minute de clinică."
    },
    {
      icon: Heart,
      title: "5. Intervenția",
      description: "Operația durează 1-2 ore. Rămâi sub supraveghere până a doua zi."
    },
    {
      icon: CheckCircle,
      title: "6. Plecare Acasă",
      description: "După control, pleci acasă cu toate instrucțiunile. Controalele pot fi făcute și online."
    }
  ];

  const hotels = [
    {
      name: "Hotel Partener Premium",
      distance: "200m de clinică",
      price: "de la 250 RON/noapte",
      features: ["Mic dejun inclus", "Transfer gratuit", "Late check-out"]
    },
    {
      name: "Hotel Partener Comfort",
      distance: "500m de clinică",
      price: "de la 180 RON/noapte",
      features: ["Parcare gratuită", "Room service", "WiFi gratuit"]
    },
    {
      name: "Apartament Privat",
      distance: "300m de clinică",
      price: "de la 200 RON/noapte",
      features: ["Bucătărie proprie", "Living separat", "Intimitate maximă"]
    }
  ];

  const benefits = [
    "Consultații video gratuite înainte de vizită",
    "Asistență la rezervarea cazării",
    "Transfer aeroport/gară disponibil",
    "Program flexibil adaptat nevoilor tale",
    "Controale post-operatorii online",
    "Linie telefonică dedicată 24/7"
  ];

  return (
    <PageLayout>
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Turism Medical"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 pt-20">
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 block animate-fade-in">
            Paciente din Provincie
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up">
            Distanța Nu Mai Este o
            <br />
            <span className="text-gradient-gold">Barieră</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            Am creat un sistem complet care face experiența ta cât mai simplă și confortabilă, 
            indiferent de unde vii din țară.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-200">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link to="/contact">Programează Consultație Video</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:+40721234567">
                <Phone className="w-4 h-4 mr-2" />
                Sună Acum
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Steps Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Cum Funcționează?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un proces simplu în 6 pași, de la prima consultație până la întoarcerea acasă
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Opțiuni de Cazare
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Am negociat tarife speciale la hoteluri și apartamente în apropierea clinicii
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {hotels.map((hotel, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6">
                  <Hotel className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-1">{hotel.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.distance}
                  </div>
                  <p className="text-primary font-medium mb-4">{hotel.price}</p>
                  <ul className="space-y-2">
                    {hotel.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
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

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
                  De Ce Să Alegi <span className="text-primary">Clinica Noastră?</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Înțelegem provocările pe care le implică deplasarea pentru o intervenție chirurgicală. 
                  De aceea am creat un sistem care să facă totul mai ușor pentru tine.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/30 rounded-2xl p-8">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-light text-foreground mb-4">Program Tipic</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Ziua 1 (după-amiază)</span>
                    <span className="text-foreground">Sosire & Cazare</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Ziua 2 (dimineața)</span>
                    <span className="text-foreground">Intervenția</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Ziua 2 (seara)</span>
                    <span className="text-foreground">Supraveghere</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ziua 3 (dimineața)</span>
                    <span className="text-foreground">Control & Plecare</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[hsl(25,15%,12%)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Pregătită Să Faci Primul Pas?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Programează o consultație video gratuită și discutăm toate detaliile. 
            Te ajutăm cu tot ce ai nevoie pentru vizita ta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link to="/contact">Consultație Video Gratuită</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:+40721234567">
                <Phone className="w-4 h-4 mr-2" />
                0721 234 567
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TurismMedicalPage;

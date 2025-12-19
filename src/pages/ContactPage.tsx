import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const ContactPage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
              Contact
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-deep-brown mb-6">
              Suntem Aici
              <br />
              <span className="text-gradient-gold">Pentru Tine</span>
            </h1>
            <p className="text-lg text-soft-brown leading-relaxed">
              Ai întrebări? Vrei să programezi o consultație? Contactează-ne și îți vom răspunde în cel mai scurt timp.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mb-8">
                Informații de Contact
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne-light flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-rose-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-deep-brown mb-1">Adresă</h3>
                    <p className="text-soft-brown">
                      Str. Exemplu nr. 123<br />
                      Sector 1, București
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne-light flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-rose-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-deep-brown mb-1">Telefon</h3>
                    <a href="tel:+40721000000" className="text-soft-brown hover:text-rose-gold transition-colors">
                      +40 721 000 000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne-light flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-rose-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-deep-brown mb-1">Email</h3>
                    <a href="mailto:contact@rentea.ro" className="text-soft-brown hover:text-rose-gold transition-colors">
                      contact@rentea.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne-light flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-rose-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-deep-brown mb-1">Program</h3>
                    <p className="text-soft-brown">
                      Luni - Vineri: 09:00 - 18:00<br />
                      Sâmbătă: 10:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-champagne-light rounded-2xl h-64 flex items-center justify-center">
                <p className="text-soft-brown">Hartă interactivă</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-elegant">
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mb-6">
                Trimite-ne un Mesaj
              </h2>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-deep-brown mb-2 block">
                      Nume
                    </label>
                    <Input placeholder="Numele tău" className="bg-background" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-deep-brown mb-2 block">
                      Prenume
                    </label>
                    <Input placeholder="Prenumele tău" className="bg-background" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-deep-brown mb-2 block">
                    Email
                  </label>
                  <Input type="email" placeholder="email@exemplu.ro" className="bg-background" />
                </div>

                <div>
                  <label className="text-sm font-medium text-deep-brown mb-2 block">
                    Telefon
                  </label>
                  <Input type="tel" placeholder="+40 7XX XXX XXX" className="bg-background" />
                </div>

                <div>
                  <label className="text-sm font-medium text-deep-brown mb-2 block">
                    Mesaj
                  </label>
                  <Textarea 
                    placeholder="Cum te putem ajuta?" 
                    rows={5}
                    className="bg-background resize-none"
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full group">
                  Trimite Mesajul
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
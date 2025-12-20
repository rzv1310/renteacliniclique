import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Phone, Mail, MapPin, Loader2, CheckCircle, ChevronDown } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@/assets/hero-image.jpg";

// Zod validation schema with proper constraints
const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere")
    .max(100, "Numele nu poate depăși 100 de caractere")
    .regex(/^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/, "Numele poate conține doar litere"),
  email: z
    .string()
    .trim()
    .email("Adresa de email nu este validă")
    .max(100, "Email-ul nu poate depăși 100 de caractere"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(\+40|0)[0-9]{9}$/,
      "Numărul de telefon trebuie să fie în format românesc (ex: +40721000000 sau 0721000000)"
    ),
  message: z
    .string()
    .trim()
    .max(1000, "Mesajul nu poate depăși 1000 de caractere")
    .optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Trebuie să fii de acord cu politica de confidențialitate",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke('contact-form', {
        body: {
          firstName: data.fullName.split(' ')[0] || data.fullName,
          lastName: data.fullName.split(' ').slice(1).join(' ') || '',
          email: data.email,
          phone: data.phone,
          message: data.message || '',
        },
      });

      if (error) {
        console.error("Contact form error:", error);
        toast.error("A apărut o eroare. Te rugăm să încerci din nou.");
        return;
      }

      if (responseData?.error) {
        toast.error(responseData.error);
        return;
      }

      setIsSuccess(true);
      form.reset();
      toast.success("Programarea a fost trimisă cu succes!");
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("A apărut o eroare neașteptată. Te rugăm să încerci din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Telefon",
      description: "Echipa noastră este disponibilă Luni-Vineri, între orele 09:00 - 18:00.",
      cta: "SUNĂ ACUM",
      href: "tel:+40700000000",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Pentru întrebări detaliate sau trimiterea de documente medicale.",
      cta: "TRIMITE EMAIL",
      href: "mailto:contact@rentea.ro",
    },
    {
      icon: MapPin,
      title: "Locație",
      description: "Strada Primăverii, Nr. 24, Sector 1, București, România.",
      cta: "INDICAȚII RUTIERE",
      href: "https://maps.google.com/?q=Bulevardul+Primaverii+Bucuresti",
    },
  ];

  const faqItems = [
    {
      question: "Cât costă consultația inițială?",
      answer: "Consultația inițială detaliată costă 300 RON. Această sumă se deduce integral din prețul operației dacă decideți să continuați procedura în clinica noastră.",
    },
    {
      question: "Trebuie să plătesc totul înainte?",
      answer: "Nu, plata se poate face și eșalonat. Pentru rezervarea datei intervenției se achită un avans de 20%, iar restul sumei cu o săptămână înainte de operație sau în ziua internării.",
    },
    {
      question: "Cât timp durează până la programare?",
      answer: "Timpul de așteptare pentru o consultație este în medie de 1-2 săptămâni. Pentru intervenții chirurgicale, vă recomandăm să programați cu cel puțin o lună în avans.",
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            <span className="font-normal">Contact</span>{" "}
            <span className="italic text-primary">&</span>{" "}
            <span className="italic text-primary">Programări</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Suntem aici pentru tine. Completează formularul, sună-ne sau vino direct la clinică pentru a începe călătoria ta către frumusețe.
          </p>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactCards.map((card, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mx-auto mb-6">
                  <card.icon className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {card.description}
                </p>
                <a 
                  href={card.href}
                  className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground hover:text-primary transition-colors"
                >
                  {card.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Location Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Form */}
            <div className="bg-card border border-border rounded-lg p-8 lg:p-10">
              <span className="text-xs uppercase tracking-widest text-primary font-medium mb-2 block">
                Primul pas
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                Programări Online
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Completează formularul de mai jos și te vom contacta în cel mai scurt timp pentru a confirma programarea.
              </p>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="font-display text-xl text-foreground mb-2">
                    Mulțumim pentru programare!
                  </h3>
                  <p className="text-muted-foreground">
                    Vom reveni cu un răspuns în cel mai scurt timp.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                              Nume Complet
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ex: Ana Popescu" 
                                className="bg-muted border-border h-11"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                              Telefon
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="tel"
                                placeholder="07xx xxx xxx" 
                                className="bg-muted border-border h-11"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                            Adresă Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="nume@email.com" 
                              className="bg-muted border-border h-11"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                            Mesaj (Opțional)
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Detaliază motivul programării sau procedura dorită..." 
                              rows={4}
                              className="bg-muted border-border resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-xs text-muted-foreground font-normal cursor-pointer">
                              Sunt de acord cu{" "}
                              <a href="/politica-confidentialitate" className="text-primary underline hover:no-underline">
                                Politica de Confidențialitate
                              </a>{" "}
                              și prelucrarea datelor.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium uppercase tracking-wide"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Se trimite...
                        </>
                      ) : (
                        "Trimite Programarea"
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>

            {/* Right - Location + FAQ */}
            <div className="space-y-12">
              {/* Location */}
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-medium mb-2 block">
                  Locație
                </span>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                  Unde ne găsești
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Clinica RENTÉA este situată în inima Bucureștiului, într-o zonă accesibilă și discretă. Dispunem de parcare privată pentru pacienți.
                </p>

                {/* Map Embed */}
                <div className="rounded-lg overflow-hidden mb-4 h-64 bg-muted">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.1234567890!2d26.0833!3d44.4500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBulevardul%20Prim%C4%83verii%2C%20Bucure%C8%99ti!5e0!3m2!1sro!2sro!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Locație Clinica RENTÉA"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">♿</span>
                  Acces complet pentru persoane cu dizabilități.
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                  Întrebări Frecvente
                </h2>

                <Accordion type="single" collapsible className="space-y-3">
                  {faqItems.map((item, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/30"
                    >
                      <AccordionTrigger className="text-sm text-foreground hover:no-underline py-4 [&[data-state=open]>svg]:rotate-180">
                        {item.question}
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;

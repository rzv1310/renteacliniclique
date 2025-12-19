import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Phone, Mail, MapPin, Clock, Loader2, CheckCircle } from "lucide-react";
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

// Zod validation schema with proper constraints
const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Prenumele trebuie să aibă cel puțin 2 caractere")
    .max(50, "Prenumele nu poate depăși 50 de caractere")
    .regex(/^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/, "Prenumele poate conține doar litere"),
  lastName: z
    .string()
    .trim()
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere")
    .max(50, "Numele nu poate depăși 50 de caractere")
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
    .min(10, "Mesajul trebuie să aibă cel puțin 10 caractere")
    .max(1000, "Mesajul nu poate depăși 1000 de caractere"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke('contact-form', {
        body: data,
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
      toast.success("Mesajul a fost trimis cu succes!");
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("A apărut o eroare neașteptată. Te rugăm să încerci din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-deep-brown mb-2">
                    Mulțumim pentru mesaj!
                  </h3>
                  <p className="text-soft-brown">
                    Vom reveni cu un răspuns în cel mai scurt timp.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-deep-brown">
                              Nume
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Numele tău" 
                                className="bg-background" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-deep-brown">
                              Prenume
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Prenumele tău" 
                                className="bg-background" 
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
                          <FormLabel className="text-sm font-medium text-deep-brown">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="email@exemplu.ro" 
                              className="bg-background" 
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
                          <FormLabel className="text-sm font-medium text-deep-brown">
                            Telefon
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="+40721000000" 
                              className="bg-background" 
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
                          <FormLabel className="text-sm font-medium text-deep-brown">
                            Mesaj
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Cum te putem ajuta?" 
                              rows={5}
                              className="bg-background resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Se trimite...
                        </>
                      ) : (
                        <>
                          Trimite Mesajul
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;

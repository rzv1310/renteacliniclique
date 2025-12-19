import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, Award, Heart } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const implantTypes = [
  {
    name: "Implanturi Rotunde",
    description: "Volum uniform, decolteu plin și vizibil",
    href: "/proceduri/augmentare-mamara/implanturi-mamare-rotunde",
  },
  {
    name: "Implanturi Anatomice",
    description: "Formă de lacrimă, aspect foarte natural",
    href: "/proceduri/augmentare-mamara/implanturi-mamare-anatomice",
  },
  {
    name: "Implanturi Ergonomice",
    description: "Tehnologie avansată Motiva, comportament dinamic",
    href: "/proceduri/augmentare-mamara/implanturi-mamare-ergonomice",
  },
];

const benefits = [
  "Consultație personalizată cu simulare 3D",
  "Doar implanturi de top (Motiva, Mentor, Allergan)",
  "Tehnici minim invazive pentru cicatrici discrete",
  "Recuperare ghidată pas cu pas",
  "Garanție și urmărire pe termen lung",
];

const AugmentareMamaraPage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
                Procedura Principală
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-deep-brown mb-6">
                Augmentare Mamară cu
                <br />
                <span className="text-gradient-gold">Implanturi de Silicon</span>
              </h1>
              <p className="text-lg text-soft-brown leading-relaxed max-w-2xl mx-auto">
                Procedura de augmentare mamară este cea mai frecventă intervenție estetică din lume.
                La Rentéa, o realizăm cu precizie artistică și grijă deosebită pentru fiecare pacientă.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Implant Types */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-deep-brown mb-4">
              Tipuri de Implanturi
            </h2>
            <p className="text-soft-brown max-w-2xl mx-auto">
              Alegerea tipului de implant este esențială pentru rezultatul final. 
              Explorează opțiunile disponibile pentru a înțelege care ți se potrivește cel mai bine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {implantTypes.map((type) => (
              <Link
                key={type.name}
                to={type.href}
                className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-all duration-300 group"
              >
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-2 group-hover:text-rose-gold transition-colors">
                  {type.name}
                </h3>
                <p className="text-soft-brown text-sm mb-4">{type.description}</p>
                <span className="text-rose-gold flex items-center gap-1 text-sm font-medium">
                  Detalii complete
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
                De Ce Rentéa
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-deep-brown mb-6">
                Experiență specializată pentru rezultate excepționale
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-rose-gold shrink-0 mt-0.5" />
                    <span className="text-soft-brown">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg" className="mt-8 group">
                Programează Consultația
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: "Siguranță maximă", desc: "Protocoale stricte" },
                { icon: Award, label: "Experiență", desc: "15+ ani specialitate" },
                { icon: Heart, label: "Grijă personalizată", desc: "Fiecare caz unic" },
                { icon: Check, label: "Rezultate dovedite", desc: "Galerie reală" },
              ].map((item) => (
                <div key={item.label} className="bg-champagne-light rounded-xl p-6 text-center">
                  <item.icon className="w-8 h-8 text-rose-gold mx-auto mb-3" />
                  <p className="font-medium text-deep-brown text-sm">{item.label}</p>
                  <p className="text-xs text-soft-brown mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-deep-brown mb-4">
                Procesul Pas cu Pas
              </h2>
            </div>

            <div className="space-y-6">
              {[
                { step: "01", title: "Consultația Inițială", desc: "Discutăm obiectivele tale, realizăm măsurători și simulare 3D" },
                { step: "02", title: "Alegerea Implantului", desc: "Împreună selectăm tipul, mărimea și forma potrivită corpului tău" },
                { step: "03", title: "Intervenția Chirurgicală", desc: "Procedură de ~1.5h sub anestezie generală, tehnici moderne" },
                { step: "04", title: "Recuperarea", desc: "Ghid complet de recuperare, controale regulate, suport continuu" },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start bg-card rounded-xl p-6 shadow-soft">
                  <span className="font-serif text-3xl text-rose-gold font-semibold">{item.step}</span>
                  <div>
                    <h3 className="font-medium text-deep-brown text-lg mb-1">{item.title}</h3>
                    <p className="text-soft-brown">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-deep-brown mb-6">
              Gata să faci primul pas?
            </h2>
            <p className="text-soft-brown mb-8">
              Programează o consultație pentru a discuta despre opțiunile tale și a primi un plan personalizat.
            </p>
            <Button variant="hero" size="xl" className="group">
              Programează Consultația Gratuită
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AugmentareMamaraPage;
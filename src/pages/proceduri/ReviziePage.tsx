import { Button } from "@/components/ui/button";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SEOHead from "@/components/SEOHead";
import heroImage from "@/assets/heroes/hero-revision.jpg";

const ReviziePage = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Revizie Implant Mamar | Schimbare Implanturi București | Rentéa Aesthetic"
        description="Revizie și schimbare implanturi mamare în București. Corectarea complicațiilor, înlocuire sau îndepărtare implanturi. Specialiști în cazuri complexe."
        keywords="revizie implant mamar, schimbare implanturi, inlocuire silicon sani, corectie augmentare"
        canonical="/proceduri/schimbare-inlocuire-implant-mamar-revizie"
      />
      {/* Hero - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Femeie elegantă"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 lg:px-8 text-center pt-20">
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 block animate-fade-in">
            Procedură de Revizie
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up">
            Revizie și Schimbare
            <br />
            <span className="text-gradient-gold">Implant Mamar</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            Procedura de revizie implică înlocuirea sau îndepărtarea implanturilor existente, 
            fie pentru a îmbunătăți rezultatele, fie din motive medicale. Suntem specializați 
            în cazuri complexe de revizie.
          </p>
          <Button variant="hero" size="lg" className="group animate-fade-in-up animation-delay-200">
            Programează Consultația
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Motive */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8 text-center">
              De Ce Ar Fi Necesară o Revizie?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Schimbarea Mărimii",
                  desc: "Dorești să mărești sau să micșorezi volumul actual",
                  icon: "📐",
                },
                {
                  title: "Actualizare Tehnologică",
                  desc: "Upgrade la implanturi mai noi și mai sigure",
                  icon: "🔄",
                },
                {
                  title: "Contractură Capsulară",
                  desc: "Țesutul din jurul implantului s-a întărit anormal",
                  icon: "⚠️",
                },
                {
                  title: "Ruptura Implantului",
                  desc: "Implantul s-a deteriorat și necesită înlocuire",
                  icon: "🔧",
                },
                {
                  title: "Deplasare sau Asimetrie",
                  desc: "Implanturile s-au deplasat din poziția inițială",
                  icon: "↔️",
                },
                {
                  title: "Rippling (Ondulații)",
                  desc: "Marginile implantului sunt vizibile sub piele",
                  icon: "〰️",
                },
              ].map((reason) => (
                <div key={reason.title} className="bg-card rounded-xl p-6 shadow-soft flex gap-4">
                  <span className="text-2xl">{reason.icon}</span>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Opțiuni */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8 text-center">
              Opțiuni de Revizie
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Înlocuire Simplă",
                  desc: "Schimbarea implanturilor cu unele noi de aceeași mărime sau diferită",
                  features: ["Aceeași incizie", "Recuperare rapidă", "Cost moderat"],
                },
                {
                  title: "Revizie cu Capsulectomie",
                  desc: "Îndepărtarea țesutului capsular împreună cu înlocuirea implanturilor",
                  features: ["Rezolvă contractura", "Procedură mai complexă", "Rezultate durabile"],
                },
                {
                  title: "Explantare",
                  desc: "Îndepărtarea completă a implanturilor fără înlocuire",
                  features: ["Cu sau fără lifting", "Opțiune definitivă", "Revenire la natural"],
                },
              ].map((option) => (
                <div key={option.title} className="bg-card rounded-2xl p-6 shadow-soft">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{option.desc}</p>
                  <ul className="space-y-2">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Când să consulți */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-elegant">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Când Ar Trebui Să Consulți?
                  </h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Implanturile au mai mult de 10-15 ani</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Simți durere sau disconfort persistent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Observi schimbări în forma sau poziția sânilor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Sânii au devenit mai fermi sau mai duri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Rezultatele RMN sau ecografiei indică probleme</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Ai implanturi existente care necesită atenție?
            </h2>
            <p className="text-muted-foreground mb-8">
              Oferim consultații specializate pentru cazuri de revizie, inclusiv pentru implanturi realizate în alte clinici.
            </p>
            <Button variant="hero" size="xl" className="group">
              Programează Evaluarea
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ReviziePage;

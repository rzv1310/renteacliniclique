import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImplants from "@/assets/heroes/hero-implants.jpg";

const ImplantsPage = () => {
  const [activeTab, setActiveTab] = useState("rotund");

  const implantTypes = {
    rotund: {
      name: "Implanturi Rotunde",
      tagline: "Volum maximizat, decolteu plin",
      description:
        "Implanturile rotunde oferă un volum uniform în partea superioară și inferioară a sânului, creând un decolteu vizibil și plin. Sunt ideale pentru femeile care doresc un aspect mai dramatic.",
      pros: [
        "Decolteu mai plin și mai vizibil",
        "Aspect simetric în orice poziție",
        "Cost mai accesibil",
        "Risc redus de rotație",
      ],
      cons: [
        "Aspect mai puțin natural pentru unele paciente",
        "Mai vizibile sub țesut subțire",
      ],
      idealFor: "Femei cu țesut mamar suficient care doresc un decolteu plin și vizibil.",
    },
    anatomic: {
      name: "Implanturi Anatomice",
      tagline: "Formă de lacrimă, aspect natural",
      description:
        "Implanturile anatomice (în formă de lacrimă) mimează forma naturală a sânului, cu mai mult volum în partea inferioară. Oferă cel mai natural rezultat.",
      pros: [
        "Aspect foarte natural",
        "Imită forma naturală a sânului",
        "Ideal pentru reconstrucție",
        "Tranziție lină la piept",
      ],
      cons: [
        "Cost mai ridicat",
        "Risc teoretic de rotație (foarte rar cu tehnici moderne)",
      ],
      idealFor: "Femei care doresc un aspect cât mai natural, sau pentru reconstrucție mamară.",
    },
    ergonomic: {
      name: "Implanturi Ergonomice",
      tagline: "Cel mai nou și avansat tip - Motiva",
      description:
        "Implanturile ergonomice (precum Motiva Ergonomix) combină cel mai bun din ambele lumi: se comportă ca un implant rotund când stai în picioare și se aplatizează natural când te întinzi.",
      pros: [
        "Comportament dinamic, natural",
        "Senzație tactilă superioară",
        "Cel mai mic risc de complicații",
        "Garanție pe viață de la producător",
      ],
      cons: [
        "Cel mai ridicat cost",
        "Disponibilitate limitată în unele clinici",
      ],
      idealFor: "Femei active care doresc cel mai natural rezultat și cea mai înaltă siguranță.",
    },
  };

  const tabs = [
    { id: "rotund", label: "Rotunde" },
    { id: "anatomic", label: "Anatomice" },
    { id: "ergonomic", label: "Ergonomice" },
  ];

  const activeImplant = implantTypes[activeTab as keyof typeof implantTypes];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImplants} 
            alt="Tipuri de Implanturi Mamare" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
            Redefinește-ți Silueta
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-deep-brown mb-6">
            Implant Mamar București
          </h1>
          <p className="text-lg text-soft-brown leading-relaxed max-w-2xl mx-auto">
            Augmentare Mamară în București - precizie medicală combinată cu o viziune artistică.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-full text-base font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-rose-gold text-primary-foreground shadow-gold"
                    : "bg-card text-soft-brown hover:bg-champagne shadow-soft"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Visual Representation */}
              <div className="bg-gradient-to-br from-champagne-light to-champagne/30 rounded-2xl aspect-square flex items-center justify-center shadow-elegant">
                <div className="text-center">
                  <div className="w-32 h-40 mx-auto mb-6 relative">
                    {/* Simplified implant shape visualization */}
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-b from-rose-gold/30 to-champagne/50 transition-all duration-500 ${
                        activeTab === "anatomic" ? "rounded-t-[60%] rounded-b-[40%]" : ""
                      } ${activeTab === "ergonomic" ? "rounded-[45%]" : ""}`}
                    />
                  </div>
                  <p className="font-serif text-xl text-deep-brown">{activeImplant.name}</p>
                  <p className="text-sm text-rose-gold mt-1">{activeImplant.tagline}</p>
                </div>
              </div>

              {/* Details */}
              <div>
                <h2 className="font-serif text-3xl font-semibold text-deep-brown mb-4">
                  {activeImplant.name}
                </h2>
                <p className="text-soft-brown leading-relaxed mb-8">
                  {activeImplant.description}
                </p>

                {/* Pros */}
                <div className="mb-6">
                  <h3 className="font-medium text-deep-brown mb-3">Avantaje:</h3>
                  <ul className="space-y-2">
                    {activeImplant.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-rose-gold shrink-0 mt-0.5" />
                        <span className="text-soft-brown">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="mb-6">
                  <h3 className="font-medium text-deep-brown mb-3">De luat în considerare:</h3>
                  <ul className="space-y-2">
                    {activeImplant.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2">
                        <span className="w-5 h-5 shrink-0 flex items-center justify-center text-champagne">
                          •
                        </span>
                        <span className="text-soft-brown">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For */}
                <div className="bg-champagne-light rounded-xl p-6 mb-8">
                  <h3 className="font-medium text-deep-brown mb-2">Ideal pentru:</h3>
                  <p className="text-soft-brown">{activeImplant.idealFor}</p>
                </div>

                <Button variant="hero" size="lg" className="group">
                  Programează Consultația
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Guide Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
              Ghidul Mărimilor
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-deep-brown mb-6">
              Cum să alegi între 300cc și 400cc?
            </h2>
            <p className="text-soft-brown leading-relaxed mb-10">
              Mărimea potrivită depinde de înălțimea, greutatea și forma corpului tău. 
              Nu există o mărime universală - de aceea consultația este esențială.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {[
                {
                  range: "200-280cc",
                  look: "Natural, Subtil",
                  best: "Corp subțire, dorință de aspect natural",
                },
                {
                  range: "300-380cc",
                  look: "Plin, Feminin",
                  best: "Corp mediu, decolteu vizibil dar natural",
                },
                {
                  range: "400-500cc",
                  look: "Voluptuos, Dramatic",
                  best: "Corp robust, dorință de volum maxim",
                },
              ].map((size) => (
                <div key={size.range} className="bg-card rounded-xl p-6 shadow-soft">
                  <p className="font-serif text-2xl text-rose-gold mb-2">{size.range}</p>
                  <p className="font-medium text-deep-brown mb-2">{size.look}</p>
                  <p className="text-sm text-soft-brown">{size.best}</p>
                </div>
              ))}
            </div>

            <Button variant="elegant" size="xl" className="mt-10 group">
              Vreau o Simulare 3D
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Techniques Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
                Tehnici de Inserție
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-deep-brown">
                Unde plasăm implantul?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Subglandulară",
                  placement: "Sub țesutul mamar, deasupra mușchiului",
                  benefits: [
                    "Recuperare mai rapidă",
                    "Mai puțină durere post-operatorie",
                    "Ideal pentru sportive",
                  ],
                },
                {
                  name: "Submusculară (Dual Plane)",
                  placement: "Parțial sub mușchiul pectoral",
                  benefits: [
                    "Aspect mai natural",
                    "Risc redus de capsulă",
                    "Mamografii mai clare",
                  ],
                },
              ].map((technique) => (
                <div
                  key={technique.name}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-all duration-300"
                >
                  <h3 className="font-serif text-2xl font-semibold text-deep-brown mb-2">
                    {technique.name}
                  </h3>
                  <p className="text-sm text-rose-gold mb-4">{technique.placement}</p>
                  <ul className="space-y-2">
                    {technique.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-rose-gold" />
                        <span className="text-soft-brown text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ImplantsPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock, Stethoscope, Building2, Diamond, ChevronDown, ZoomIn, X, Ruler, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import GalleryLightboxAugmentare from "@/components/proceduri/GalleryLightboxAugmentare";

// Import hero image
import heroImage from "@/assets/heroes/hero-augmentation.jpg";

// Import implant images
import implantRound from "@/assets/implants/implant-round.png";
import implantAnatomic from "@/assets/implants/implant-anatomic.png";

// Import gallery images
import case1Before from "@/assets/gallery/case-1-before.jpg";
import case1After from "@/assets/gallery/case-1-after.jpg";
import case2Before from "@/assets/gallery/case-2-before.jpg";
import case2After from "@/assets/gallery/case-2-after.jpg";

const AugmentareMamaraPage = () => {
  const [selectedShape, setSelectedShape] = useState<"round" | "anatomical">("round");
  const [selectedIncision, setSelectedIncision] = useState<string>("inframammary");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryCases = [
    {
      id: "3829",
      beforeImage: case1Before,
      afterImage: case1After,
      title: "Caz #3829",
      details: "325cc • Rotunde • Dual Plane"
    },
    {
      id: "4102",
      beforeImage: case2Before,
      afterImage: case2After,
      title: "Caz #4102",
      details: "290cc • Anatomice • Sub-muscular"
    }
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const incisionOptions = [
    {
      id: "inframammary",
      name: "Inframamară",
      badge: "Popular",
      description: "Incizia se face în pliul de sub sân (șanțul submamar). Este cea mai frecventă plasare.",
      visibility: "Redusă",
      healingTime: "2-3 săptămâni",
      scarLength: "4-5 cm",
      advantages: [
        "Cea mai bună vizibilitate pentru chirurg",
        "Acces optim pentru plasarea implantului",
        "Cicatrice ascunsă în pliul natural",
        "Risc minim de afectare a țesutului mamar"
      ],
      disadvantages: [
        "Poate fi vizibilă în sutien foarte decupat",
        "Necesită sutură precisă pentru aspect optim"
      ]
    },
    {
      id: "periareolar",
      name: "Periareolară",
      badge: null,
      description: "Incizia se face de-a lungul marginii inferioare a areolei. Cicatricea se integrează în tranziția pielii.",
      visibility: "Moderată",
      healingTime: "3-4 săptămâni",
      scarLength: "3-4 cm",
      advantages: [
        "Cicatrice foarte discretă",
        "Se integrează în tranziția naturală de culoare",
        "Acces bun pentru ajustări fine"
      ],
      disadvantages: [
        "Risc ușor mai mare de afectare a sensibilității",
        "Nu este ideală pentru implanturi foarte mari",
        "Poate afecta țesutul glandular"
      ]
    },
    {
      id: "transaxillary",
      name: "Transaxilară",
      badge: null,
      description: "Incizia se face în axilă. Nu lasă cicatrice pe sân, dar necesită echipament specializat.",
      visibility: "Ascunsă",
      healingTime: "2-3 săptămâni",
      scarLength: "4-6 cm",
      advantages: [
        "Nicio cicatrice pe sân",
        "Ideală pentru paciente care doresc discreție maximă",
        "Cicatrice ascunsă în pliul axilar (sub braț)"
      ],
      disadvantages: [
        "Necesită echipament endoscopic specializat",
        "Acces limitat pentru revizii ulterioare",
        "Nu este potrivită pentru orice tip de implant"
      ]
    }
  ];

  // SVG Illustrations for incision types
  const IncisionIllustration = ({ type }: { type: string }) => {
    return (
      <div className="relative w-full aspect-square max-w-[200px] mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Breast outline */}
          <ellipse
            cx="100"
            cy="110"
            rx="70"
            ry="60"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          {/* Areola */}
          <circle
            cx="100"
            cy="100"
            r="18"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1.5"
          />
          
          {/* Inframammary incision */}
          {type === "inframammary" && (
            <path
              d="M 50 165 Q 100 175 150 165"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-pulse"
            />
          )}
          
          {/* Periareolar incision */}
          {type === "periareolar" && (
            <path
              d="M 84 112 Q 100 122 116 112"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-pulse"
            />
          )}
          
          {/* Transaxillary incision - side view indicator */}
          {type === "transaxillary" && (
            <>
              <path
                d="M 175 70 L 185 85"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-pulse"
              />
              <text
                x="170"
                y="60"
                fill="hsl(var(--muted-foreground))"
                fontSize="10"
                textAnchor="middle"
              >
                Axilă
              </text>
            </>
          )}
        </svg>
        
        {/* Label */}
        <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 text-center">
          <p className="text-xs text-muted-foreground">
            {type === "inframammary" && "Incizie în pliul submamar"}
            {type === "periareolar" && "Incizie sub areolă"}
            {type === "transaxillary" && "Incizie în zona axilei"}
          </p>
        </div>
      </div>
    );
  };

  const selectedIncisionData = incisionOptions.find(opt => opt.id === selectedIncision);

  const faqs = [
    {
      question: "Cicatricile vor fi vizibile?",
      answer: "Prioritizăm plasarea cicatricilor (inframammară sau periareolară) care ascunde inciziile în contururile naturale ale corpului. Cu îngrijire postoperatorie adecvată și tratamente laser dacă este necesar, cicatricile se estompează de obicei până la linii fine, aproape invizibile, în 12 luni."
    },
    {
      question: "Pot alăpta după implanturi?",
      answer: "Da, în marea majoritate a cazurilor. Folosim tehnici care păstrează canalele galactofore și senzația nervoasă, plasând de obicei implantul sub mușchi pentru a-l separa de țesutul glandular responsabil de producția de lapte."
    },
    {
      question: "Cât de des trebuie înlocuite implanturile?",
      answer: "Implanturile moderne sunt extrem de durabile și aprobate FDA. Nu au o dată de expirare strictă. Deși recomandăm controale de rutină, înlocuirea este de obicei necesară doar dacă apare o complicație sau dacă doriți o schimbare de mărime sau formă mai târziu."
    },
    {
      question: "Operația este dureroasă?",
      answer: "Majoritatea pacientelor raportează o senzație de presiune sau tensiune mai degrabă decât durere ascuțită. Utilizăm blocuri nervoase avansate în timpul operației și un plan personalizat de gestionare a durerii pentru primele 3 zile pentru a vă asigura confortul."
    }
  ];

  const recoverySteps = [
    { day: "Zilele 1-3", desc: "Odihna este crucială. Disconfort ușor gestionat cu medicație. Bandajele rămân pe loc." },
    { day: "Ziua 7", desc: "Primul control. Majoritatea pacientelor revin la muncă ușoară de birou și condus." },
    { day: "Săptămânile 3-4", desc: "Umflarea scade semnificativ. Exercițiile cardio ușoare pot fi reluate." },
    { day: "Săptămâna 6+", desc: "Recuperare completă. Fără restricții la ridicarea greutăților sau exerciții intense." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Full Screen */}
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
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center pt-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium uppercase tracking-wider">Redefinește-ți Silueta</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 animate-fade-in-up">
            Implant Mamar București
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light animate-fade-in-up animation-delay-100">
            Augmentare Mamară în București - precizie medicală combinată cu viziune artistică.
          </p>

          <div className="flex justify-center animate-fade-in-up animation-delay-200">
            <Button size="lg" className="btn-glow-border bg-transparent text-white border border-rose-gold/60 hover:bg-rose-gold/10 hover:border-rose-gold">
              <Phone className="w-5 h-5 mr-2" />
              Fă primul pas pentru transformare
            </Button>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />


      {/* Choose Your Shape */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 block">
              Personalizare
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
              Alege Forma
            </h2>
            <p className="text-muted-foreground">
              Selectează un profil de implant pentru a înțelege diferența estetică.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Round Implants */}
            <div
              onClick={() => setSelectedShape("round")}
              className={`relative cursor-pointer rounded-2xl p-8 transition-all duration-300 ${
                selectedShape === "round"
                  ? "bg-card border-2 border-primary shadow-gold"
                  : "bg-card/50 border border-border/50 hover:border-primary/30"
              }`}
            >
              {selectedShape === "round" && (
                <div className="absolute top-4 right-4">
                  <Check className="w-6 h-6 text-primary" />
                </div>
              )}
              <div className="aspect-[4/3] rounded-xl mb-6 overflow-hidden">
                <img 
                  src={implantRound} 
                  alt="Implant rotund" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-2">
                Implanturi Rotunde
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Oferă plenitudine în polul superior al sânului pentru un aspect mai ridicat și tineresc.
              </p>
              {selectedShape === "round" && (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Volum evident în partea superioară
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Formă simetrică 360°
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Orientare mai puțin critică
                  </div>
                  <Link 
                    to="/proceduri/implant-mamar-bucuresti/implanturi-mamare-rotunde" 
                    className="flex items-center gap-2 text-sm text-primary hover:underline mt-3 font-medium group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    Ghid implanturi mamare rotunde
                  </Link>
                </div>
              )}
            </div>

            {/* Anatomical Implants */}
            <div
              onClick={() => setSelectedShape("anatomical")}
              className={`relative cursor-pointer rounded-2xl p-8 transition-all duration-300 ${
                selectedShape === "anatomical"
                  ? "bg-card border-2 border-primary shadow-gold"
                  : "bg-card/50 border border-border/50 hover:border-primary/30"
              }`}
            >
              {selectedShape === "anatomical" && (
                <div className="absolute top-4 right-4">
                  <Check className="w-6 h-6 text-primary" />
                </div>
              )}
              <div className="aspect-[4/3] rounded-xl mb-6 overflow-hidden">
                <img 
                  src={implantAnatomic} 
                  alt="Implant anatomic" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-2">
                Anatomice (Lacrimă)
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Imită panta naturală a sânului, cu mai mult volum în partea inferioară.
              </p>
              {selectedShape === "anatomical" && (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Contur tip „pantă", natural (mai mult volum inferior)
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Formă direcțională (sus/jos)
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Poziționare mai atentă
                  </div>
                  <Link 
                    to="/proceduri/implant-mamar-bucuresti/implanturi-mamare-anatomice" 
                    className="flex items-center gap-2 text-sm text-primary hover:underline mt-3 font-medium group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    Ghid implanturi mamare anatomice
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Procedure Details */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 block">
              Specificații
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
              Detalii Procedurale
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparența este cheia confortului. Iată ce poți aștepta din punct de vedere tehnic
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
              <div className="bg-card rounded-xl p-6 text-center border border-border/50">
                <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Durată</p>
                <p className="text-foreground font-medium">aprox. 2 ore</p>
              </div>
              <div className="bg-card rounded-xl p-6 text-center border border-border/50">
                <Stethoscope className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Anestezie</p>
                <p className="text-foreground font-medium">Generală</p>
              </div>
              <div className="bg-card rounded-xl p-6 text-center border border-border/50">
                <Building2 className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Internare</p>
                <p className="text-foreground font-medium">1 Noapte</p>
              </div>
            </div>

            {/* Incision Options */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-medium text-foreground">
                  Tipuri de incizii
                </h3>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Selectează opțiuni
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {incisionOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedIncision(option.id)}
                    className={`cursor-pointer rounded-xl p-5 transition-all duration-300 ${
                      selectedIncision === option.id
                        ? "bg-card border-2 border-primary shadow-gold"
                        : "bg-card/50 border border-border/30 hover:border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium text-foreground">{option.name}</h4>
                        {option.badge && (
                          <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                            {option.badge}
                          </span>
                        )}
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedIncision === option.id ? "border-primary bg-primary" : "border-border"
                      }`}>
                        {selectedIncision === option.id && (
                          <Check className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Vizibilitate: <span className="text-primary">{option.visibility}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Extended Information Panel with SVG inside */}
              {selectedIncisionData && (
                <div className="bg-muted/50 rounded-2xl p-6 border border-border/30 animate-fade-in">
                  <div className="grid md:grid-cols-[180px_1fr] gap-6">
                    {/* SVG Illustration inside the details card */}
                    <div className="flex flex-col items-center justify-center">
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-4 text-center">
                        Localizare Incizie
                      </h4>
                      <IncisionIllustration type={selectedIncision} />
                    </div>

                    {/* Details content */}
                    <div>
                      <h4 className="font-display text-lg font-medium text-foreground mb-4">
                        Detalii: Incizie {selectedIncisionData.name}
                      </h4>
                      
                      {/* Healing Time & Scar Length */}
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="flex items-center gap-3 bg-card rounded-lg p-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Timp vindecare</p>
                            <p className="text-sm font-medium text-foreground">{selectedIncisionData.healingTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-card rounded-lg p-3">
                          <Ruler className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Lungime cicatrice</p>
                            <p className="text-sm font-medium text-foreground">{selectedIncisionData.scarLength}</p>
                          </div>
                        </div>
                      </div>

                      {/* Advantages & Disadvantages in two columns */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Advantages */}
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Avantaje
                          </h5>
                          <ul className="space-y-1.5">
                            {selectedIncisionData.advantages.map((adv, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                {adv}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Disadvantages */}
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <X className="w-4 h-4 text-amber-500" />
                            Considerații
                          </h5>
                          <ul className="space-y-1.5">
                            {selectedIncisionData.disadvantages.map((dis, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                {dis}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Timeline */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 block">
              Îngrijire Post-Operatorie
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
              Cronologia Recuperării
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Desktop: Horizontal grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-6">
              {recoverySteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector line with animated glow dot - horizontal */}
                  {index < recoverySteps.length - 1 && (
                    <div className="absolute top-8 left-1/2 w-full h-px bg-border/50 overflow-hidden">
                      {/* Trail elements */}
                      {[0.15, 0.3, 0.45].map((trailDelay, i) => (
                        <div
                          key={i}
                          className="absolute top-1/2 -translate-y-1/2 rounded-full"
                          style={{
                            animation: `glow-travel-seg-${index} 9s ease-in-out infinite`,
                            animationDelay: `${trailDelay}s`,
                            width: `${8 - i * 2}px`,
                            height: `${8 - i * 2}px`,
                            background: `rgba(212, 175, 155, ${0.28 - i * 0.08})`,
                            boxShadow: `0 0 ${6 - i * 2}px ${3 - i}px rgba(212, 175, 155, ${0.38 - i * 0.08})`,
                          }}
                        />
                      ))}
                      {/* Main glowing dot */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                        style={{
                          animation: `glow-travel-seg-${index} 9s ease-in-out infinite`,
                          background: "linear-gradient(135deg, #d4af9b, #e8d5c4)",
                          boxShadow: "0 0 10px 4px rgba(212, 175, 155, 0.8), 0 0 20px 8px rgba(212, 175, 155, 0.4)",
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-card border border-border/50 flex items-center justify-center mx-auto mb-4">
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ animation: `pulse-step-${index} 9s ease-in-out infinite` }}
                      >
                        <span className="text-2xl font-light text-foreground">{index + 1}</span>
                      </div>
                    </div>
                    <h4 className="font-medium text-foreground mb-2">{step.day}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: Vertical layout */}
            <div className="md:hidden space-y-0">
              {recoverySteps.map((step, index) => (
                <div key={index} className="relative flex gap-4">
                  {/* Left side: Circle + vertical connector */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center shrink-0">
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ animation: `pulse-step-mobile-${index} 9s ease-in-out infinite` }}
                      >
                        <span className="text-xl font-light text-foreground">{index + 1}</span>
                      </div>
                    </div>
                    
                    {/* Vertical connector line */}
                    {index < recoverySteps.length - 1 && (
                      <div className="w-px h-20 bg-border/50 overflow-hidden relative">
                        {/* Trail elements - vertical */}
                        {[0.15, 0.3, 0.45].map((trailDelay, i) => (
                          <div
                            key={i}
                            className="absolute left-1/2 -translate-x-1/2 rounded-full"
                            style={{
                              animation: `glow-travel-vert-${index} 9s ease-in-out infinite`,
                              animationDelay: `${trailDelay}s`,
                              width: `${6 - i * 1.5}px`,
                              height: `${6 - i * 1.5}px`,
                              background: `rgba(212, 175, 155, ${0.28 - i * 0.08})`,
                              boxShadow: `0 0 ${5 - i * 1.5}px ${2 - i * 0.5}px rgba(212, 175, 155, ${0.38 - i * 0.08})`,
                            }}
                          />
                        ))}
                        {/* Main glowing dot - vertical */}
                        <div
                          className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
                          style={{
                            animation: `glow-travel-vert-${index} 9s ease-in-out infinite`,
                            background: "linear-gradient(135deg, #d4af9b, #e8d5c4)",
                            boxShadow: "0 0 8px 3px rgba(212, 175, 155, 0.8), 0 0 16px 6px rgba(212, 175, 155, 0.4)",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Right side: Content */}
                  <div className="pt-2 pb-6">
                    <h4 className="font-medium text-foreground mb-1">{step.day}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-4xl md:text-5xl font-light text-gradient-gold mb-2">15+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Ani Experiență</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light text-gradient-gold mb-2">2k+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Proceduri</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light text-gradient-gold mb-2">100%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Board Certified</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light text-gradient-gold mb-2">4.9</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Rating Pacienți</p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Results Gallery */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 block">
                Portofoliu
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
                Rezultate Paciente
              </h2>
              <p className="text-muted-foreground mt-2">Rezultate reale de la paciente reale.</p>
            </div>
            <Link
              to="/galerie"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              Vezi Galeria Completă
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {galleryCases.map((caseItem, index) => (
              <div key={caseItem.id} className="group relative">
                <div 
                  className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-[3/4]">
                    <img src={caseItem.beforeImage} alt="Înainte" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      Înainte
                    </span>
                  </div>
                  <div className="relative aspect-[3/4]">
                    <img src={caseItem.afterImage} alt="După" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      După
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-medium">{caseItem.title}</p>
                    <p className="text-sm text-muted-foreground">{caseItem.details}</p>
                  </div>
                  <button 
                    onClick={() => openLightbox(index)}
                    className="p-2 rounded-full bg-card border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/galerie">
              <Button variant="outline" size="lg" className="border-border/50 hover:border-primary/50">
                Vezi Galeria Completă
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <GalleryLightboxAugmentare
          cases={galleryCases}
          isOpen={lightboxOpen}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
              Întrebări Frecvente
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-0 text-muted-foreground">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Art of Natural Enhancement */}
      <section className="py-12 bg-luxury-brown silk-folds">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Diamond className="w-12 h-12 text-primary mx-auto mb-8" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
              Arta Îmbunătățirii Naturale
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Credem în estetica personalizată. Corpul tău este unic, iar îmbunătățirea ta ar trebui să fie la fel. 
              Abordarea noastră evită mentalitatea "o mărime pentru toți", concentrându-se în schimb pe proporție, 
              proiecție și un rezultat care se simte autentic tu.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AugmentareMamaraPage;

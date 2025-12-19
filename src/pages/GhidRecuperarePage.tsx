import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock, AlertCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const timeline = [
  {
    period: "Ziua 1-3",
    title: "Primele Zile",
    description: "Odihnă completă acasă. Ușoară durere și disconfort, gestionabile cu medicație.",
    tasks: [
      "Purtarea sutienului chirurgical 24/7",
      "Medicație conform prescripției",
      "Mișcări limitate ale brațelor",
      "Odihnă în poziție semi-ridicată",
    ],
    warning: "Nu ridica obiecte grele, nu conduce",
  },
  {
    period: "Săptămâna 1",
    title: "Prima Săptămână",
    description: "Edemul și vânătăile sunt normale. Control medical pentru evaluare.",
    tasks: [
      "Plimbări scurte pentru circulație",
      "Duș permis după indicația medicului",
      "Continuarea purtării sutienului",
      "Control medical programat",
    ],
    warning: "Evită dușurile fierbinți și băile",
  },
  {
    period: "Săptămâna 2-4",
    title: "Recuperare Activă",
    description: "Reluarea treptată a activităților zilnice. Edemul începe să scadă.",
    tasks: [
      "Reluarea activităților de birou (săpt. 2)",
      "Plimbări mai lungi",
      "Masaj ușor conform indicațiilor",
      "Continuarea purtării sutienului sport",
    ],
    warning: "Fără sport sau efort fizic intens",
  },
  {
    period: "Luna 2-3",
    title: "Vindecare Continuă",
    description: "Sânii încep să se așeze în poziția finală. Cicatricile se maturizează.",
    tasks: [
      "Reluarea exercițiilor ușoare (cardio)",
      "Îngrijirea cicatricilor",
      "Sutien sport în continuare pentru sport",
      "Controale periodice",
    ],
    warning: "Încă fără exerciții pentru piept",
  },
  {
    period: "Luna 3-6",
    title: "Rezultatul Final",
    description: "Implanturile se stabilizează complet. Rezultatul final devine vizibil.",
    tasks: [
      "Reluarea tuturor activităților sportive",
      "Forma și poziția finală stabilizate",
      "Cicatricile se estompează",
      "Control final de evaluare",
    ],
    warning: null,
  },
];

const GhidRecuperarePage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
              Ghid Complet
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-deep-brown mb-6">
              Ghid de Recuperare
              <br />
              <span className="text-gradient-gold">Post-Operatorie</span>
            </h1>
            <p className="text-lg text-soft-brown leading-relaxed">
              Tot ce trebuie să știi despre perioada de recuperare după augmentarea mamară. 
              Un ghid detaliat zi de zi pentru cele mai bune rezultate.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.period} className="relative">
                  {/* Connector line with animated glow dot */}
                  {index < timeline.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-full bg-primary/30 -z-10 overflow-hidden">
                      {/* Trail elements */}
                      {[0.15, 0.3, 0.45].map((trailDelay, i) => (
                        <div
                          key={i}
                          className="absolute left-1/2 -translate-x-1/2 rounded-full"
                          style={{
                            animation: `glow-travel-vert-${index} 12s ease-in-out infinite`,
                            animationDelay: `${trailDelay}s`,
                            width: `${6 - i * 1.5}px`,
                            height: `${6 - i * 1.5}px`,
                            background: `rgba(212, 175, 155, ${0.28 - i * 0.08})`,
                            boxShadow: `0 0 ${5 - i * 1.5}px ${2 - i * 0.5}px rgba(212, 175, 155, ${0.38 - i * 0.08})`,
                          }}
                        />
                      ))}
                      {/* Main glowing dot */}
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                        style={{ 
                          animation: `glow-travel-vert-${index} 12s ease-in-out infinite`,
                          background: "linear-gradient(135deg, #d4af9b, #e8d5c4)",
                          boxShadow: "0 0 10px 4px rgba(212, 175, 155, 0.8), 0 0 20px 8px rgba(212, 175, 155, 0.4)"
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="w-12 h-12 rounded-full bg-rose-gold flex items-center justify-center shrink-0">
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ animation: `pulse-step-${index} 12s ease-in-out infinite` }}
                      >
                        <Clock className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-card rounded-2xl p-6 lg:p-8 shadow-soft">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="bg-champagne-light text-deep-brown text-sm font-medium px-3 py-1 rounded-full">
                          {item.period}
                        </span>
                        <h3 className="font-serif text-xl font-semibold text-deep-brown">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-soft-brown mb-4">{item.description}</p>

                      <ul className="space-y-2 mb-4">
                        {item.tasks.map((task) => (
                          <li key={task} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-rose-gold shrink-0 mt-0.5" />
                            <span className="text-soft-brown text-sm">{task}</span>
                          </li>
                        ))}
                      </ul>

                      {item.warning && (
                        <div className="flex items-start gap-2 bg-destructive/10 rounded-lg p-3">
                          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <span className="text-sm text-destructive">{item.warning}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-deep-brown mb-8 text-center">
              Sfaturi Pentru o Recuperare Optimă
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Hidratare",
                  desc: "Bea suficientă apă pentru a ajuta procesul de vindecare",
                },
                {
                  title: "Alimentație",
                  desc: "Mănâncă echilibrat, bogat în proteine și vitamine",
                },
                {
                  title: "Odihnă",
                  desc: "Somnul suficient accelerează vindecarea",
                },
                {
                  title: "Răbdare",
                  desc: "Rezultatul final necesită timp - ai încredere în proces",
                },
                {
                  title: "Comunicare",
                  desc: "Contactează-ne pentru orice nelămurire sau îngrijorare",
                },
                {
                  title: "Controale",
                  desc: "Respectă programările pentru monitorizare",
                },
              ].map((tip) => (
                <div key={tip.title} className="bg-card rounded-xl p-6 shadow-soft">
                  <h3 className="font-medium text-deep-brown mb-2">{tip.title}</h3>
                  <p className="text-soft-brown text-sm">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-deep-brown mb-8 text-center">
              Întrebări Frecvente
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Când pot dormi pe burtă sau pe o parte?",
                  a: "Se recomandă să dormiți pe spate primele 4-6 săptămâni. După această perioadă, puteți trece treptat la dormit pe o parte.",
                },
                {
                  q: "Când pot face sport?",
                  a: "Cardio ușor după 4-6 săptămâni. Exerciții pentru partea superioară a corpului după 3 luni.",
                },
                {
                  q: "Cât durează până când dispare umflătura?",
                  a: "Cea mai mare parte a edemului dispare în primele 2-4 săptămâni. Edemul rezidual poate persista 3-6 luni.",
                },
                {
                  q: "Când voi vedea rezultatul final?",
                  a: "Implanturile se așează complet în 3-6 luni. Rezultatul final este vizibil după această perioadă.",
                },
              ].map((item) => (
                <div key={item.q} className="bg-card rounded-xl p-6 shadow-soft">
                  <h3 className="font-medium text-deep-brown mb-2">{item.q}</h3>
                  <p className="text-soft-brown text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-semibold text-deep-brown mb-4">
              Ai întrebări despre recuperare?
            </h2>
            <p className="text-soft-brown mb-8">
              Suntem aici să te ghidăm în fiecare etapă a procesului.
            </p>
            <Button variant="hero" size="xl" className="group">
              Contactează-ne
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default GhidRecuperarePage;
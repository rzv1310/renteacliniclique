import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const ArticleMacromastie = () => {
  return (
    <PageLayout>
      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-soft-brown hover:text-rose-gold transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi la Blog
            </Link>

            <div className="flex items-center gap-4 text-sm text-soft-brown mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                16 Dec 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                9 min citire
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">
              Sâni prea mari? Cum evităm efectul de "bile" artificiale
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                O preocupare frecventă a pacientelor este teama de a obține un rezultat artificial, 
                cu sâni care arată ca "bile" sau "baloane". În acest articol, explicăm cum evităm 
                acest efect nedorit și ce înseamnă macromastia sau gigantomastia.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Ce înseamnă macromastie și gigantomastie?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Macromastia</strong> se referă la sâni anormal de mari care cauzează disconfort fizic, 
                dureri de spate, probleme posturale și dificultăți în activitățile zilnice. 
                <strong>Gigantomastia</strong> este o formă mai severă, caracterizată printr-o creștere 
                excesivă a țesutului mamar.
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                În contextul augmentării mamare, folosim acești termeni pentru a discuta despre 
                importanța alegerii unui volum proporțional cu anatomia pacientei.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                De ce apar rezultatele "artificiale"?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Efectul de "bile" apare de obicei din cauza uneia sau mai multor greșeli:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Volum prea mare pentru anatomie</strong> - implantul este disproporționat față de lățimea toracelui</li>
                <li><strong>Alegerea greșită a profilului</strong> - profil prea înalt pentru cantitatea de țesut acoperitor</li>
                <li><strong>Țesut insuficient</strong> - paciente foarte slabe fără țesut de acoperire</li>
                <li><strong>Plasare subglandulară greșită</strong> - când nu există suficient țesut pentru a camufla implantul</li>
                <li><strong>Implant prea proiectat</strong> - în special la paciente cu torace lat</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Cum obținem un rezultat natural?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Secretul unui rezultat estetic și natural stă în:
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                1. Respectarea limitelor anatomice
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Implantul nu trebuie să depășească lățimea naturală a bazei sânului. 
                Când limitele sunt depășite, implantul devine vizibil la margini și creează 
                aspectul artificial.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                2. Alegerea corectă a planului de plasare
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Pacientele cu țesut mamar redus beneficiază de plasarea implantului sub mușchi 
                (submuscular sau dual plane), care oferă acoperire suplimentară și reduce 
                vizibilitatea marginilor implantului.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                3. Selectarea formei potrivite
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Implanturile anatomice pot oferi un aspect mai natural pentru anumite paciente, 
                în timp ce cele rotunde sunt excelente când există suficient țesut de acoperire.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                4. Profilul adecvat
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Un profil prea înalt pe un torace lat poate crea aspectul de "bile". 
                Alegerea unui profil moderat sau moderat plus oferă adesea rezultate mai naturale.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Semnele unui implant prea mare
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Dacă vă gândiți la augmentare și vă temeți de un rezultat nepotrivit, 
                iată la ce să fiți atentă:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Spațiu exagerat între sâni (symmastia) sau lipsa oricărui spațiu</li>
                <li>Marginile implantului vizibile sau palpabile</li>
                <li>Aspect "bombat" sau prea rotund în partea superioară</li>
                <li>Rippling (ondulații vizibile ale implantului)</li>
                <li>Disconfort fizic, dureri de spate</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Ce fac dacă am deja un implant prea mare?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Dacă nu sunteți mulțumită de rezultatul actual, există soluții:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Revizie cu implant mai mic</strong> - schimbarea cu un volum mai potrivit</li>
                <li><strong>Schimbarea profilului</strong> - trecerea la un profil mai moderat</li>
                <li><strong>Explantare</strong> - în cazuri extreme, îndepărtarea completă a implanturilor</li>
                <li><strong>Mastopexy</strong> - lifting pentru a corecta ptoza care poate apărea</li>
              </ul>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Consultație pentru un rezultat natural
                </h3>
                <p className="text-soft-brown mb-6">
                  Prioritatea noastră este un rezultat care să vă facă să vă simțiți încrezătoare 
                  și confortabilă. Programați o consultație pentru o evaluare onestă și personalizată.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors"
                >
                  Programează consultația
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-serif text-lg font-semibold text-deep-brown mb-4">
                  Articole similare
                </h3>
                <div className="flex flex-col gap-2">
                  <Link to="/blog/implant-mamar-250-ml-400ml" className="text-rose-gold hover:underline">
                    Ghidul Mărimilor: Cum arată 250 ml vs 400 ml pe corpul tău?
                  </Link>
                  <Link to="/blog/implant-mamar-cu-profil-inalt-sau-moderat" className="text-rose-gold hover:underline">
                    Profil Înalt vs. Profil Moderat: Ce înseamnă proiecția implantului?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default ArticleMacromastie;

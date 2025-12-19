import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const ArticleAlaptareCuImplanturi = () => {
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
                12 Dec 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                8 min citire
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">
              Alăptarea după implanturi mamare: Mituri și Adevăr
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                "Voi mai putea alăpta după ce îmi pun implanturi?" Este una dintre cele mai 
                frecvente întrebări ale femeilor care își doresc să devină mame în viitor. 
                Vestea bună: în majoritatea cazurilor, răspunsul este DA.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Mitul principal: Implanturile împiedică alăptarea
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Acest mit persistent nu corespunde realității. Studiile arată că aproximativ 
                <strong> 75-90% dintre femeile cu implanturi</strong> pot alăpta cu succes. 
                Rata este similară cu cea a femeilor fără implanturi, deoarece capacitatea 
                de alăptare depinde de mulți factori individuali.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Ce factori influențează capacitatea de alăptare?
              </h2>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                1. Tipul de incizie
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Incizia submamară (în pliul sub sân)</strong> - cea mai sigură pentru alăptare, 
                nu afectează țesutul glandular sau nervii</li>
                <li><strong>Incizia axilară</strong> - de asemenea sigură, departe de zona mamară</li>
                <li><strong>Incizia periareolară</strong> - risc ușor mai mare de afectare a 
                canalelor galactofore, dar majoritatea femeilor alăptează normal</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                2. Planul de plasare
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Indiferent dacă implantul este plasat subglandular, submuscular sau dual plane, 
                țesutul glandular rămâne intact și funcțional. Implantul nu afectează producția de lapte.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                3. Capacitatea individuală
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Unele femei au dificultăți de alăptare indiferent dacă au sau nu implanturi. 
                Factori precum anatomia mamelonului, hipoplazia mamară preexistentă sau 
                problemele hormonale pot influența producția de lapte.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Este laptele sigur pentru bebeluș?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Da, absolut.</strong> Implanturile moderne din silicon cohesiv sunt 
                complet sigure pentru alăptare:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Siliconul nu trece în lapte - este un gel solid, nu lichid</li>
                <li>Chiar și în cazul rar al rupturii, siliconul nu se răspândește în organism</li>
                <li>Numeroase studii au confirmat că nu există diferențe în compoziția laptelui</li>
                <li>FDA și toate organizațiile medicale internaționale confirmă siguranța</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Recomandări pentru viitoare mame
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Dacă planificați să aveți copii în viitor și doriți să alăptați:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Comunicați dorința de a alăpta</strong> în consultație - chirurgul va alege 
                tehnica optimă</li>
                <li><strong>Incizia submamară</strong> este de preferat dacă alăptarea este prioritară</li>
                <li><strong>Așteptați minim 1 an</strong> după operație înainte de sarcină pentru 
                stabilizarea rezultatului</li>
                <li><strong>Sarcina poate modifica sânii</strong> - fie cu sau fără implanturi</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Ce se întâmplă cu sânii după sarcină și alăptare?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Este important să știți că sarcina și alăptarea pot modifica aspectul sânilor, 
                indiferent dacă aveți sau nu implanturi:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Sânii se măresc în timpul sarcinii și alăptării</li>
                <li>După terminarea alăptării, volumul scade</li>
                <li>Poate apărea un grad de ptoză (lăsare) din cauza modificărilor de volum</li>
                <li>Unele femei optează pentru o revizie sau mastopexie după ce au finalizat sarcinile</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Când să programați augmentarea?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Dacă știți că vă doriți copii în următorii 1-2 ani, puteți alege să:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Așteptați după sarcini</strong> - astfel evitați posibile modificări și 
                o eventuală revizie</li>
                <li><strong>Faceți operația acum</strong> - dacă doriți să vă bucurați de rezultat 
                și sunteți pregătită pentru o posibilă ajustare ulterioară</li>
              </ul>
              <p className="text-soft-brown leading-relaxed mb-6">
                Nu există o alegere "corectă" - depinde de preferințele și circumstanțele 
                dumneavoastră individuale.
              </p>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Planificați să aveți copii?
                </h3>
                <p className="text-soft-brown mb-6">
                  Discutați cu noi despre planurile dumneavoastră de familie. 
                  Vă vom consilia pentru a lua cea mai bună decizie.
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
                  <Link to="/blog/tehnici-insertie-implanturi" className="text-rose-gold hover:underline">
                    Tehnici de Inserție a Implanturilor Mamare
                  </Link>
                  <Link to="/blog/contractura-capsulara" className="text-rose-gold hover:underline">
                    Contractura Capsulară: Ce este și cum reducem riscul la minim?
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

export default ArticleAlaptareCuImplanturi;

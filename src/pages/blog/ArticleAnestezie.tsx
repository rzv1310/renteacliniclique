import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticleAnestezie = () => {
  return (
    <PageLayout>
      {/* Breadcrumb */}
      <PageBreadcrumb />

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
                15 Dec 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                7 min citire
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">
              Anestezia pentru augmentare mamară: Generală vs. Locală cu sedare
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                Una dintre întrebările frecvente ale pacientelor este legată de tipul de anestezie 
                folosit în timpul operației de augmentare mamară. Vă explicăm diferențele, 
                avantajele și ce puteți aștepta de la fiecare opțiune.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Anestezia generală
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Anestezia generală este metoda standard pentru majoritatea intervențiilor de augmentare mamară. 
                Pacienta este complet adormită pe întreaga durată a operației, fără să simtă sau să fie 
                conștientă de procedură.
              </p>
              
              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Avantaje
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Control complet al durerii - nu simțiți absolut nimic</li>
                <li>Relaxare musculară totală - facilitează plasarea implantului</li>
                <li>Confort psihologic - nu sunteți conștientă de intervenție</li>
                <li>Chirurgul poate lucra fără grabă pentru cel mai bun rezultat</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Ce implică?
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Evaluare pre-anestezică cu anestezistul</li>
                <li>Post nemâncat și nebăut din seara precedentă (minim 8 ore)</li>
                <li>Monitorizare continuă a funcțiilor vitale</li>
                <li>Recuperare în salon până la trezirea completă (1-2 ore)</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Anestezia locală cu sedare (MAC - Monitored Anesthesia Care)
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Această metodă combină infiltrarea locală cu anestezice (care amorțesc complet zona operată) 
                cu sedare intravenoasă care vă relaxează și vă face somnolentă, dar nu complet inconștientă.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Avantaje
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Recuperare mai rapidă - puteți pleca acasă mai devreme</li>
                <li>Mai puține efecte secundare (grețuri, amețeli)</li>
                <li>Risc anestezic mai mic pentru persoane cu afecțiuni</li>
                <li>Costul poate fi mai mic</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Dezavantaje
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Nu este potrivită pentru toate cazurile (plasare submusculară extinsă)</li>
                <li>Unele paciente pot simți presiune sau disconfort minim</li>
                <li>Necesită cooperarea pacientei</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Ce alegem în clinica noastră?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Decizia depinde de mai mulți factori:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Tipul de plasare</strong> - subglandular poate fi realizat și cu sedare; 
                submuscular necesită de obicei anestezie generală</li>
                <li><strong>Complexitatea intervenției</strong> - revizii sau combinații cu mastopexie 
                necesită anestezie generală</li>
                <li><strong>Preferințele pacientei</strong> - anxietatea ridicată favorizează anestezia generală</li>
                <li><strong>Starea de sănătate</strong> - anumite afecțiuni pot influența alegerea</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Pregătirea pentru anestezie
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Indiferent de tipul ales, pregătirea include:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Analize de sânge și EKG preoperator</li>
                <li>Consultație cu medicul anestezist</li>
                <li>Oprirea anumitor medicamente (aspirină, anticoagulante)</li>
                <li>Post alimentar și hidric conform indicațiilor</li>
                <li>Însoțitor pentru ziua operației</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                După anestezie
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                După anestezia generală, este normal să experimentați:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Somnolență în primele ore</li>
                <li>Posibile grețuri ușoare (avem medicație pentru aceasta)</li>
                <li>Ușoară confuzie temporară</li>
                <li>Senzație de frig sau tremurat</li>
              </ul>
              <p className="text-soft-brown leading-relaxed mb-6">
                Toate acestea se rezolvă în câteva ore, și veți fi monitorizată până când 
                starea dumneavoastră este stabilă.
              </p>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Discutați despre anestezie în consultație
                </h3>
                <p className="text-soft-brown mb-6">
                  Toate detaliile despre anestezie vor fi discutate în cadrul consultației. 
                  Nu ezitați să puneți întrebări - siguranța și confortul dumneavoastră sunt prioritatea noastră.
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
                  <Link to="/blog/cum-decurge-operatia-augmentare-mamara" className="text-rose-gold hover:underline">
                    Cum decurge operația de augmentare mamară: Pas cu pas
                  </Link>
                  <Link to="/blog/plasare-implant-subglandular-submuscular" className="text-rose-gold hover:underline">
                    Plasarea implantului: Subglandular vs. Submuscular
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

export default ArticleAnestezie;

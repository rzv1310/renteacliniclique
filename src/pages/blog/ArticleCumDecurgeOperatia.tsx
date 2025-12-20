import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import heroImage from "@/assets/heroes/hero-article-operatie.jpg";

const ArticleCumDecurgeOperatia = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Cum decurge operația" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 drop-shadow-lg">
            Cum decurge operația de augmentare mamară: Pas cu pas
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />11 min citire</span>
          </div>
        </div>
      </section>

      <PageBreadcrumb />
      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-soft-brown hover:text-rose-gold transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />Înapoi la Blog
            </Link>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                Știm că necunoscutul poate fi stresant. De aceea, vă oferim o imagine completă 
                a ceea ce se întâmplă din momentul în care ajungeți la clinică și până când 
                plecați acasă cu noul dumneavoastră bust.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Înainte de ziua operației
              </h2>
              
              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Consultația preoperatorie (cu 1-2 săptămâni înainte)
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Confirmarea deciziei și clarificarea ultimelor detalii</li>
                <li>Realizarea analizelor de sânge și investigațiilor necesare</li>
                <li>Consultația cu medicul anestezist</li>
                <li>Primirea instrucțiunilor preoperatorii scrise</li>
                <li>Semnarea consimțământului informat</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Cu 24 de ore înainte
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Duș cu săpun antibacterian</li>
                <li>Post alimentar din seara precedentă (de la ora 22:00)</li>
                <li>Nu consumați alcool sau nu fumați</li>
                <li>Pregătiți hainele confortabile pentru plecare (bluză cu nasturi)</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Ziua operației - Dimineața
              </h2>
              
              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                La sosire (cu 1-2 ore înainte de operație)
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Sunteți întâmpinată de echipa medicală</li>
                <li>Vi se oferă halatul și papucii de spital</li>
                <li>Asistenta vă verifică semnele vitale</li>
                <li>Chirurgul face desenele și marcajele pe piele</li>
                <li>Anestezistul vă vizitează pentru ultimele verificări</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                În sala de operație
              </h2>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Pregătirea (15-20 minute)
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Sunteți poziționată pe masa de operație</li>
                <li>Se montează monitorizarea (puls, tensiune, oxigen)</li>
                <li>Se introduce linia venoasă</li>
                <li>Anestezistul administrează anestezia</li>
                <li>Zona toracică este dezinfectată și acoperită steril</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Operația propriu-zisă (45-90 minute)
              </h3>
              <p className="text-soft-brown leading-relaxed mb-4">
                <strong>Pasul 1: Incizia</strong>
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                Chirurgul realizează incizia în locul stabilit (submamară, periareolară sau axilară). 
                Lungimea este de aproximativ 4-5 cm pentru implanturile standard.
              </p>

              <p className="text-soft-brown leading-relaxed mb-4">
                <strong>Pasul 2: Crearea buzunarului</strong>
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                Se creează spațiul pentru implant (subglandular, submuscular sau dual plane), 
                cu atenție la hemostază (oprirea sângerării) și simetrie.
              </p>

              <p className="text-soft-brown leading-relaxed mb-4">
                <strong>Pasul 3: Inserția implantului</strong>
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                Implantul este introdus folosind tehnici atraumatice și dispozitive speciale 
                (funnel Keller) pentru a minimiza contactul cu pielea și riscul de contaminare.
              </p>

              <p className="text-soft-brown leading-relaxed mb-4">
                <strong>Pasul 4: Verificarea și ajustarea</strong>
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                Pacienta este ridicată în poziție semișezândă pentru a verifica simetria și aspectul. 
                Se fac ajustări dacă este necesar.
              </p>

              <p className="text-soft-brown leading-relaxed mb-4">
                <strong>Pasul 5: Închiderea</strong>
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                Incizia este închisă în straturi multiple cu fire resorbabile. 
                Se aplică pansamente și sutienul de compresie.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                După operație - Sala de trezire
              </h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Sunteți monitorizată până la trezirea completă (30-60 minute)</li>
                <li>Primiți medicație pentru durere și greață dacă este necesar</li>
                <li>Vi se oferă apă și gustări ușoare</li>
                <li>Chirurgul vă vizitează pentru a vă explica cum a decurs</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Plecarea acasă
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                După 2-4 ore de monitorizare, dacă totul este în regulă:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Primiți instrucțiunile postoperatorii scrise</li>
                <li>Vi se înmânează rețeta cu medicamentele necesare</li>
                <li>Se programează primul control (de obicei la 3-5 zile)</li>
                <li>Plecați acasă însoțită de o persoană de încredere</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Ce să așteptați în primele ore
              </h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Senzație de tensiune și presiune în zona pieptului</li>
                <li>Durere controlabilă cu medicația prescrisă</li>
                <li>Posibilă somnolență de la anestezie</li>
                <li>Sânii vor părea mai sus și mai strânși decât rezultatul final</li>
              </ul>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Întrebări despre procedură?
                </h3>
                <p className="text-soft-brown mb-6">
                  Programați o consultație pentru a discuta toate detaliile și pentru a vă simți 
                  complet pregătită pentru această experiență.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">
                  Programează consultația
                </Link>
              </div>

              {/* Recommended Section */}
              <div className="mt-16 pt-8 border-t border-border">
                <h3 className="font-serif text-2xl font-semibold text-deep-brown mb-8">Resurse Recomandate</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link to="/proceduri/implant-mamar-bucuresti" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Serviciu</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Augmentare Mamară București</h4>
                    <p className="text-soft-brown text-sm mt-2">Descoperă procedura completă de mărire a sânilor.</p>
                    <span className="inline-flex items-center gap-1 text-rose-gold text-sm mt-4">Află mai multe <ArrowRight className="w-4 h-4" /></span>
                  </Link>
                  <Link to="/blog/anestezie-augmentare-mamara" className="group block bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs uppercase tracking-wider text-rose-gold font-medium">Articol</span>
                    <h4 className="font-serif text-lg font-semibold text-deep-brown mt-2 group-hover:text-rose-gold transition-colors">Anestezia pentru augmentare mamară</h4>
                    <p className="text-soft-brown text-sm mt-2">Generală vs. Locală - ce opțiune este potrivită.</p>
                    <span className="inline-flex items-center gap-1 text-rose-gold text-sm mt-4">Citește articolul <ArrowRight className="w-4 h-4" /></span>
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

export default ArticleCumDecurgeOperatia;

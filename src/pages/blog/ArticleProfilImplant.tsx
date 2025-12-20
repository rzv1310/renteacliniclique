import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticleProfilImplant = () => {
  return (
    <PageLayout>
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
                17 Dec 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                8 min citire
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">
              Profil Înalt vs. Profil Moderat: Ce înseamnă proiecția implantului?
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                Pe lângă volum și formă, profilul implantului este un factor crucial care determină 
                cât de mult se proiectează sânul de pe peretele toracic. Înțelegerea acestui concept 
                vă va ajuta să faceți o alegere informată.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Ce este profilul implantului?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Profilul se referă la gradul de proiecție al implantului - cât de mult "iese în față" 
                de pe peretele toracic. Pentru același volum, un implant cu profil înalt va fi mai îngust 
                la bază și mai proiectat, în timp ce unul cu profil moderat va fi mai lat și mai plat.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Tipuri de profile disponibile
              </h2>
              
              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Profil Moderat (Low Profile)
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Implanturile cu profil moderat au o bază mai largă și o proiecție mai mică. 
                Acestea sunt ideale pentru pacientele cu torace mai lat care doresc un aspect natural 
                și o creștere subtilă a volumului.
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Aspect mai natural și mai puțin "rotund"</li>
                <li>Potrivit pentru torace lat</li>
                <li>Tranziție mai blândă între implant și țesutul natural</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Profil Moderat Plus
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                O opțiune intermediară care oferă un echilibru între proiecție și lățime. 
                Este una dintre cele mai populare alegeri datorită versatilității sale.
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Profil Înalt (High Profile)
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Implanturile cu profil înalt au o bază mai îngustă și o proiecție maximă. 
                Acestea creează un bust mai plin și mai proeminent.
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Proiecție maximă pentru un bust plin</li>
                <li>Ideal pentru torace îngust</li>
                <li>Creează mai mult "decolteu"</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Profil Extra Înalt (Ultra High Profile)
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Cel mai proiectat tip de implant, recomandat în situații specifice, de obicei 
                pentru paciente cu torace foarte îngust sau pentru reconstrucție mamară.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Cum alegem profilul potrivit?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Alegerea profilului depinde de mai mulți factori:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Lățimea toracelui</strong> - torace îngust → profil înalt; torace lat → profil moderat</li>
                <li><strong>Lățimea bazei sânului</strong> - determinată de anatomia existentă</li>
                <li><strong>Volumul dorit</strong> - pentru a obține un anumit volum pe un torace îngust, este necesar un profil mai înalt</li>
                <li><strong>Stilul de viață</strong> - sportivele pot prefera un profil mai moderat</li>
                <li><strong>Preferințele estetice</strong> - aspect natural vs. mai dramatic</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Exemple practice
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Exemplu 1:</strong> O pacientă cu torace de 28 cm lățime care dorește 350 ml 
                va obține un rezultat mai estetic cu un implant de profil înalt (bază ~11 cm) 
                decât cu unul moderat (bază ~13 cm) care ar depăși limitele anatomice.
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Exemplu 2:</strong> O pacientă cu torace de 34 cm care dorește 350 ml 
                poate alege un profil moderat sau moderat plus pentru un aspect natural, 
                fără a compromite proporțiile.
              </p>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Consultație pentru alegerea profilului ideal
                </h3>
                <p className="text-soft-brown mb-6">
                  Alegerea corectă a profilului este esențială pentru un rezultat armonios. 
                  Programați o consultație pentru o evaluare personalizată.
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
                  <Link to="/blog/implanturi-rotunde-vs-anatomice" className="text-rose-gold hover:underline">
                    Implanturi Rotunde vs. Anatomice: Ghid Complet
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

export default ArticleProfilImplant;

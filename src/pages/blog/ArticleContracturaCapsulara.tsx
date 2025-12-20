import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticleContracturaCapsulara = () => {
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
                10 Dec 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                9 min citire
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">
              Contractura Capsulară: Ce este și cum reducem riscul la minim?
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                Contractura capsulară este una dintre complicațiile despre care se vorbește 
                cel mai mult în contextul implanturilor mamare. Înțelegerea acestui fenomen 
                vă va ajuta să luați măsuri preventive și să recunoașteți semnele precoce.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Ce este contractura capsulară?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Când este introdus orice obiect străin în corp, organismul formează natural 
                o capsulă de țesut cicatricial în jurul acestuia. Aceasta este o reacție 
                normală și de fapt ajută la menținerea implantului în poziție.
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Contractura capsulară</strong> apare când această capsulă devine anormal 
                de groasă și rigidă, strângând implantul. Rezultatul poate fi disconfort, 
                modificarea formei sânului și, în cazuri severe, durere.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Gradele de contractură (Scala Baker)
              </h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Gradul I:</strong> Sânul arată și se simte normal - capsula este moale și flexibilă</li>
                <li><strong>Gradul II:</strong> Sânul arată normal dar este mai ferm la palpare</li>
                <li><strong>Gradul III:</strong> Sânul este ferm și arată anormal (deformat)</li>
                <li><strong>Gradul IV:</strong> Sânul este dur, dureros și vizibil deformat</li>
              </ul>
              <p className="text-soft-brown leading-relaxed mb-6">
                Gradele I și II sunt considerate normale și nu necesită intervenție. 
                Gradele III și IV pot necesita revizie chirurgicală.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Ce cauzează contractura capsulară?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Cauza exactă nu este pe deplin înțeleasă, dar factorii de risc includ:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Hematom sau serom</strong> - acumulare de sânge sau lichid în jurul implantului</li>
                <li><strong>Infecție subclinică</strong> - bacterii în cantități mici în jurul implantului</li>
                <li><strong>Biofilm bacterian</strong> - colonii bacteriene pe suprafața implantului</li>
                <li><strong>Plasare subglandulară</strong> - risc ușor mai mare decât submuscular</li>
                <li><strong>Implant neted</strong> - risc mai mare decât cele texturate</li>
                <li><strong>Radioterapie</strong> - la pacientele cu cancer mamar</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Cum prevenim contractura capsulară?
              </h2>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Măsuri intraoperatorii (ce facem noi)
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Tehnici sterile riguroase și antibioterapie profilactică</li>
                <li>Utilizarea dispozitivului Keller Funnel pentru introducerea implantului fără contact cu pielea</li>
                <li>Irigarea buzunarului cu soluție antibiotică</li>
                <li>Hemostază meticuloasă (oprirea completă a sângerării)</li>
                <li>Alegerea plasării submusculare sau dual plane când este indicat</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                Ce puteți face dumneavoastră
              </h3>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Masaj mamar</strong> - conform instrucțiunilor (începând de la 2-4 săptămâni postoperator)</li>
                <li><strong>Purtarea sutienului de compresie</strong> - în primele săptămâni</li>
                <li><strong>Evitarea traumatismelor</strong> - protejați zona în timpul sportului</li>
                <li><strong>Controale regulate</strong> - pentru detectarea precoce</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Cât de frecventă este contractura capsulară?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Cu tehnicile moderne, rata contracturii capsulare semnificative (grad III-IV) 
                este de aproximativ <strong>5-10%</strong> la 10 ani. Aceasta a scăzut semnificativ 
                față de deceniile anterioare datorită:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Implanturilor cu suprafață texturată sau nanotexturată</li>
                <li>Tehnicilor chirurgicale îmbunătățite</li>
                <li>Protocoalelor de sterilitate avansate</li>
                <li>Plasării preferențiale sub mușchi</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Tratamentul contracturii capsulare
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Dacă apare contractura capsulară:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Grad II:</strong> Monitorizare și masaj intensificat</li>
                <li><strong>Grad III-IV:</strong> Capsulotomie (eliberarea capsulei) sau 
                capsulectomie (îndepărtarea capsulei) cu înlocuirea implantului</li>
                <li>Posibil schimbarea planului de plasare (din subglandular în submuscular)</li>
                <li>În unele cazuri, tratament cu medicamente (vitamina E, inhibitori de leucotriene)</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Semne de alarmă
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Contactați-ne dacă observați:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Înăsprirea progresivă a sânului</li>
                <li>Modificarea formei (rotunjire excesivă, deplasare în sus)</li>
                <li>Durere sau disconfort persistent</li>
                <li>Asimetrie nouă între cei doi sâni</li>
              </ul>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Controale regulate pentru siguranță
                </h3>
                <p className="text-soft-brown mb-6">
                  Controalele periodice ne permit să detectăm orice modificare precoce. 
                  Programați-vă controlul anual.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors"
                >
                  Programează controlul
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-serif text-lg font-semibold text-deep-brown mb-4">
                  Articole similare
                </h3>
                <div className="flex flex-col gap-2">
                  <Link to="/blog/masajul-sanilor-dupa-implant" className="text-rose-gold hover:underline">
                    Masajul sânilor după implant: Tehnică și beneficii
                  </Link>
                  <Link to="/blog/implant-mamar-deplasat" className="text-rose-gold hover:underline">
                    Implant mamar deplasat: Semne și soluții
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

export default ArticleContracturaCapsulara;

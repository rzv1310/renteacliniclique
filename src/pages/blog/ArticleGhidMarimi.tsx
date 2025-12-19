import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const ArticleGhidMarimi = () => {
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
                18 Dec 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                10 min citire
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">
              Ghidul Mărimilor: Cum arată 250 ml vs 400 ml pe corpul tău?
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                Una dintre cele mai frecvente întrebări pe care le primim este: "Ce mărime de implant ar trebui să aleg?" 
                Răspunsul nu este simplu, deoarece același volum poate arăta foarte diferit în funcție de anatomia fiecărei paciente.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                De ce aceeași mărime arată diferit?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Volumul implantului (exprimat în ml sau cc) este doar unul dintre factorii care determină rezultatul final. 
                Alte elemente cruciale includ:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Lățimea toracelui</strong> - un implant de 350 ml va arăta mai mare pe un torace îngust</li>
                <li><strong>Țesutul mamar existent</strong> - mai mult țesut = tranziție mai naturală</li>
                <li><strong>Înălțimea și greutatea</strong> - proporțiile generale ale corpului contează</li>
                <li><strong>Tonusul pielii</strong> - elasticitatea pielii influențează forma finală</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Interval 200-250 ml: Aspect Natural-Subtil
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Acest interval este ideal pentru pacientele care doresc o îmbunătățire subtilă, trecând de la un cup A la un cup B-C. 
                Rezultatul este o siluetă feminină și naturală, perfect potrivită pentru cele care nu doresc o schimbare dramatică.
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Potrivit pentru:</strong> Paciente cu constituție mică-medie, care preferă un look discret și natural.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Interval 300-350 ml: Echilibrul Perfect
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Aceasta este gama cea mai populară, oferind un rezultat vizibil dar încă natural. 
                Majoritatea pacientelor cu înălțime și greutate medie (160-170 cm, 55-65 kg) obțin rezultate excelente în acest interval.
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Potrivit pentru:</strong> Majoritatea pacientelor care doresc un rezultat vizibil dar proporțional.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Interval 400-450 ml: Volum Generos
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Pentru pacientele care doresc un volum mai generos, acest interval oferă un bust impresionant. 
                Este important ca anatomia să permită acest volum pentru a evita complicațiile și a menține un aspect estetic plăcut.
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Potrivit pentru:</strong> Paciente cu constituție mai robustă, torace larg, și care doresc un rezultat mai dramatic.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Cum alegem mărimea potrivită?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                În cadrul consultației, folosim mai multe metode pentru a determina mărimea ideală:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Măsurători precise</strong> - lățimea bazei sânului, distanța până la stern, elasticitatea pielii</li>
                <li><strong>Sizer-e de probă</strong> - puteți încerca diferite volume în sutien pentru a vizualiza rezultatul</li>
                <li><strong>Simulare 3D</strong> - tehnologie avansată care arată rezultatul pe corpul dumneavoastră</li>
                <li><strong>Galerie foto</strong> - exemple de paciente cu anatomie similară</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Greșeli frecvente în alegerea mărimii
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Din experiența noastră, cele mai comune greșeli sunt:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Alegerea unui volum prea mare pentru anatomia proprie</li>
                <li>Comparația cu alte persoane fără a ține cont de diferențele anatomice</li>
                <li>Focusarea exclusiv pe cup size (care variază între producători)</li>
                <li>Ignorarea recomandărilor chirurgului</li>
              </ul>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Programează o consultație personalizată
                </h3>
                <p className="text-soft-brown mb-6">
                  Fiecare pacientă este unică. În cadrul consultației, vom analiza împreună anatomia dumneavoastră 
                  și vom determina mărimea optimă pentru rezultatul dorit.
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
                  <Link to="/blog/implanturi-rotunde-vs-anatomice" className="text-rose-gold hover:underline">
                    Implanturi Rotunde vs. Anatomice: Ghid Complet
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

export default ArticleGhidMarimi;

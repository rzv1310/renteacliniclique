import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticlePlasareImplant = () => {
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
                14 Dec 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                9 min citire
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">
              Plasarea implantului: Subglandular vs. Submuscular (Dual Plane)
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">
                Unde este plasat implantul mamar? Aceasta este una dintre deciziile chirurgicale 
                cruciale care influențează atât aspectul final, cât și recuperarea. Înțelegeți 
                diferențele pentru a face cea mai bună alegere.
              </p>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Planurile de plasare a implantului
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Există trei opțiuni principale pentru poziționarea implantului mamar:
              </p>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                1. Subglandular (deasupra mușchiului)
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Implantul este plasat între țesutul glandular al sânului și mușchiul pectoral. 
                Este o tehnică mai puțin invazivă cu recuperare mai rapidă.
              </p>
              <p className="text-soft-brown leading-relaxed mb-4"><strong>Avantaje:</strong></p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Recuperare mai rapidă și mai puțin dureroasă</li>
                <li>Mișcare mai naturală a sânului</li>
                <li>Implantul nu se deformează la contractarea mușchiului (important pentru sportive)</li>
                <li>Intervenție mai scurtă</li>
              </ul>
              <p className="text-soft-brown leading-relaxed mb-4"><strong>Dezavantaje:</strong></p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Marginile implantului pot fi vizibile la paciente slabe</li>
                <li>Risc mai mare de rippling (ondulații)</li>
                <li>Potențial risc mai mare de contractură capsulară</li>
                <li>Poate afecta mamografiile</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                2. Submuscular (complet sub mușchi)
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Implantul este plasat complet sub mușchiul pectoral mare. 
                Oferă acoperire maximă a implantului.
              </p>
              <p className="text-soft-brown leading-relaxed mb-4"><strong>Avantaje:</strong></p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Acoperire maximă - ideal pentru paciente slabe</li>
                <li>Risc redus de rippling</li>
                <li>Aspect mai natural în zona superioară</li>
                <li>Posibil risc mai mic de contractură capsulară</li>
              </ul>
              <p className="text-soft-brown leading-relaxed mb-4"><strong>Dezavantaje:</strong></p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Recuperare mai lungă și mai dureroasă</li>
                <li>Deformarea implantului la contractarea mușchiului ("animation deformity")</li>
                <li>Poziție mai înaltă a implantului care se așază în timp</li>
              </ul>

              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">
                3. Dual Plane (tehnică hibridă)
              </h3>
              <p className="text-soft-brown leading-relaxed mb-6">
                Aceasta este tehnica modernă preferată în majoritatea cazurilor. 
                Partea superioară a implantului este sub mușchi, iar partea inferioară 
                este sub glandă. Combină avantajele ambelor tehnici.
              </p>
              <p className="text-soft-brown leading-relaxed mb-4"><strong>Avantaje:</strong></p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Acoperire bună în zona superioară (ascunde marginea implantului)</li>
                <li>Aspect mai natural decât submuscular complet</li>
                <li>Mai puțină deformare la contractarea mușchiului</li>
                <li>Versatilitate - există mai multe variante de dual plane</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Tipurile de Dual Plane
              </h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Dual Plane I</strong> - cea mai mică eliberare a mușchiului, pentru sâni ferm</li>
                <li><strong>Dual Plane II</strong> - eliberare moderată, cel mai frecvent utilizat</li>
                <li><strong>Dual Plane III</strong> - eliberare maximă, pentru sâni cu ptoză ușoară</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Cum alegem planul potrivit?
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                Decizia se bazează pe:
              </p>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Cantitatea de țesut</strong> - pacientele slabe necesită acoperire musculară</li>
                <li><strong>Calitatea pielii</strong> - pielea subțire beneficiază de plasare sub mușchi</li>
                <li><strong>Gradul de ptoză</strong> - sâni lăsați pot necesita dual plane III sau mastopexie</li>
                <li><strong>Activitatea sportivă</strong> - culturistele pot prefera subglandular</li>
                <li><strong>Tipul de implant</strong> - implanturile cu silicon cohesiv sunt mai flexibile</li>
              </ul>

              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">
                Recuperarea în funcție de plan
              </h2>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Subglandular:</strong> Recuperare mai ușoară, durere moderată 3-5 zile, 
                revenire la activități normale în 1-2 săptămâni.
              </p>
              <p className="text-soft-brown leading-relaxed mb-6">
                <strong>Submuscular/Dual Plane:</strong> Durere mai intensă în primele 3-5 zile 
                (mușchiul are nevoie de timp să se adapteze), restricții de mișcare mai lungi, 
                revenire completă în 4-6 săptămâni.
              </p>

              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">
                  Consultație pentru planul optim
                </h3>
                <p className="text-soft-brown mb-6">
                  Alegerea planului de plasare este personalizată pentru fiecare pacientă. 
                  Programați o consultație pentru o evaluare detaliată.
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
                  <Link to="/blog/anestezie-augmentare-mamara" className="text-rose-gold hover:underline">
                    Anestezia pentru augmentare mamară: Generală vs. Locală
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

export default ArticlePlasareImplant;

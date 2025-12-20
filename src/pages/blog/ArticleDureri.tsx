import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticleDureri = () => {
  return (
    <PageLayout>
      <PageBreadcrumb />
      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-soft-brown hover:text-rose-gold transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />Înapoi la Blog
            </Link>
            <div className="flex items-center gap-4 text-sm text-soft-brown mb-6">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />8 Dec 2024</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />7 min citire</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">Durerile după implant mamar: Ce e normal și când să te îngrijorezi</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">Durerea postoperatorie este normală și de așteptat. Însă este important să știți ce nivel de durere este acceptabil și când ar trebui să ne contactați.</p>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Timeline-ul durerii normale</h2>
              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">Zilele 1-3: Durere moderată-severă</h3>
              <p className="text-soft-brown leading-relaxed mb-6">Aceasta este perioada cea mai intensă. Veți simți presiune, tensiune și durere la nivelul pieptului. Medicația prescrisă controlează eficient aceste simptome.</p>
              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">Zilele 4-7: Durere moderată</h3>
              <p className="text-soft-brown leading-relaxed mb-6">Durerea scade semnificativ. Majoritatea pacientelor trec la analgezice mai ușoare (paracetamol, ibuprofen).</p>
              <h3 className="font-serif text-xl font-medium text-deep-brown mt-8 mb-3">Săptămânile 2-4: Disconfort ușor</h3>
              <p className="text-soft-brown leading-relaxed mb-6">Senzații de înțepături, arsuri sau "curenți" pe măsură ce nervii se regenerează. Acestea sunt semne bune de vindecare.</p>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Când să ne contactați</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Durere care se intensifică brusc după ce s-a ameliorat</li>
                <li>Durere însoțită de febră peste 38°C</li>
                <li>Roșeață sau căldură excesivă pe un sân</li>
                <li>Durere asimetrică semnificativă între cei doi sâni</li>
              </ul>
              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Nelămuriri despre durere?</h3>
                <p className="text-soft-brown mb-6">Nu ezitați să ne contactați dacă aveți îngrijorări.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">Contactează-ne</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};
export default ArticleDureri;

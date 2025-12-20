import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticleCicatrici = () => {
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />7 min citire</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">Cicatrici după implant: Evoluție în primele 12 luni</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">Cicatricile sunt inevitabile, dar cu îngrijire corectă devin aproape invizibile în timp.</p>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Evoluția cicatricii</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Săptămânile 1-2:</strong> Roșie, ușor umflată - normal</li>
                <li><strong>Lunile 1-3:</strong> Poate deveni mai roșie/roz - faza de maturare</li>
                <li><strong>Lunile 3-6:</strong> Începe să se estompeze</li>
                <li><strong>Lunile 6-12:</strong> Devine mai deschisă la culoare</li>
                <li><strong>După 12 luni:</strong> Aproape invizibilă la majoritatea pacientelor</li>
              </ul>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Îngrijirea cicatricii</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Folii sau geluri cu silicon (după vindecarea completă)</li>
                <li>Protecție solară - expunerea duce la pigmentare</li>
                <li>Masaj ușor pentru a preveni aderențele</li>
                <li>Hidratare regulată</li>
              </ul>
              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Sfaturi personalizate</h3>
                <p className="text-soft-brown mb-6">La control vă vom recomanda cele mai bune produse pentru tipul dumneavoastră de piele.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">Programează controlul</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};
export default ArticleCicatrici;

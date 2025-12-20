import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticleAsezareImplant = () => {
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />6 min citire</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">În cât timp se așază implantul mamar?</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">Procesul de "drop and fluff" - coborâre și umplere - este normal și necesar pentru rezultatul final.</p>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Ce este "drop and fluff"?</h2>
              <p className="text-soft-brown leading-relaxed mb-6">Imediat după operație, implanturile par prea sus și prea strânse. În lunile următoare, ele coboară în poziția naturală (drop) și țesuturile se relaxează, creând un aspect mai plin în partea inferioară (fluff).</p>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Timeline</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Luna 1:</strong> Implanturile sunt sus, sânii par strânși</li>
                <li><strong>Lunile 2-3:</strong> Începe coborârea vizibilă</li>
                <li><strong>Lunile 3-6:</strong> Cea mai mare parte a așezării</li>
                <li><strong>6-12 luni:</strong> Rezultat final, complet stabilizat</li>
              </ul>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Factori care influențează</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Plasarea submuscular vs subglandular (submuscular = așezare mai lentă)</li>
                <li>Elasticitatea pielii</li>
                <li>Mărimea implantului</li>
                <li>Masajul și exercițiile recomandate</li>
              </ul>
              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Răbdare este cheia!</h3>
                <p className="text-soft-brown mb-6">Nu judecați rezultatul final în primele luni. Controalele periodice vă vor arăta progresul.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">Programează controlul</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};
export default ArticleAsezareImplant;

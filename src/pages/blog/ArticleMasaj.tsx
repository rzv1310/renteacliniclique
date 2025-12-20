import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticleMasaj = () => {
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
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">Masajul sânilor după implant: Tehnică și beneficii</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">Masajul mamar postoperator poate ajuta la menținerea suplețelor sânilor și la reducerea riscului de contractură capsulară.</p>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Când începem masajul?</h2>
              <p className="text-soft-brown leading-relaxed mb-6">De obicei, masajul se începe la 2-4 săptămâni după operație, conform indicațiilor chirurgului. Nu începeți fără acordul medical.</p>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Tehnica de bază</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Aplicați presiune ușoară în sus, în jos, spre interior și exterior</li>
                <li>Mențineți 10-15 secunde în fiecare direcție</li>
                <li>Repetați de 2-3 ori pe zi</li>
                <li>Durata totală: 5-10 minute per sesiune</li>
              </ul>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Beneficii</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Menține buzunarul flexibil</li>
                <li>Reduce riscul de contractură capsulară</li>
                <li>Ajută la așazarea implantului</li>
                <li>Crește confortul pe termen lung</li>
              </ul>
              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Instrucțiuni personalizate</h3>
                <p className="text-soft-brown mb-6">Tehnica de masaj va fi demonstrată la controlul postoperator.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">Programează controlul</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};
export default ArticleMasaj;

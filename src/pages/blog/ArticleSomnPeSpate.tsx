import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticleSomnPeSpate = () => {
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />5 min citire</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">Cât timp să dormi pe spate după implant mamar?</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">Poziția de somn este importantă în recuperare. Aflați recomandările pentru un rezultat optim.</p>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Recomandări pe perioade</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li><strong>Săptămânile 1-2:</strong> Dormit pe spate, cu trunchiul ridicat la 30-45°</li>
                <li><strong>Săptămânile 3-4:</strong> Puteți coborî treptat unghiul, dar rămâneți pe spate</li>
                <li><strong>Săptămânile 4-6:</strong> Somn pe spate, puteți încerca ușor pe o parte</li>
                <li><strong>După 6 săptămâni:</strong> Puteți dormi în orice poziție confortabilă</li>
              </ul>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">De ce este important?</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Reduce presiunea pe implanturi</li>
                <li>Previne deplasarea în perioada de vindecare</li>
                <li>Minimizează umflarea</li>
                <li>Permite vindecarea optimă a țesuturilor</li>
              </ul>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Tips pentru somn confortabil</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Folosiți perne de călătorie în formă de U sub brațe</li>
                <li>O pernă sub genunchi reduce tensiunea din spate</li>
                <li>Puneți perne de-o parte și de alta pentru a nu vă întoarce involuntar</li>
              </ul>
              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Întrebări despre recuperare?</h3>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">Contactează-ne</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};
export default ArticleSomnPeSpate;

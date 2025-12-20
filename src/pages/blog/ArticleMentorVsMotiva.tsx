import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticleMentorVsMotiva = () => {
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />8 min citire</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-8">Mentor vs. Motiva: Ce alegem pentru tine?</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soft-brown leading-relaxed mb-8">Mentor și Motiva sunt două dintre cele mai apreciate branduri de implanturi mamare. Comparăm caracteristicile pentru a vă ajuta să înțelegeți diferențele.</p>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Mentor (Johnson & Johnson)</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Cel mai mare producător mondial de implanturi</li>
                <li>Gel MemoryGel - cohesiv și natural la atingere</li>
                <li>Garanție pe viață pentru rupturi</li>
                <li>Istoric lung de siguranță</li>
              </ul>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Motiva</h2>
              <ul className="list-disc pl-6 text-soft-brown space-y-2 mb-6">
                <li>Tehnologie inovatoare ProgressiveGel Ultima</li>
                <li>Suprafață SilkSurface sau VelvetSurface</li>
                <li>BluSeal - strat de siguranță vizibil</li>
                <li>Ergonomix - implant care se adaptează la mișcare</li>
              </ul>
              <h2 className="font-serif text-2xl font-semibold text-deep-brown mt-12 mb-4">Care este mai bun?</h2>
              <p className="text-soft-brown leading-relaxed mb-6">Ambele sunt excelente. Alegerea depinde de preferințele individuale, anatomie și rezultatul dorit. În consultație vom discuta ce se potrivește cel mai bine pentru dumneavoastră.</p>
              <div className="bg-secondary/50 rounded-2xl p-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-deep-brown mb-4">Consultație pentru alegerea implantului</h3>
                <p className="text-soft-brown mb-6">Vă ajutăm să alegeți brandul și modelul optim pentru rezultatul dorit.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-full hover:bg-rose-gold/90 transition-colors">Programează consultația</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};
export default ArticleMentorVsMotiva;

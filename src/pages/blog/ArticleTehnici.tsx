import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const ArticleTehnici = () => {
  return (
    <PageLayout>
      <article className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-soft-brown hover:text-rose-gold transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Înapoi la Blog
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-soft-brown mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />5 Dec 2024</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />7 min citire</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-6">
              Tehnici de Inserție a Implanturilor
            </h1>

            <div className="prose prose-lg max-w-none text-soft-brown">
              <p className="lead text-lg">
                Există mai multe tehnici pentru plasarea implanturilor mamare. Fiecare are avantajele și dezavantajele sale.
              </p>

              <h2 className="font-serif text-2xl text-deep-brown mt-8 mb-4">Incizie Submamară</h2>
              <p>Cea mai comună tehnică, cu cicatrice în pliul submam. Oferă control maxim chirurgului.</p>

              <h2 className="font-serif text-2xl text-deep-brown mt-8 mb-4">Incizie Periareolară</h2>
              <p>Cicatrice în jurul areolei. Cicatrice mai puțin vizibilă, dar nu potrivită pentru toate cazurile.</p>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default ArticleTehnici;
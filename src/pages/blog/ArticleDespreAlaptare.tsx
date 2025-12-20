import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ArticleDespreAlaptare = () => {
  return (
    <PageLayout>
      <PageBreadcrumb />
      <article className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-soft-brown hover:text-rose-gold transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Înapoi la Blog
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-soft-brown mb-4">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />6 min citire</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-brown mb-6">
              Alăptarea După Augmentare Mamară
            </h1>

            <div className="prose prose-lg max-w-none text-soft-brown">
              <p className="lead text-lg">
                Una dintre cele mai frecvente întrebări pe care le primim este despre posibilitatea alăptării după augmentare.
              </p>

              <h2 className="font-serif text-2xl text-deep-brown mt-8 mb-4">Este Posibilă Alăptarea?</h2>
              <p>Da, majoritatea femeilor pot alăpta normal după augmentare mamară. Tehnicile moderne prezervă țesutul glandular.</p>

              <h2 className="font-serif text-2xl text-deep-brown mt-8 mb-4">Factori Importanți</h2>
              <p>Tipul de incizie și plasarea implantului pot influența capacitatea de alăptare. Discută aceste aspecte cu chirurgul.</p>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default ArticleDespreAlaptare;
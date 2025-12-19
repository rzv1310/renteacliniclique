import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const articles = [
  {
    slug: "implanturi-rotunde-vs-anatomice",
    title: "Implanturi Rotunde vs. Anatomice: Ghid Complet",
    excerpt: "Descoperă diferențele cheie între cele două tipuri principale de implanturi și află care este potrivit pentru tine.",
    date: "15 Dec 2024",
    readTime: "8 min",
  },
  {
    slug: "alaptare-dupa-augmentare-mamara",
    title: "Alăptarea După Augmentare Mamară: Tot Ce Trebuie Să Știi",
    excerpt: "Răspundem la cele mai frecvente întrebări despre posibilitatea alăptării după operația de mărire a sânilor.",
    date: "10 Dec 2024",
    readTime: "6 min",
  },
  {
    slug: "tehnici-insertie-implanturi",
    title: "Tehnici de Inserție a Implanturilor Mamare",
    excerpt: "Explorează diferitele tehnici chirurgicale pentru plasarea implanturilor și avantajele fiecăreia.",
    date: "5 Dec 2024",
    readTime: "7 min",
  },
];

const BlogIndex = () => {
  return (
    <PageLayout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
              Blog
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-deep-brown mb-6">
              Resurse și <span className="text-gradient-gold">Articole</span>
            </h1>
            <p className="text-lg text-soft-brown">
              Informații verificate despre augmentarea mamară, scrise de experți.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="block bg-card rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-elegant transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 text-sm text-soft-brown mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span>{article.readTime} citire</span>
                </div>
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-deep-brown mb-2 group-hover:text-rose-gold transition-colors">
                  {article.title}
                </h2>
                <p className="text-soft-brown mb-4">{article.excerpt}</p>
                <span className="text-rose-gold flex items-center gap-1 text-sm font-medium">
                  Citește articolul
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogIndex;
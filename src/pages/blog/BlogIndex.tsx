import { Link } from "react-router-dom";
import { ArrowRight, Ruler, Stethoscope, Shield, Award } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SEOHead from "@/components/SEOHead";
import heroBlog from "@/assets/heroes/hero-blog.jpg";

const clusterMarimeForma = [
  {
    slug: "implanturi-rotunde-vs-anatomice",
    title: "Implanturi Rotunde vs. Anatomice: Ghid Complet",
    excerpt: "Descoperă diferențele cheie între cele două tipuri principale de implanturi și află care este potrivit pentru tine.",
    date: "15 Dec 2024",
    readTime: "8 min",
  },
  {
    slug: "implant-mamar-250-ml-400ml",
    title: "Ghidul Mărimilor: Cum arată 250 ml vs 400 ml pe corpul tău?",
    excerpt: "Vizualizează diferențele reale între volumele de implant și află cum să alegi mărimea potrivită pentru anatomia ta.",
    date: "12 Dec 2024",
    readTime: "7 min",
  },
  {
    slug: "implant-mamar-cu-profil-inalt-sau-moderat",
    title: "Profil Înalt vs. Profil Moderat: Ce înseamnă proiecția implantului?",
    excerpt: "Înțelege cum profilul implantului influențează rezultatul final și care variantă se potrivește stilului tău de viață.",
    date: "10 Dec 2024",
    readTime: "6 min",
  },
  {
    slug: "sani-mari-macromastie-gigantomastie",
    title: "Sâni prea mari? Cum evităm efectul de 'bile' artificiale",
    excerpt: "Ghid pentru alegerea unei mărimi proporționale și naturale, evitând rezultatele exagerate.",
    date: "8 Dec 2024",
    readTime: "5 min",
  },
];

const clusterProcedura = [
  {
    slug: "tehnici-insertie-implanturi",
    title: "Tehnici de Inserție a Implanturilor Mamare",
    excerpt: "Explorează diferitele tehnici chirurgicale pentru plasarea implanturilor și avantajele fiecăreia.",
    date: "5 Dec 2024",
    readTime: "7 min",
  },
  {
    slug: "anestezie-augmentare-mamara",
    title: "Anestezia pentru augmentare mamară: Generală vs. Locală cu sedare",
    excerpt: "Tot ce trebuie să știi despre opțiunile de anestezie și cum să te pregătești pentru intervenție.",
    date: "4 Dec 2024",
    readTime: "6 min",
  },
  {
    slug: "plasare-implant-subglandular-submuscular",
    title: "Plasarea implantului: Subglandular vs. Submuscular (Dual Plane)",
    excerpt: "Comparație detaliată între planurile de plasare și când se recomandă fiecare tehnică.",
    date: "3 Dec 2024",
    readTime: "8 min",
  },
  {
    slug: "cum-decurge-operatia-augmentare-mamara",
    title: "Cum decurge operația de augmentare mamară: Pas cu pas",
    excerpt: "De la pregătirea preoperatorie până la trezire – tot ce se întâmplă în sala de operații.",
    date: "2 Dec 2024",
    readTime: "9 min",
  },
];

const clusterSiguranta = [
  {
    slug: "alaptarea-cu-implanturi-mamare",
    title: "Alăptarea după implanturi mamare: Mituri și Adevăr",
    excerpt: "Răspundem la cele mai frecvente întrebări despre posibilitatea alăptării după operația de mărire a sânilor.",
    date: "1 Dec 2024",
    readTime: "6 min",
  },
  {
    slug: "sport-dupa-implant-mamar",
    title: "Implanturile Mamare și Sportul: Când pot reveni la sală?",
    excerpt: "Timeline complet pentru reluarea activităților fizice după augmentarea mamară.",
    date: "30 Nov 2024",
    readTime: "5 min",
  },
  {
    slug: "contractura-capsulara",
    title: "Contractura Capsulară: Ce este și cum reducem riscul la minim?",
    excerpt: "Înțelege această complicație rară și măsurile preventive pentru un rezultat de lungă durată.",
    date: "28 Nov 2024",
    readTime: "7 min",
  },
  {
    slug: "balonare-dupa-implant-mamar",
    title: "Balonare după implant mamar: Cauze și Remedii",
    excerpt: "Ce cauzează senzația de balonare postoperatorie și cum o poți ameliora natural.",
    date: "26 Nov 2024",
    readTime: "5 min",
  },
  {
    slug: "durerile-dupa-implant-mamar",
    title: "Durerile după implant mamar: Ce e normal și când să te îngrijorezi",
    excerpt: "Ghid complet despre gestionarea discomfortului și semnele care necesită atenție medicală.",
    date: "24 Nov 2024",
    readTime: "6 min",
  },
  {
    slug: "implant-mamar-deplasat",
    title: "Implant mamar deplasat: Semne și soluții",
    excerpt: "Cum recunoști deplasarea implantului și ce opțiuni de corecție există.",
    date: "22 Nov 2024",
    readTime: "8 min",
  },
  {
    slug: "masajul-sanilor-dupa-implant",
    title: "Masajul sânilor după implant: Tehnică și beneficii",
    excerpt: "De ce este important masajul postoperator și cum să-l faci corect acasă.",
    date: "20 Nov 2024",
    readTime: "5 min",
  },
  {
    slug: "cat-timp-trebuie-sa-dormi-pe-spate-dupa-implant-mamar",
    title: "Cât timp să dormi pe spate după implant mamar?",
    excerpt: "Recomandări pentru poziția de somn în perioada de recuperare și de ce contează.",
    date: "18 Nov 2024",
    readTime: "4 min",
  },
  {
    slug: "in-cat-timp-se-aseaza-implantul-mamar",
    title: "În cât timp se așază implantul mamar?",
    excerpt: "Timeline-ul complet al procesului de 'settling' și ce să aștepți în fiecare etapă.",
    date: "16 Nov 2024",
    readTime: "6 min",
  },
  {
    slug: "cicatrici-dupa-implant",
    title: "Cicatrici după implant: Evoluție în primele 12 luni",
    excerpt: "Cum evoluează cicatricile și tehnici dovedite pentru minimizarea vizibilității lor.",
    date: "14 Nov 2024",
    readTime: "7 min",
  },
];

const clusterBranduri = [
  {
    slug: "mentor-vs-motiva",
    title: "Mentor vs. Motiva: Ce alegem pentru tine?",
    excerpt: "Comparație obiectivă între cele două branduri premium de implanturi disponibile în clinica noastră.",
    date: "12 Nov 2024",
    readTime: "8 min",
  },
];

const ArticleCard = ({ article }: { article: typeof clusterMarimeForma[0] }) => (
  <Link
    to={`/blog/${article.slug}`}
    className="block bg-card rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all duration-300 group"
  >
    <div className="text-sm text-soft-brown mb-3">
      <span>{article.readTime} citire</span>
    </div>
    <h3 className="font-serif text-lg lg:text-xl font-semibold text-deep-brown mb-2 group-hover:text-rose-gold transition-colors">
      {article.title}
    </h3>
    <p className="text-soft-brown text-sm mb-4">{article.excerpt}</p>
    <span className="text-rose-gold flex items-center gap-1 text-sm font-medium">
      Citește articolul
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </span>
  </Link>
);

const ClusterSection = ({ 
  icon: Icon, 
  title, 
  description, 
  articles 
}: { 
  icon: React.ElementType;
  title: string; 
  description: string;
  articles: typeof clusterMarimeForma;
}) => (
  <section className="mb-16">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-rose-gold/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-rose-gold" />
      </div>
      <div>
        <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-deep-brown">
          {title}
        </h2>
        <p className="text-soft-brown text-sm">{description}</p>
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  </section>
);

const BlogIndex = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Blog Augmentare Mamară | Ghiduri și Articole | Rentéa Aesthetic București"
        description="Articole și ghiduri complete despre augmentare mamară. Informații despre tipuri de implanturi, recuperare, siguranță și rezultate."
        keywords="blog augmentare mamara, articole implant mamar, ghid marire sani, informatii implanturi"
        canonical="/blog"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBlog} 
            alt="Blog - Resurse și Articole" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
            Blog
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-deep-brown mb-6">
            Resurse și <span className="text-gradient-gold">Articole</span>
          </h1>
          <p className="text-lg text-soft-brown max-w-2xl mx-auto">
            Informații verificate despre augmentarea mamară, organizate pe teme pentru a te ajuta să iei cele mai bune decizii.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Articles */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ClusterSection
              icon={Ruler}
              title="Mărime și Formă"
              description="Ghiduri pentru alegerea dimensiunii și formei potrivite"
              articles={clusterMarimeForma}
            />

            <ClusterSection
              icon={Stethoscope}
              title="Procedura Chirurgicală"
              description="Tot ce trebuie să știi despre operație"
              articles={clusterProcedura}
            />

            <ClusterSection
              icon={Shield}
              title="Siguranță și Recuperare"
              description="Informații despre vindecare și îngrijire postoperatorie"
              articles={clusterSiguranta}
            />

            <ClusterSection
              icon={Award}
              title="Branduri Implant Mamar"
              description="Comparații între producătorii de implanturi"
              articles={clusterBranduri}
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogIndex;

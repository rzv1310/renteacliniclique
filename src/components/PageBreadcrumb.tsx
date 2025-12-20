import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Map URL slugs to display names
const routeLabels: Record<string, string> = {
  "": "Acasă",
  "proceduri": "Proceduri",
  "augmentare-mamara": "Augmentare Mamară",
  "implanturi-mamare-rotunde": "Implanturi Mamare Rotunde",
  "implanturi-mamare-anatomice": "Implanturi Mamare Anatomice",
  "implanturi-mamare-ergonomice": "Implanturi Mamare Ergonomice",
  "augmentare-mamara-cu-mastopexie": "Augmentare Mamară cu Mastopexie",
  "revizie-implant-mamar": "Revizie Implant Mamar",
  "micsorare-sani-reductie-mamara": "Reducție Mamară",
  "lipofilling-mamar": "Lipofilling Mamar",
  "galerie": "Galerie Foto",
  "simulator-3d": "Simulator 3D",
  "tarife-finantare": "Tarife & Finanțare",
  "ghid-recuperare": "Ghid Recuperare",
  "despre-noi": "Despre Noi",
  "contact": "Contact",
  "turism-medical-intern": "Paciente din Provincie",
  "implant-mamar-in-rate": "Finanțare în Rate",
  "blog": "Blog",
  // Cluster 1: Mărime și Formă
  "implanturi-rotunde-vs-anatomice": "Implanturi Rotunde vs. Anatomice",
  "implant-mamar-250-ml-400ml": "Ghid Mărimi Implanturi",
  "implant-mamar-cu-profil-inalt-sau-moderat": "Profil Implant",
  "sani-mari-macromastie-gigantomastie": "Macromastie și Gigantomastie",
  // Cluster 2: Procedura Chirurgicală
  "tehnici-insertie-implanturi": "Tehnici de Inserție Implanturi",
  "anestezie-augmentare-mamara": "Anestezie Augmentare Mamară",
  "plasare-implant-subglandular-submuscular": "Plasare Implant",
  "cum-decurge-operatia-augmentare-mamara": "Cum Decurge Operația",
  // Cluster 3: Siguranță și Recuperare
  "alaptarea-cu-implanturi-mamare": "Alăptarea cu Implanturi",
  "sport-dupa-implant-mamar": "Sport după Implant",
  "contractura-capsulara": "Contractura Capsulară",
  "balonare-dupa-implant-mamar": "Balonare după Implant",
  "durerile-dupa-implant-mamar": "Dureri după Implant",
  "implant-mamar-deplasat": "Implant Deplasat",
  "masajul-sanilor-dupa-implant": "Masaj după Implant",
  "cat-timp-trebuie-sa-dormi-pe-spate-dupa-implant-mamar": "Somn pe Spate",
  "in-cat-timp-se-aseaza-implantul-mamar": "Așezare Implant",
  "cicatrici-dupa-implant": "Cicatrici după Implant",
  // Cluster 4: Branduri
  "mentor-vs-motiva": "Mentor vs. Motiva",
};

const PageBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumb on homepage
  if (pathnames.length === 0) return null;

  const buildPath = (index: number) => {
    return "/" + pathnames.slice(0, index + 1).join("/");
  };

  return (
    <div className="bg-transparent">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1.5 text-primary/80 hover:text-primary transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Acasă</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathnames.map((segment, index) => {
              const isLast = index === pathnames.length - 1;
              const label = routeLabels[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
              
              return (
                <span key={segment} className="contents">
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4 text-primary/50" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-primary font-medium">
                        {label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={buildPath(index)} className="text-primary/80 hover:text-primary transition-colors">
                          {label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PageBreadcrumb;
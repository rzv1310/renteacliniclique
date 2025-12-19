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
  "galerie": "Galerie Foto",
  "tarife-finantare": "Tarife & Finanțare",
  "ghid-recuperare": "Ghid Recuperare",
  "despre-noi": "Despre Noi",
  "contact": "Contact",
  "turism-medical-intern": "Paciente din Provincie",
  "implant-mamar-in-rate": "Finanțare în Rate",
  "blog": "Blog",
  "implanturi-rotunde-vs-anatomice": "Implanturi Rotunde vs. Anatomice",
  "alaptare-dupa-augmentare-mamara": "Alăptare după Augmentare Mamară",
  "tehnici-insertie-implanturi": "Tehnici de Inserție Implanturi",
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
    <div className="bg-secondary/50 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1.5 text-soft-brown hover:text-rose-gold transition-colors">
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
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-deep-brown font-medium">
                        {label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={buildPath(index)} className="text-soft-brown hover:text-rose-gold transition-colors">
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
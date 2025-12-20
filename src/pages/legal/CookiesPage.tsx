import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <PageBreadcrumb />
          
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
              Politica de Cookies
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-sm text-muted-foreground">
                Ultima actualizare: Decembrie 2024
              </p>
              
              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">1. Ce sunt cookie-urile?</h2>
                <p>
                  Cookie-urile sunt fișiere text de mici dimensiuni care sunt stocate pe dispozitivul dumneavoastră 
                  (computer, tabletă, telefon mobil) atunci când vizitați site-ul nostru web implantmamarbucuresti.ro. 
                  Acestea permit site-ului să vă recunoască dispozitivul și să rețină anumite informații despre 
                  vizita dumneavoastră.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">2. Tipuri de cookie-uri utilizate</h2>
                
                <h3 className="text-lg font-medium text-foreground">2.1 Cookie-uri strict necesare</h3>
                <p>
                  Acestea sunt esențiale pentru funcționarea site-ului și nu pot fi dezactivate. Includ cookie-uri 
                  care permit navigarea pe site și utilizarea funcțiilor de bază.
                </p>
                
                <h3 className="text-lg font-medium text-foreground">2.2 Cookie-uri de performanță</h3>
                <p>
                  Aceste cookie-uri colectează informații despre modul în care vizitatorii utilizează site-ul, 
                  de exemplu paginile vizitate cel mai des. Toate informațiile colectate sunt agregate și anonime.
                </p>
                
                <h3 className="text-lg font-medium text-foreground">2.3 Cookie-uri funcționale</h3>
                <p>
                  Permit site-ului să rețină alegerile dumneavoastră (cum ar fi preferințele de limbă sau regiunea) 
                  și să ofere funcții îmbunătățite și personalizate.
                </p>
                
                <h3 className="text-lg font-medium text-foreground">2.4 Cookie-uri de marketing</h3>
                <p>
                  Sunt utilizate pentru a urmări vizitatorii pe diferite site-uri web. Scopul este de a afișa 
                  reclame relevante și captivante pentru utilizatori.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">3. Cookie-uri terțe părți</h2>
                <p>
                  Site-ul nostru poate utiliza servicii de la terțe părți care setează propriile cookie-uri:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Google Analytics - pentru analiza traficului</li>
                  <li>Facebook Pixel - pentru remarketing și analiză</li>
                  <li>Google Ads - pentru campaniile publicitare</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">4. Gestionarea cookie-urilor</h2>
                <p>
                  Puteți controla și/sau șterge cookie-urile după preferință. Puteți șterge toate cookie-urile 
                  deja stocate pe dispozitivul dumneavoastră și puteți seta majoritatea browserelor să blocheze 
                  plasarea acestora.
                </p>
                <p>
                  Pentru a gestiona cookie-urile, accesați setările browserului dumneavoastră:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Chrome: Setări → Confidențialitate și securitate → Cookie-uri</li>
                  <li>Firefox: Opțiuni → Confidențialitate și securitate</li>
                  <li>Safari: Preferințe → Confidențialitate</li>
                  <li>Edge: Setări → Cookie-uri și permisiuni site</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">5. Durata de stocare</h2>
                <p>
                  Cookie-urile de sesiune sunt șterse automat când închideți browserul. Cookie-urile persistente 
                  rămân pe dispozitivul dumneavoastră pentru o perioadă determinată sau până când le ștergeți manual.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">6. Actualizări ale politicii</h2>
                <p>
                  Ne rezervăm dreptul de a actualiza această politică de cookies. Orice modificări vor fi 
                  publicate pe această pagină cu data actualizării.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">7. Contact</h2>
                <p>
                  Pentru întrebări legate de politica noastră de cookies, ne puteți contacta la adresa de email:{" "}
                  <a href="mailto:contact@implantmamarbucuresti.ro" className="text-rose-gold hover:underline">
                    contact@implantmamarbucuresti.ro
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiesPage;

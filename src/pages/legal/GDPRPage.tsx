import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const GDPRPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <PageBreadcrumb />
          
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
              Politica de Confidențialitate GDPR
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-sm text-muted-foreground">
                Ultima actualizare: Decembrie 2024
              </p>
              
              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">1. Introducere</h2>
                <p>
                  Această politică de confidențialitate explică modul în care colectăm, utilizăm, stocăm și 
                  protejăm datele dumneavoastră personale în conformitate cu Regulamentul General privind 
                  Protecția Datelor (GDPR) - Regulamentul (UE) 2016/679.
                </p>
                <p>
                  Site-ul implantmamarbucuresti.ro se angajează să protejeze confidențialitatea și securitatea 
                  datelor dumneavoastră personale.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">2. Datele personale colectate</h2>
                <p>Putem colecta următoarele categorii de date personale:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Date de identificare:</strong> nume, prenume</li>
                  <li><strong>Date de contact:</strong> adresă de email, număr de telefon</li>
                  <li><strong>Date tehnice:</strong> adresă IP, tip de browser, sistem de operare</li>
                  <li><strong>Date de navigare:</strong> paginile vizitate, timpul petrecut pe site</li>
                  <li><strong>Date medicale:</strong> informații furnizate voluntar în cadrul consultațiilor</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">3. Scopul prelucrării datelor</h2>
                <p>Datele dumneavoastră personale sunt prelucrate în următoarele scopuri:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Programarea și gestionarea consultațiilor medicale</li>
                  <li>Răspunsul la solicitările și întrebările dumneavoastră</li>
                  <li>Îmbunătățirea serviciilor și a experienței pe site</li>
                  <li>Trimiterea de comunicări de marketing (cu consimțământul dumneavoastră)</li>
                  <li>Respectarea obligațiilor legale</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">4. Temeiul legal al prelucrării</h2>
                <p>Prelucrăm datele dumneavoastră pe baza următoarelor temeiuri legale:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Consimțământul:</strong> pentru comunicări de marketing și cookies non-esențiale</li>
                  <li><strong>Executarea contractului:</strong> pentru furnizarea serviciilor medicale solicitate</li>
                  <li><strong>Interesul legitim:</strong> pentru îmbunătățirea serviciilor și securitatea site-ului</li>
                  <li><strong>Obligația legală:</strong> pentru conformitatea cu legislația aplicabilă</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">5. Drepturile dumneavoastră</h2>
                <p>În conformitate cu GDPR, aveți următoarele drepturi:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dreptul de acces:</strong> să solicitați o copie a datelor personale deținute despre dumneavoastră</li>
                  <li><strong>Dreptul la rectificare:</strong> să solicitați corectarea datelor inexacte</li>
                  <li><strong>Dreptul la ștergere:</strong> să solicitați ștergerea datelor în anumite condiții</li>
                  <li><strong>Dreptul la restricționare:</strong> să solicitați limitarea prelucrării datelor</li>
                  <li><strong>Dreptul la portabilitate:</strong> să primiți datele într-un format structurat</li>
                  <li><strong>Dreptul de opoziție:</strong> să vă opuneți prelucrării în anumite situații</li>
                  <li><strong>Dreptul de a retrage consimțământul:</strong> în orice moment, fără a afecta legalitatea prelucrării anterioare</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">6. Perioada de stocare</h2>
                <p>
                  Datele personale sunt păstrate doar atât timp cât este necesar pentru îndeplinirea scopurilor 
                  pentru care au fost colectate sau conform cerințelor legale. Datele medicale sunt păstrate 
                  conform legislației în vigoare privind documentația medicală.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">7. Securitatea datelor</h2>
                <p>
                  Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele dumneavoastră 
                  personale împotriva accesului neautorizat, pierderii, distrugerii sau divulgării. Acestea includ:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Criptarea datelor în tranzit (SSL/TLS)</li>
                  <li>Acces restricționat la date pe bază de necesitate</li>
                  <li>Monitorizarea și actualizarea regulată a măsurilor de securitate</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">8. Transferul datelor</h2>
                <p>
                  Datele dumneavoastră personale nu sunt transferate către țări din afara Spațiului Economic 
                  European fără garanții adecvate conform GDPR.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">9. Plângeri</h2>
                <p>
                  Dacă considerați că prelucrarea datelor dumneavoastră încalcă GDPR, aveți dreptul să depuneți 
                  o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal 
                  (ANSPDCP) - <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-rose-gold hover:underline">www.dataprotection.ro</a>
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">10. Contact</h2>
                <p>
                  Pentru exercitarea drepturilor dumneavoastră sau pentru orice întrebări legate de protecția 
                  datelor, ne puteți contacta la:{" "}
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

export default GDPRPage;

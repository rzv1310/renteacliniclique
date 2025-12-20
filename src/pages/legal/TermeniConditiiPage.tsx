import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const TermeniConditiiPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <PageBreadcrumb />
          
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
              Termeni și Condiții
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-sm text-muted-foreground">
                Ultima actualizare: Decembrie 2024
              </p>
              
              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">1. Introducere</h2>
                <p>
                  Bine ați venit pe site-ul implantmamarbucuresti.ro. Prin accesarea și utilizarea acestui 
                  site web, acceptați să respectați acești termeni și condiții de utilizare. Dacă nu sunteți 
                  de acord cu oricare dintre acești termeni, vă rugăm să nu utilizați site-ul.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">2. Definiții</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>"Site"</strong> - site-ul web implantmamarbucuresti.ro</li>
                  <li><strong>"Utilizator"</strong> - orice persoană care accesează site-ul</li>
                  <li><strong>"Servicii"</strong> - serviciile medicale și informațiile oferite prin intermediul site-ului</li>
                  <li><strong>"Conținut"</strong> - texte, imagini, videoclipuri și alte materiale de pe site</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">3. Scopul site-ului</h2>
                <p>
                  Acest site are scop informativ și prezintă serviciile de chirurgie estetică mamară oferite. 
                  Informațiile prezentate nu constituie sfat medical și nu înlocuiesc consultația medicală 
                  de specialitate.
                </p>
                <p>
                  Orice decizie privind o procedură medicală trebuie luată doar în urma unei consultații 
                  directe cu un medic specialist.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">4. Utilizarea site-ului</h2>
                <p>Prin utilizarea site-ului, vă angajați să:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Furnizați informații corecte și complete în formularele de contact</li>
                  <li>Nu utilizați site-ul în scopuri ilegale sau neautorizate</li>
                  <li>Nu încercați să accesați zone restricționate ale site-ului</li>
                  <li>Nu transmiteți materiale dăunătoare sau malițioase</li>
                  <li>Respectați drepturile de proprietate intelectuală</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">5. Proprietate intelectuală</h2>
                <p>
                  Tot conținutul site-ului, inclusiv texte, imagini, grafice, logo-uri, iconițe și software, 
                  este protejat de drepturile de autor și alte drepturi de proprietate intelectuală.
                </p>
                <p>
                  Este interzisă reproducerea, distribuirea sau utilizarea conținutului fără acordul prealabil 
                  scris. Imaginile "înainte și după" sunt proprietatea clinicii și sunt utilizate cu acordul 
                  pacientelor.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">6. Disclaimer medical</h2>
                <p>
                  Rezultatele procedurilor chirurgicale variază de la pacient la pacient. Imaginile și 
                  testimonialele prezentate pe site reprezintă cazuri individuale și nu garantează rezultate 
                  identice.
                </p>
                <p>
                  Orice procedură chirurgicală implică riscuri. Informațiile complete despre beneficii, 
                  riscuri și alternative vor fi discutate în cadrul consultației medicale.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">7. Programări și consultații</h2>
                <p>
                  Programările efectuate prin site sunt supuse confirmării. Ne rezervăm dreptul de a anula 
                  sau reprograma consultațiile cu notificare prealabilă.
                </p>
                <p>
                  Taxa de consultație este menționată pe site și poate fi modificată fără notificare prealabilă. 
                  Condițiile de deductibilitate din costul operației vor fi comunicate la programare.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">8. Limitarea răspunderii</h2>
                <p>
                  Site-ul este furnizat "așa cum este", fără garanții de niciun fel. Nu garantăm că site-ul 
                  va funcționa neîntrerupt sau fără erori.
                </p>
                <p>
                  Nu suntem răspunzători pentru:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Întreruperi ale serviciului sau erori tehnice</li>
                  <li>Decizii luate pe baza informațiilor de pe site fără consultație medicală</li>
                  <li>Conținutul site-urilor externe către care există link-uri</li>
                  <li>Pierderi indirecte sau consecutive rezultate din utilizarea site-ului</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">9. Link-uri externe</h2>
                <p>
                  Site-ul poate conține link-uri către alte site-uri web. Nu suntem responsabili pentru 
                  conținutul, politicile de confidențialitate sau practicile site-urilor terțe.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">10. Modificări ale termenilor</h2>
                <p>
                  Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment. Modificările 
                  intră în vigoare la data publicării pe site. Utilizarea continuă a site-ului după 
                  modificări constituie acceptarea noilor termeni.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">11. Legislație aplicabilă</h2>
                <p>
                  Acești termeni și condiții sunt guvernați de legislația română. Orice litigiu va fi 
                  soluționat de instanțele competente din București, România.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-medium text-foreground">12. Contact</h2>
                <p>
                  Pentru întrebări sau clarificări privind acești termeni și condiții, ne puteți contacta la:{" "}
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

export default TermeniConditiiPage;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-xl">🍪</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    Acest site folosește cookies
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Folosim cookies pentru a îmbunătăți experiența dumneavoastră pe site, pentru analiză și marketing. 
                    Prin continuarea navigării, acceptați{" "}
                    <Link to="/cookies" className="text-rose-gold hover:underline">
                      politica noastră de cookies
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDecline}
                className="text-muted-foreground hover:text-foreground"
              >
                Refuz
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="bg-rose-gold hover:bg-rose-gold/90 text-primary-foreground"
              >
                Accept cookies
              </Button>
            </div>
          </div>
          
          <button
            onClick={handleDecline}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors md:hidden"
            aria-label="Închide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

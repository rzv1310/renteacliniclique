import { useState } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const testimonials = [
    {
      quote:
        "Mi-a fost frică de rezultatul 'artificial', dar Dr. Rentea a înțeles exact ce vreau. Arată atât de natural încât nimeni nu crede că am implanturi.",
      author: "Maria",
      details: "28 ani • Implant Motiva Ergonomix",
      rating: 5,
    },
    {
      quote:
        "Cea mai bună decizie din viața mea. Echipa a fost incredibil de profesionistă și atentă. Recuperarea a fost mult mai ușoară decât mă așteptam.",
      author: "Andreea",
      details: "34 ani • Implant Mentor",
      rating: 5,
    },
    {
      quote:
        "După 2 nașteri, aveam nevoie de o schimbare. Rezultatul e exact ce îmi doream - natural, proporțional și încrezător.",
      author: "Elena",
      details: "39 ani • Implant Motiva",
      rating: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section 
      className="py-24 lg:py-32 overflow-hidden bg-card"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-label mb-4 block">
            EXPERIENȚE VERIDICE
          </span>
          <h2 className="h2-section text-foreground mb-6">
            Poveștile pacientelor noastre
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-background rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-gold via-rose-gold/50 to-transparent" />
            
            {/* Quote icon */}
            <div className="flex justify-center mb-6">
              <MaterialIcon name="format_quote" className="text-5xl text-rose-gold/30" />
            </div>

            {/* Quote */}
            <blockquote className="font-display text-xl md:text-2xl text-foreground leading-relaxed mb-8 text-center italic">
              "{testimonials[activeIndex].quote}"
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-rose-gold/20 flex items-center justify-center border-2 border-rose-gold/30">
                <span className="font-display text-xl text-rose-gold">
                  {testimonials[activeIndex].author[0]}
                </span>
              </div>
              <div className="text-center">
                <p className="font-sans font-medium text-foreground">
                  {testimonials[activeIndex].author}
                </p>
                <p className="text-sm text-muted-foreground font-sans">
                  {testimonials[activeIndex].details}
                </p>
              </div>
              
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <MaterialIcon key={i} name="star" className="text-lg text-rose-gold" filled />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-rose-gold"
                    : "bg-border hover:bg-rose-gold/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

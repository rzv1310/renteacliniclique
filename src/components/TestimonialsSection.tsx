import { useState } from "react";
import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const testimonials = [
    {
      quote:
        "Mi-a fost frică de rezultatul 'artificial', dar Dr. Wafi a înțeles exact ce vreau. Arată atât de natural încât nimeni nu crede că am implanturi.",
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
      className="py-24 lg:py-32 overflow-hidden bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-label mb-4 block">
            Experiențe Veridice
          </span>
          <h2 className="h2-section text-foreground mb-6">
            Poveștile pacientelor noastre
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden">
            {/* Decorative Quote */}
            <div className="absolute top-4 left-8 text-rose-gold/10 font-display text-[150px] leading-none select-none">
              "
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-6 relative z-10">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-rose-gold text-rose-gold" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-display text-2xl md:text-3xl text-foreground leading-relaxed mb-8 relative z-10 italic">
              "{testimonials[activeIndex].quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-rose-gold/20 flex items-center justify-center">
                <span className="font-display text-lg text-rose-gold">
                  {testimonials[activeIndex].author[0]}
                </span>
              </div>
              <div>
                <p className="font-sans font-medium text-foreground">
                  {testimonials[activeIndex].author}
                </p>
                <p className="text-sm text-muted-foreground font-sans">
                  {testimonials[activeIndex].details}
                </p>
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

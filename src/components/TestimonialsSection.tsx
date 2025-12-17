import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Mi-a fost frică de rezultatul 'artificial', dar Dr. Wafi a înțeles exact ce vreau. Arată atât de natural încât nimeni nu crede că am implanturi.",
      author: "Maria",
      age: "28 ani",
      rating: 5,
    },
    {
      quote:
        "Cea mai bună decizie din viața mea. Echipa a fost incredibil de profesionistă și atentă. Recuperarea a fost mult mai ușoară decât mă așteptam.",
      author: "Andreea",
      age: "34 ani",
      rating: 5,
    },
    {
      quote:
        "După 2 nașteri, aveam nevoie de o schimbare. Rezultatul e exact ce îmi doream - natural, proporțional și încrezător.",
      author: "Elena",
      age: "39 ani",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">
            Testimoniale
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-deep-brown mb-6">
            Poveștile pacientelor noastre
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elegant relative overflow-hidden">
            {/* Decorative Quote */}
            <div className="absolute top-4 left-8 text-champagne/30 font-serif text-9xl leading-none">
              "
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-6 relative z-10">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-champagne text-champagne" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-2xl md:text-3xl text-deep-brown leading-relaxed mb-8 relative z-10">
              "{testimonials[activeIndex].quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-champagne-light flex items-center justify-center">
                <span className="font-serif text-lg text-rose-gold">
                  {testimonials[activeIndex].author[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-deep-brown">
                  {testimonials[activeIndex].author}
                </p>
                <p className="text-sm text-soft-brown">{testimonials[activeIndex].age}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:shadow-elegant hover:bg-champagne-light transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-deep-brown" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-rose-gold"
                      : "bg-champagne hover:bg-rose-gold/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:shadow-elegant hover:bg-champagne-light transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-deep-brown" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

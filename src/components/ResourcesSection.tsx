import React, { useCallback, useEffect, useState, useRef } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Import resource images
import resource1Image from "@/assets/resources/resource-1.jpg";
import resource2Image from "@/assets/resources/resource-2.jpg";
import resourceReductionImage from "@/assets/resources/resource-reduction.jpg";
import resource4Image from "@/assets/resources/resource-4.jpg";

const AUTOPLAY_DELAY = 4000;

const ResourcesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const autoplayRef = useRef(Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      slidesToScroll: 1,
      dragFree: false,
      containScroll: "trimSnaps",
      watchDrag: true,
    },
    [autoplayRef.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const resources = [
    {
      title: "Implant Mamar București",
      link: "/proceduri/implant-mamar-bucuresti",
      image: resource1Image,
      buttonText: "Augmentare Mamară",
    },
    {
      title: "Lifting Mamar",
      link: "/proceduri/lifting-mamar-mastopexie-ridicare-sani",
      image: resource2Image,
      buttonText: "Ridicare Sâni",
    },
    {
      title: "Reducție Mamară",
      link: "/proceduri/micsorare-sani-reductie-mamara",
      image: resourceReductionImage,
      buttonText: "Micșorare Sâni",
    },
    {
      title: "Preț Implant Mamar",
      link: "/implant-mamar-pret",
      image: resource4Image,
      buttonText: "Vezi Tarifele",
    },
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const startProgress = useCallback(() => {
    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    const step = 100 / (AUTOPLAY_DELAY / 50);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + step;
      });
    }, 50);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    startProgress();
  }, [emblaApi, startProgress]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [emblaApi, onSelect]);

  return (
    <section 
      id="resurse" 
      className="py-24 lg:py-32 bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-label mb-4 block">
            CUNOȘTINȚE APROFUNDATE
          </span>
          <h2 className="h2-section text-foreground mb-6">
            Tot ce trebuie să știi despre Augmentarea Mamară
          </h2>
          <p className="text-body leading-relaxed">
            Navigați prin informații esențiale și ghiduri detaliate, create pentru a vă oferi claritate și încredere în decizia dumneavoastră.
          </p>
        </div>

        {/* Carousel */}
        <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-rose-gold hover:text-white hover:border-rose-gold transition-all duration-300 shadow-lg hidden lg:flex"
            aria-label="Previous slide"
          >
            <MaterialIcon name="chevron_left" className="text-2xl" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-rose-gold hover:text-white hover:border-rose-gold transition-all duration-300 shadow-lg hidden lg:flex"
            aria-label="Next slide"
          >
            <MaterialIcon name="chevron_right" className="text-2xl" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {resources.map((resource, index) => (
                <a
                  key={resource.title}
                  href={resource.link}
                  className="group flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] bg-card rounded-2xl overflow-hidden border border-border hover:border-rose-gold/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-medium text-foreground mb-4 group-hover:text-rose-gold transition-colors leading-tight">
                      {resource.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-sm font-sans font-medium text-rose-gold group-hover:gap-3 transition-all">
                      {resource.buttonText}
                      <MaterialIcon name="arrow_forward" className="text-base" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {resources.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="relative w-8 h-1.5 rounded-full bg-border overflow-hidden"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div 
                  className="absolute inset-0 bg-rose-gold rounded-full transition-all duration-100 ease-linear"
                  style={{ 
                    width: selectedIndex === index ? `${progress}%` : index < selectedIndex ? '100%' : '0%',
                    opacity: selectedIndex === index || index < selectedIndex ? 1 : 0 
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;

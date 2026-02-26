import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Banner from './Banner';
import MarketCapBanner from './MarketCapBanner';

const MotionDiv = motion.div;
const MotionButton = motion.button;

export default function BannerSlider() {
  const slides = useMemo(
    () => [
      { key: 'industry', component: <Banner /> },
      { key: 'sector', component: <MarketCapBanner /> }
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  const goToPrev = () => setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  const goToNext = () => setActiveIndex((current) => (current + 1) % slides.length);

  return (
    <section
      className="w-full relative mx-auto mt-4 max-w-8xl h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#d1de74]/20 blur-[90px]" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-[#a1c14b]/20 blur-[90px]" />

      <AnimatePresence mode="wait">
        <MotionDiv
          key={slides[activeIndex].key}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {slides[activeIndex].component}
        </MotionDiv>
      </AnimatePresence>

      <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 md:block">
        <button
          onClick={goToPrev}
          className="clay-card rounded-full p-2 text-slate-200 transition hover:text-[#d1de74]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 md:block">
        <button
          onClick={goToNext}
          className="clay-card rounded-full p-2 text-slate-200 transition hover:text-[#d1de74]"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="pb-5 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2">
          {slides.map((slide, index) => (
            <MotionButton
              key={slide.key}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition ${
                index === activeIndex ? 'w-8 bg-[#d1de74]' : 'w-2.5 bg-white/35'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


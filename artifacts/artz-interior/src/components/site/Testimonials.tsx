import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { testimonialsData } from "@/data/testimonialsData";

export function Testimonials() {
  const items = testimonialsData.items;
  const [i, setI] = useState(0);
  const t = items[i];

  return (
    <section id="testimonials" className="relative py-28 lg:py-40 bg-charcoal text-warm-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, var(--gold) 0%, transparent 40%), radial-gradient(circle at 80% 80%, var(--gold) 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <Reveal>
          <SectionLabel>
            <span className="text-warm-white/70">{testimonialsData.label}</span>
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
        </Reveal>

        <div className="relative mt-10 min-h-[260px] glass-dark border border-warm-white/10 p-10 lg:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-2xl md:text-4xl leading-snug italic text-warm-white">
                "{t.quote}"
              </p>
              <div className="mt-10">
                <div className="text-sm tracking-[0.2em] uppercase text-gold-soft">
                  {t.name}
                </div>
                <div className="mt-1 text-xs text-warm-white/60">{t.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => setI((i - 1 + items.length) % items.length)}
            className="p-3 border border-warm-white/20 hover:border-gold hover:text-gold transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {items.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-px transition-all duration-500 ${
                  k === i ? "w-10 bg-gold" : "w-6 bg-warm-white/30"
                }`}
                aria-label={`Go to ${k + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setI((i + 1) % items.length)}
            className="p-3 border border-warm-white/20 hover:border-gold hover:text-gold transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

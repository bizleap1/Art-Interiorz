import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { portfolioData, type Project } from "@/data/portfolioData";

export function Portfolio() {
  const categories = portfolioData.categories;
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [preview, setPreview] = useState<Project | null>(null);
  const filtered =
    active === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="relative py-28 lg:py-40 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div>
            <Reveal><SectionLabel>{portfolioData.label}</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">
                {portfolioData.heading.prefix} <em className="italic text-gradient-gold">{portfolioData.heading.emphasis}</em> {portfolioData.heading.suffix}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`text-xs tracking-[0.25em] uppercase pb-1 border-b transition-colors ${
                    active === c
                      ? "text-charcoal border-gold"
                      : "text-muted-foreground border-transparent hover:text-charcoal"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] md:auto-rows-[300px] gap-5">
          <AnimatePresence mode="sync" initial={false}>
            {filtered.map((p, i) => (
              <motion.button
                key={p.title}
                onClick={() => setPreview(p)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden bg-ivory ${p.span ?? ""}`}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end text-left">
                  <div className="text-[10px] tracking-luxury uppercase text-gold-soft mb-2">
                    {p.category} — {p.location}
                  </div>
                  <div className="font-display text-warm-white text-2xl lg:text-3xl">
                    {p.title}
                  </div>
                  <div className="mt-3 h-px w-0 bg-gold group-hover:w-16 transition-all duration-500" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[60] glass-dark flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-warm-white"
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute -top-12 right-0 text-warm-white hover:text-gold transition-colors"
                aria-label="Close"
              >
                <X />
              </button>
              <img src={preview.img} alt={preview.title} className="w-full max-h-[75vh] object-cover" />
              <div className="p-8 flex items-center justify-between gap-6">
                <div>
                  <div className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                    {preview.category} — {preview.location}
                  </div>
                  <div className="font-display text-3xl mt-2">{preview.title}</div>
                  {preview.description && (
                    <p className="mt-3 text-sm text-muted-foreground max-w-xl">{preview.description}</p>
                  )}
                </div>
                <a href="#contact" className="text-xs tracking-[0.25em] uppercase border-b border-gold pb-1 whitespace-nowrap">
                  Enquire
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

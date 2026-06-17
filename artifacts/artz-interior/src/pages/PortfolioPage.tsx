import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import {
  galleryItems,
  galleryCategories,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/portfolioFullData";

export default function PortfolioPage() {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [preview, setPreview] = useState<GalleryItem | null>(null);
  const filtered =
    active === "All" ? galleryItems : galleryItems.filter((g) => g.category === active);

  useEffect(() => {
    document.title = "Our Portfolio | Art Interiorz Nagpur";
  }, []);

  return (
    <SiteShell>
      <PageHero
        title="Our Portfolio"
        crumb="Portfolio"
        image="/assets/livingroom.jpg"
      />

      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
            <div>
              <Reveal><SectionLabel>Selected Work</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">
                  A gallery of <em className="italic text-gradient-gold">considered</em> interiors.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {galleryCategories.map((c) => (
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

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            <AnimatePresence mode="sync" initial={false}>
              {filtered.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => setPreview(item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: Math.min(i, 12) * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden bg-ivory mb-5 w-full block break-inside-avoid"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="text-[10px] tracking-luxury uppercase text-gold-soft">
                      {item.category}
                    </div>
                    <div className="mt-1 h-px w-10 bg-gold" />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

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
              <img src={preview.src} alt={preview.alt} className="w-full max-h-[80vh] object-contain bg-charcoal" />
              <div className="p-6 text-[10px] tracking-luxury uppercase text-muted-foreground">
                {preview.category}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteShell>
  );
}

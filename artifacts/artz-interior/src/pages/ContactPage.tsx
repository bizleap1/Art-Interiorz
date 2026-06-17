import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Contact } from "@/components/site/Contact";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { faqData } from "@/data/faqData";
import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ContactPage() {
  const [open, setOpen] = useState<number | null>(0);
  useEffect(() => {
    document.title = "Contact Us | Art Interiorz Nagpur";
  }, []);

  return (
    <SiteShell>
      <PageHero
        title="Contact Us"
        crumb="Contact"
        image="/assets/about.jpg"
      />
      <Contact fullWidthMap />

      <section className="py-28 lg:py-40 bg-warm-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <Reveal><SectionLabel><span className="mx-auto">{faqData.label}</span></SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05]">
                {faqData.heading.prefix}{" "}
                <em className="italic text-gradient-gold">{faqData.heading.emphasis}</em>{" "}
                {faqData.heading.suffix}
              </h2>
            </Reveal>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {faqData.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span className="font-display text-xl md:text-2xl text-charcoal group-hover:text-gold transition-colors">
                      {item.q}
                    </span>
                    <span className="flex-shrink-0 w-9 h-9 border border-border group-hover:border-gold group-hover:text-gold flex items-center justify-center transition-colors">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-muted-foreground leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

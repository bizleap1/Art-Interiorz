import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import {
  serviceCategoriesData,
  servicesDetailData,
  processData,
} from "@/data/servicesAllData";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  useEffect(() => {
    document.title = "Our Services | Art Interiorz Nagpur";
  }, []);

  return (
    <SiteShell>
      <PageHero
        title="Services"
        crumb="Services"
        image="/assets/kitchen.jpg"
      />

      {/* Featured service categories — alternating image + text */}
      <section className="py-28 lg:py-40 bg-warm-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl mb-20">
            <Reveal><SectionLabel>{serviceCategoriesData.label}</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
                {serviceCategoriesData.heading.prefix}{" "}
                <em className="italic text-gradient-gold">{serviceCategoriesData.heading.emphasis}</em>{" "}
                {serviceCategoriesData.heading.suffix}
              </h2>
            </Reveal>
          </div>
          <div className="space-y-24">
            {serviceCategoriesData.items.map((item, i) => (
              <div
                key={item.title}
                className={`grid lg:grid-cols-12 gap-12 items-center ${
                  i % 2 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <Reveal className="lg:col-span-7 lg:[direction:ltr]">
                  <motion.div
                    className="aspect-[5/4] overflow-hidden group relative"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="text-[9px] tracking-[0.25em] uppercase text-warm-white bg-gold px-3 py-1.5">
                        {item.tagline}
                      </span>
                    </div>
                  </motion.div>
                </Reveal>
                <Reveal delay={0.15} className="lg:col-span-5 lg:[direction:ltr]">
                  <div className="text-xs tracking-luxury uppercase text-gold mb-3">0{i + 1}</div>
                  <h3 className="font-display text-3xl md:text-5xl leading-tight">{item.title}</h3>
                  <p className="mt-4 italic text-charcoal/70">{item.tagline}</p>
                  <p className="mt-5 text-muted-foreground leading-relaxed">{item.text}</p>
                  <ul className="mt-8 space-y-3">
                    {item.points.map((p) => (
                      <motion.li
                        key={p}
                        className="flex items-start gap-3 text-charcoal group/item cursor-default"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <Check size={16} className="mt-1 text-gold flex-shrink-0 group-hover/item:scale-110 transition-transform" strokeWidth={1.6} />
                        <span className="text-[15px] leading-relaxed">{p}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Reveal delay={0.3}>
                    <Link
                      href="/contact"
                      className="mt-8 inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] uppercase text-charcoal border-b border-gold pb-1 hover:text-gold transition-colors group"
                    >
                      Get a Quote
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Reveal>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full service suite — expandable cards */}
      <section className="py-28 lg:py-40 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl mb-16">
            <Reveal><SectionLabel>Our Full Suite</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
                Eight ways we <em className="italic text-gradient-gold">shape</em> space.
              </h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 gap-4 items-start">
            {servicesDetailData.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04} className="h-fit">
                <motion.div
                  className="bg-warm-white overflow-hidden border border-border/50 hover:border-gold/30 transition-colors duration-300 group cursor-pointer h-fit"
                  onClick={() => setExpandedService(expandedService === i ? null : i)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card header — always visible */}
                  <div className="p-7 lg:p-9 flex items-start gap-6">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                        0{i + 1}
                      </div>
                      <h3 className="font-display text-xl lg:text-2xl group-hover:text-gold transition-colors">{s.title}</h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed text-[13px] line-clamp-2">{s.text}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedService === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <ChevronDown size={18} className="text-muted-foreground group-hover:text-gold transition-colors" />
                    </motion.div>
                  </div>

                  {/* Expandable content */}
                  <AnimatePresence>
                    {expandedService === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 lg:px-9 pb-7 border-t border-border/50 pt-6">
                          <div className="flex gap-6 items-start">
                            <div className="flex-1">
                              <p className="text-muted-foreground text-[14px] leading-relaxed">{s.text}</p>
                              <Link
                                href="/contact"
                                className="mt-5 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold text-gold border-b border-gold/40 pb-0.5 hover:border-gold transition-colors"
                              >
                                Enquire About This Service <ArrowRight size={11} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-28 lg:py-40 bg-warm-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl mb-16">
            <Reveal><SectionLabel>{processData.label}</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
                {processData.heading.prefix}{" "}
                <em className="italic text-gradient-gold">{processData.heading.emphasis}</em>{" "}
                {processData.heading.suffix}
              </h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {processData.steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <motion.div
                  className="bg-warm-white p-8 h-full group hover:bg-charcoal transition-colors duration-500 cursor-default"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="font-display text-5xl text-gradient-gold group-hover:text-gold transition-colors">{step.n}</div>
                  <div className="mt-6 font-display text-xl text-charcoal group-hover:text-warm-white transition-colors">{step.title}</div>
                  <p className="mt-3 text-sm text-muted-foreground group-hover:text-warm-white/60 leading-relaxed transition-colors">{step.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={0.4}>
            <div className="mt-28 text-center">
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Ready to start your interior design journey? Let's talk about your space.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-charcoal text-warm-white px-10 py-4 text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-gold transition-colors duration-300"
              >
                Book a Free Consultation
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

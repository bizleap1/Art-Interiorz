import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { aboutData } from "@/data/aboutData";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function About() {
  return (
    <section id="about" className="relative py-28 lg:py-40 bg-warm-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">

        {/* Left: image + badge */}
        <Reveal className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.img
              src="/assets/about.jpg"
              alt="The Art Interiorz design studio in Nagpur"
              loading="lazy"
              className="h-full w-full object-cover"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* overlay tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
          </div>

          {/* Founders mini card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute -bottom-6 -right-4 md:-right-10 hidden md:flex items-center gap-4 bg-charcoal text-warm-white p-5 shadow-luxury w-64"
          >
            <img
              src="/assets/founders.png"
              alt="Founders"
              loading="lazy"
              className="w-14 h-14 object-cover object-top flex-shrink-0 grayscale brightness-110"
            />
            <div>
              <div className="font-display text-lg leading-tight">Est. 2017</div>
              <div className="text-[10px] tracking-luxury uppercase text-warm-white/60 mt-1">
                Kapil &amp; Kratika Thakur
              </div>
              <div className="h-px w-10 bg-gold mt-2" />
            </div>
          </motion.div>
        </Reveal>

        {/* Right: content */}
        <div className="lg:col-span-7 lg:pl-10">
          <Reveal>
            <SectionLabel>{aboutData.label}</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
              {aboutData.heading.prefix}{" "}
              <em className="italic text-gradient-gold">{aboutData.heading.emphasis}</em>{" "}
              {aboutData.heading.suffix}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-muted-foreground text-[15px] leading-relaxed max-w-xl">
              {aboutData.description}
            </p>
          </Reveal>

          {/* Why choose us — 3 pill highlights */}
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Personalised approach", "Premium craftsmanship", "Transparent pricing", "On-time delivery"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 border border-border text-xs tracking-[0.15em] uppercase text-charcoal/80">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.3}>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase border-b border-gold pb-1 text-charcoal hover:text-gold transition-colors group"
            >
              Discover Our Story
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-border pt-10">
            {aboutData.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div>
                  <div className="font-display text-4xl md:text-5xl text-charcoal leading-none">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[10px] tracking-luxury uppercase text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

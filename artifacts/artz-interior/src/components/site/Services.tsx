import { Reveal, SectionLabel } from "./Reveal";
import { motion } from "framer-motion";
import { servicesData } from "@/data/servicesData";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const serviceImages = [
  "/assets/interior-design.jpeg",
  "/assets/kitchen.jpg",
  "/assets/renovation.jpeg",
  "/assets/art-int.png",
  "/assets/hospitality.jpeg",
  "/assets/turnkey-ench.jpg",
];

export function Services() {
  return (
    <section id="services" className="relative py-28 lg:py-40 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <Reveal><SectionLabel>{servicesData.label}</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
                {servicesData.heading.prefix}{" "}
                <em className="italic text-gradient-gold">{servicesData.heading.emphasis}</em>{" "}
                {servicesData.heading.suffix}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-4 items-start lg:items-end">
              <p className="text-muted-foreground max-w-sm text-[15px] leading-relaxed">
                {servicesData.intro}
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase border-b border-gold pb-1 text-charcoal hover:text-gold transition-colors group"
              >
                All Services
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Service cards — with image thumbnails */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35 }}
                className="group relative bg-warm-white overflow-hidden h-full flex flex-col shadow-luxury"
              >
                {/* Image thumbnail */}
                <div className="aspect-[4/3] overflow-hidden bg-beige">
                  <img
                    src={serviceImages[i]}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Card body */}
                <div className="relative p-8 flex flex-col flex-1">
                  {/* Gold accent line on hover */}
                  <div className="absolute top-0 left-8 right-8 h-px gold-line opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-start justify-between gap-3 mb-5">
                    <s.icon className="text-gold" size={28} strokeWidth={1.3} />
                    <span className="text-xs tracking-luxury uppercase text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl mb-3 group-hover:text-gold transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[14px] flex-1">{s.text}</p>

                  <Link href="/services" className="mt-6 pt-5 border-t border-border flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-charcoal/60 group-hover:text-gold transition-colors duration-300">
                    Learn more <span className="h-px w-5 bg-current transition-all group-hover:w-10" />
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

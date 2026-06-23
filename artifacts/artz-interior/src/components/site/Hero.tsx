import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Star } from "lucide-react";
import { heroData } from "@/data/heroData";
import { Link } from "wouter";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const heroImage = heroData.slides[0];

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden flex items-center">
      {/* Static hero background */}
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/10 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-28 flex flex-col will-change-[opacity,transform]"
      >
        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0 }}
          className="flex flex-wrap items-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2 text-warm-white/90">
            <span className="h-px w-12 bg-gold" />
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase">{heroData.eyebrow}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-warm-white/10 backdrop-blur-sm border border-warm-white/20 px-3 py-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} size={11} className="text-gold fill-gold" />
            ))}
            <span className="ml-1 text-warm-white/80 text-[11px]">600+ happy clients</span>
          </div>
        </motion.div>

        <motion.h1
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-warm-white text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[1.06] max-w-5xl"
        >
          {heroData.title.line1}
          <br />
          <em className="italic font-light" style={{ color: "var(--gold-soft)" }}>
            {heroData.title.emphasis}
          </em>{" "}
          <span className="text-warm-white">{heroData.title.line2}</span>
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0 }}
          className="mt-8 max-w-lg text-warm-white/90 font-light text-[17px] leading-relaxed"
        >
          {heroData.subtitle}
        </motion.p>

        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0 }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <Link
            href={heroData.primaryCta.href}
            className="group inline-flex items-center gap-3 bg-warm-white text-charcoal px-9 py-4 text-[11px] font-bold tracking-[0.28em] uppercase hover:bg-gold hover:text-warm-white transition-all duration-400"
          >
            {heroData.primaryCta.label}
            <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
          </Link>
          <Link
            href={heroData.secondaryCta.href}
            className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-warm-white border-b-2 border-warm-white/40 pb-1 hover:border-gold hover:text-gold transition-colors group"
          >
            {heroData.secondaryCta.label}
            <span className="h-px w-4 bg-current group-hover:w-8 transition-all duration-300" />
          </Link>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0 }}
          className="mt-20 pt-10 border-t border-warm-white/15 flex flex-wrap gap-10"
        >
          {[
            { value: "9+", label: "Years of craft" },
            { value: "650+", label: "Projects" },
            { value: "600+", label: "Happy clients" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-3">
              <span className="font-display text-4xl text-warm-white leading-none">{s.value}</span>
              <span className="text-[10px] tracking-luxury uppercase text-warm-white/60">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>


    </section>
  );
}

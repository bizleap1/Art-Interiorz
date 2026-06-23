import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import {
  CheckCircle2,
  Box,
  Star,
  Layers,
  BadgeCheck,
  IndianRupee,
} from "lucide-react";
import { Link } from "wouter";

const reasons = [
  {
    id: "interior-excellence",
    label: "Interior Excellence",
    image: "/assets/portfolio/Services/specialize/hospitality-design.webp",
    icon: Star,
    is3D: false,
  },
  {
    id: "guaranteed-satisfaction",
    label: "Guaranteed Satisfaction",
    image: "/assets/guaranteed_satisfaction.png",
    icon: BadgeCheck,
    is3D: false,
  },
  {
    id: "modular-kitchen",
    label: "Modular Storage",
    image: "/assets/modular_storage.png",
    icon: Layers,
    is3D: false,
  },
  {
    id: "3d-insights",
    label: "3D Insights",
    image: "/assets/3d_insights.png",
    icon: Box,
    is3D: false,
  },
  {
    id: "smart-pricing",
    label: "Smart Pricing",
    image: "/assets/smart_pricing.png",
    icon: IndianRupee,
    is3D: false,
  },
];

const bullets = [
  "Personalised, client-focused approach",
  "Attention to detail and premium quality materials",
  "Expert project management and timely execution",
  "Designs that balance aesthetics and functionality",
  "Transparent pricing with no hidden surprises",
];

/* ---------- 3-D cube SVG symbol ---------- */
function ThreeDCubeSymbol() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 drop-shadow-[0_0_8px_rgba(197,158,80,0.9)]"
    >
      {/* top face */}
      <polygon
        points="32,6 56,18 32,30 8,18"
        fill="rgba(197,158,80,0.85)"
        stroke="#c59e50"
        strokeWidth="1"
      />
      {/* left face */}
      <polygon
        points="8,18 32,30 32,54 8,42"
        fill="rgba(100,80,30,0.75)"
        stroke="#c59e50"
        strokeWidth="1"
      />
      {/* right face */}
      <polygon
        points="56,18 32,30 32,54 56,42"
        fill="rgba(150,120,45,0.75)"
        stroke="#c59e50"
        strokeWidth="1"
      />
      {/* vertical edge lines */}
      <line x1="32" y1="30" x2="32" y2="54" stroke="#c59e50" strokeWidth="1.2" />
    </svg>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 lg:py-36 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <Reveal><SectionLabel><span className="mx-auto">Why Us</span></SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.07]">
              Why We're the{" "}
              <em className="italic text-gradient-gold">Right Choice</em>
              <br className="hidden md:block" /> for Your Space
            </h2>
          </Reveal>
        </div>

        {/* 5 image cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {reasons.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.35 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer"
              >
                <img
                  src={r.image}
                  alt={r.label}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                {/* Refined gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-90" />

                {/* Icon badge — top left */}
                <div className={`absolute top-3 left-3 flex items-center justify-center w-9 h-9 rounded-full ${r.is3D ? "bg-transparent" : "bg-charcoal/50 backdrop-blur-sm border border-warm-white/20"}`}>
                  {r.is3D ? (
                    <ThreeDCubeSymbol />
                  ) : (
                    <r.icon size={16} className="text-gold" strokeWidth={1.6} />
                  )}
                </div>

                {/* Gold hover top line */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Label */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  {r.is3D && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-gold font-semibold">3D Modelling</span>
                    </div>
                  )}
                  <p className="text-warm-white font-medium text-sm tracking-wide leading-snug">{r.label}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Why Choose bullets + images */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left — 3 stacked images */}
          <Reveal className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-3 h-[340px]">
              <div className="col-span-1 overflow-hidden rounded-lg">
                <img src="/assets/heronew.jpg" alt="Interior" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="col-span-1 overflow-hidden rounded-lg mt-8">
                <img src="/assets/livingroom.jpg" alt="Living room" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="col-span-1 overflow-hidden rounded-lg">
                <img src="/assets/bedroom.jpg" alt="Bedroom" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </Reveal>

          {/* Right — bullets */}
          <div className="lg:col-span-7 lg:pl-8">
            <Reveal><SectionLabel>Our Process</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h3 className="mt-5 font-display text-3xl md:text-4xl lg:text-5xl leading-tight">
                How We Bring Your{" "}
                <em className="italic text-gradient-gold">Vision</em> to Life
              </h3>
            </Reveal>
            <div className="mt-10 space-y-6">
              {[
                { title: "Book your consultation", desc: "Start your journey by scheduling an initial meeting." },
                { title: "Design consultation", desc: "Discuss your vision, requirements, and budget with our experts." },
                { title: "Design sign off", desc: "Review and approve the finalized 3D designs and quotations." },
                { title: "Expert installation", desc: "Our skilled team brings your approved design to life on-site." },
                { title: "Styling and decor", desc: "Adding the final touches with curated furniture and accessories." },
                { title: "Handover", desc: "Your dream space is ready. Welcome to your new home." }
              ].map((step, i) => (
                <Reveal key={step.title} delay={0.15 + i * 0.08}>
                  <div className="flex gap-5 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center bg-ivory text-gold font-display text-sm group-hover:bg-gold group-hover:text-warm-white transition-colors">
                        {i + 1}
                      </div>
                      {i !== 5 && <div className="w-px h-full bg-border mt-2 group-hover:bg-gold/50 transition-colors" />}
                    </div>
                    <div className="pb-4">
                      <h4 className="font-semibold text-charcoal text-base">{step.title}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.6}>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-3 bg-charcoal text-warm-white px-8 py-3.5 text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-gold transition-colors duration-300"
              >
                Start Your Project
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

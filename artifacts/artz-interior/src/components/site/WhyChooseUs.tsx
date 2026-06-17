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
    label: "",
    image: "/assets/Interior-Excellence-1-267x300.jpg",
    icon: Star,
    is3D: false,
  },
  {
    id: "guaranteed-satisfaction",
    label: "",
    image: "/assets/guarranteed%20Satisfaction.webp",
    icon: BadgeCheck,
    is3D: false,
  },
  {
    id: "modular-kitchen",
    label: "",
    image: "/assets/modularkitchen2.webp",
    icon: Layers,
    is3D: false,
  },
  {
    id: "3d-insights",
    label: "",
    image: "/assets/3D-Insights-.webp",
    icon: Box,
    is3D: false,
  },
  {
    id: "smart-pricing",
    label: "",
    image: "/assets/Smart%20pricing%20img.webp",
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
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />

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
                <div className="absolute bottom-0 inset-x-0 p-4">
                  {r.is3D && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-gold font-semibold">3D Modelling</span>
                    </div>
                  )}
                  <p className="text-warm-white font-medium text-[13px] leading-snug">{r.label}</p>
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
                <img src="/assets/hero.jpg" alt="Interior" loading="lazy" className="h-full w-full object-cover" />
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
            <Reveal><SectionLabel>Our Promise</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h3 className="mt-5 font-display text-3xl md:text-4xl lg:text-5xl leading-tight">
                Why Choose{" "}
                <em className="italic text-gradient-gold">Art Interiorz</em>
              </h3>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {bullets.map((b, i) => (
                <Reveal key={b} delay={0.15 + i * 0.06}>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                    <span className="text-charcoal text-[15px] leading-relaxed">{b}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.5}>
              <Link
                href="/about"
                className="mt-10 inline-flex items-center gap-3 bg-charcoal text-warm-white px-8 py-3.5 text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-gold transition-colors duration-300"
              >
                Learn More About Us
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

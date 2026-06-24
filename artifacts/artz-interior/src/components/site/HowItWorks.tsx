import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { Calendar, MessageSquare, CheckSquare, Hammer, Sparkles, Gift } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Book your consultation",
    desc: "Start your journey by scheduling an initial meeting.",
    accent: "#C9A84C",
  },
  {
    icon: MessageSquare,
    title: "Design consultation",
    desc: "Discuss your vision, requirements, and budget with our experts.",
    accent: "#6B8EAD",
  },
  {
    icon: CheckSquare,
    title: "Design sign off",
    desc: "Review and approve the finalized 3D designs and quotations.",
    accent: "#5A9E7A",
  },
  {
    icon: Hammer,
    title: "Expert installation",
    desc: "Our skilled team brings your approved design to life on-site.",
    accent: "#C07A45",
  },
  {
    icon: Sparkles,
    title: "Styling and decor",
    desc: "Adding the final touches with curated furniture and accessories.",
    accent: "#A67B5B",
  },
  {
    icon: Gift,
    title: "Handover",
    desc: "Your dream space is ready. Welcome to your new home.",
    accent: "#9B72B0",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-36 bg-charcoal overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <Reveal>
            <SectionLabel>
              <span className="mx-auto text-warm-white/50">Our Process</span>
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.07] text-warm-white">
              How It{" "}
              <em className="italic" style={{ color: "var(--gold-soft)" }}>
                Works
              </em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-warm-white/60 max-w-lg mx-auto text-[15px] leading-relaxed">
              From first conversation to final reveal — a seamless six-step journey to your dream space.
            </p>
          </Reveal>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 relative">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative flex flex-col items-center text-center p-8 bg-warm-white/5 border border-warm-white/10 rounded-2xl group hover:border-gold/30 hover:bg-warm-white/10 transition-all duration-300 h-full z-10"
              >
                {/* Step Number Badge */}
                <div className="absolute top-4 right-4 text-[11px] font-bold tracking-widest text-warm-white/20 group-hover:text-gold/50 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icon container */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border transition-all duration-300 relative"
                  style={{
                    borderColor: `${step.accent}30`,
                    backgroundColor: `${step.accent}15`,
                    boxShadow: `0 0 15px ${step.accent}10`,
                  }}
                >
                  {/* Subtle glow effect */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, ${step.accent}30 0%, transparent 70%)`,
                    }}
                  />
                  <step.icon
                    size={24}
                    className="transition-colors duration-300 text-warm-white/80 group-hover:text-gold"
                    style={{ color: step.accent }}
                    strokeWidth={1.4}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-warm-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] leading-relaxed text-warm-white/50 group-hover:text-warm-white/70 transition-colors duration-300 flex-1">
                  {step.desc}
                </p>

                {/* Connector Line for Desktop */}
                {i < steps.length - 1 && (i + 1) % 3 !== 0 && (
                  <div className="hidden lg:block absolute top-16 -right-3 w-6 border-t border-dashed border-warm-white/15 z-0" />
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA bar */}
        <Reveal delay={0.5}>
          <div className="mt-20 pt-12 border-t border-warm-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-warm-white/60 text-[15px] max-w-sm text-center sm:text-left">
              Ready to transform your space? Let's start with a free consultation.
            </p>
            <a
              href="https://wa.me/919545002017?text=Hello%2C%20I%20want%20to%20start%20my%20interior%20design%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gold text-warm-white px-8 py-3.5 text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-warm-white hover:text-charcoal transition-colors duration-300 shrink-0"
            >
              Start Your Project
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


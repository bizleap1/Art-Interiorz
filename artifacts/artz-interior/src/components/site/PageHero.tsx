import { motion } from "framer-motion";
import { Link } from "wouter";

export function PageHero({
  title,
  crumb,
  image,
}: {
  title: string;
  crumb: string;
  image: string;
}) {
  return (
    <section className="relative h-[62vh] min-h-[460px] w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Strong dark overlay so text stays readable on any image */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/85" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-16">
        {/* Breadcrumb */}
        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-7 will-change-[opacity,transform]"
        >
          <span className="h-px w-10 bg-gold" />
          <Link
            href="/"
            className="text-warm-white/80 text-[11px] font-medium tracking-[0.22em] uppercase hover:text-gold transition-colors"
          >
            Home
          </Link>
          <span className="text-warm-white/40 text-[11px]">/</span>
          <span className="text-warm-white text-[11px] font-medium tracking-[0.22em] uppercase">
            {crumb}
          </span>
        </motion.div>

        {/* Page title */}
        <motion.h1
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-warm-white text-5xl sm:text-6xl lg:text-8xl leading-[1] will-change-[opacity,transform]"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}

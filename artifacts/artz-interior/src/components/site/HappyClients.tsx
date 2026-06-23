import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { Play, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const videos = [
  {
    id: "-NtoC0LeJzk",
    thumb: "https://img.youtube.com/vi/-NtoC0LeJzk/hqdefault.jpg",
    fallback: "/assets/livingroom.jpg",
    quote: "They dreamed. We teamed. Together, the perfect space was born.",
    name: "Shraddha Malviya",
    location: "Manish Nagar",
    type: "Living Room",
  },
  {
    id: "GIect0o-JvY",
    thumb: "https://img.youtube.com/vi/GIect0o-JvY/hqdefault.jpg",
    fallback: "/assets/bedroom.jpg",
    quote: "They pictured it. We perfected it. Now, it's their forever home.",
    name: "Abhishekh Mendulkar",
    location: "Dabha Wadi",
    type: "Bedroom Design",
  },
  {
    id: "2UqJOidnjg8",
    thumb: "https://img.youtube.com/vi/2UqJOidnjg8/hqdefault.jpg",
    fallback: "/assets/kitchen.jpg",
    quote: "From Pinterest boards to real home goals. Another happy client by Art Interiorz.",
    name: "Narendra Bhatad",
    location: "Dhaba Wadi",
    type: "Complete Home",
  },
  {
    id: "s-VqDnUZhFw",
    thumb: "https://img.youtube.com/vi/s-VqDnUZhFw/hqdefault.jpg",
    fallback: "/assets/dinning.jpg",
    quote: "Every corner, every detail — crafted exactly as we imagined it.",
    name: "Rahul Patle",
    location: "Manish Nagar",
    type: "Modular Interior",
  },
  {
    id: "zRm2Ca2yLt8",
    thumb: "https://img.youtube.com/vi/zRm2Ca2yLt8/hqdefault.jpg",
    fallback: "/assets/modularkitchen.webp",
    quote: "Art Interiorz turned our house into the home we always dreamed of.",
    name: "Tanaya Tripathi",
    location: "Godrej",
    type: "Full Renovation",
  },
  {
    id: "e-zgonynVY0",
    thumb: "https://img.youtube.com/vi/e-zgonynVY0/hqdefault.jpg",
    fallback: "/assets/hero.jpg",
    quote: "We wanted a space that felt like us. Art Interiorz delivered exactly that.",
    name: "Sapna Jadhav",
    location: "Ujwal Nagar",
    type: "Full Home Design",
  },
  {
    id: "2hV67o8GL6U",
    thumb: "https://img.youtube.com/vi/2hV67o8GL6U/hqdefault.jpg",
    fallback: "/assets/kitchen.jpg",
    quote: "From concept to completion — a seamless, beautiful experience.",
    name: "Mahesh Dhul",
    location: "Jaitala",
    type: "Turnkey Project",
  },
  {
    id: "zcmxHODPhS4",
    thumb: "https://img.youtube.com/vi/zcmxHODPhS4/hqdefault.jpg",
    fallback: "/assets/livingroom.jpg",
    quote: "The 3D visualizations matched the final result almost exactly.",
    name: "Santosh Shirsat",
    location: "New Manish Nagar",
    type: "Modular Kitchen",
  },
  {
    id: "fvvzKTANszk",
    thumb: "https://img.youtube.com/vi/fvvzKTANszk/hqdefault.jpg",
    fallback: "/assets/bedroom.jpg",
    quote: "Best decision we made — a home that exceeds our every expectation.",
    name: "Ajay Gohane",
    location: "Sonegao Lake",
    type: "Hospitality Design",
  },
];

export function HappyClients() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const PER_PAGE = 3;
  const totalPages = Math.ceil(videos.length / PER_PAGE);
  const visibleVideos = videos.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section id="happy-clients" className="py-24 lg:py-36 bg-ivory overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal><SectionLabel>Client Stories</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.07]">
                Our <em className="italic text-gradient-gold">Happy</em> Clients
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-3 text-muted-foreground text-[15px] max-w-md">
                Real projects, real clients — watch how we transform houses into dream homes across Nagpur.
              </p>
            </Reveal>
          </div>
          {/* Nav + YouTube channel link */}
          <Reveal delay={0.2}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  aria-label="Previous page"
                  className="w-10 h-10 border border-border flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-warm-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={17} />
                </button>
                <span className="text-[12px] tracking-wider text-muted-foreground tabular-nums">
                  {page + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  aria-label="Next page"
                  className="w-10 h-10 border border-border flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-warm-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
              <a
                href="https://www.youtube.com/@Art_Interiorz"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase border border-border px-4 py-2.5 text-charcoal hover:bg-charcoal hover:text-warm-white transition-all"
              >
                All Videos <ExternalLink size={11} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Video cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleVideos.map((v, idx) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActiveVideoId(v.id)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                  <img
                    src={v.thumb}
                    alt={v.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.src = v.fallback;
                    }}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/10 transition-colors duration-400" />
                  {/* Logo top-right */}
                  <div className="absolute top-3 right-3">
                    <img src="/assets/logo.png" alt="Art Interiorz" className="h-7 w-auto brightness-0 invert opacity-70" />
                  </div>
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-luxury">
                      <Play size={20} className="text-warm-white ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  {/* Type badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] tracking-luxury uppercase text-gold border border-gold/50 bg-charcoal/60 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                      {v.type}
                    </span>
                  </div>
                </div>

                {/* Card text */}
                <p className="font-display text-[16px] text-charcoal italic leading-snug mb-2 group-hover:text-gold transition-colors">
                  "{v.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-semibold text-charcoal">{v.name}</div>
                    <div className="text-[11px] tracking-wider uppercase text-muted-foreground mt-0.5">{v.location}</div>
                  </div>
                  <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity text-sm">▶</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Page dots and Many More */}
        <div className="flex flex-col items-center justify-center mt-12 gap-10">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === page ? "w-8 h-2 bg-gold" : "w-2 h-2 bg-border hover:bg-charcoal/40"
                }`}
              />
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="flex items-center gap-6 text-charcoal/60 hover:text-gold transition-colors duration-300">
              <span className="h-px w-20 bg-gradient-to-r from-transparent to-current"></span>
              <span className="font-display text-2xl md:text-3xl tracking-[0.1em] italic text-gradient-gold">And Many More...</span>
              <span className="h-px w-20 bg-gradient-to-l from-transparent to-current"></span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveVideoId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src="/assets/logo.png" alt="Art Interiorz" className="h-8 w-auto brightness-0 invert" />
                  <span className="text-warm-white/60 text-sm">Client Project Tour</span>
                </div>
                <button
                  onClick={() => setActiveVideoId(null)}
                  className="flex items-center gap-1.5 text-warm-white/60 hover:text-warm-white transition-colors text-sm"
                >
                  <X size={16} /> Close
                </button>
              </div>
              {/* YouTube iframe */}
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Art Interiorz Client Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              {/* Footer */}
              <p className="mt-3 text-center text-warm-white/40 text-xs">
                Press Esc or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

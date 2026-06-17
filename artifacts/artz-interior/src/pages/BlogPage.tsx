import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { blogData, type BlogPost } from "@/data/blogData";
import { ArrowUpRight, X, Clock, Tag, ChevronRight } from "lucide-react";

const categoryColors: Record<string, string> = {
  Residential: "text-emerald-600",
  Kitchen: "text-amber-600",
  Renovation: "text-blue-600",
  Hospitality: "text-purple-600",
  Process: "text-rose-600",
  Guides: "text-teal-600",
};

function BlogModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] overflow-y-auto"
      style={{ background: "rgba(28,26,26,0.88)", backdropFilter: "blur(8px)" }}
    >
      <div className="min-h-screen flex items-start justify-center p-4 pt-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-warm-white shadow-luxury"
        >
          {/* Hero image */}
          <div className="relative aspect-[16/7] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal/70 backdrop-blur-sm flex items-center justify-center text-warm-white hover:bg-gold transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-luxury uppercase mb-5">
              <span className={`flex items-center gap-1.5 ${categoryColors[post.category] ?? "text-gold"}`}>
                <Tag size={10} />
                {post.category}
              </span>
              <span className="h-px w-6 bg-border" />
              <span className="text-muted-foreground">{post.date}</span>
              <span className="h-px w-6 bg-border" />
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock size={10} />
                {post.readTime}
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl leading-tight text-charcoal">
              {post.title}
            </h2>

            <div className="mt-2 h-px w-16 bg-gold" />

            <p className="mt-6 text-charcoal/70 italic leading-relaxed text-lg">
              {post.excerpt}
            </p>

            <div className="mt-8 space-y-5">
              {post.body.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  className="text-muted-foreground leading-[1.85] text-[15px]"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                — Art Interiorz Design Journal
              </p>
              <a
                href="https://wa.me/919545002017?text=Hello%2C%20I%20read%20your%20blog%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-charcoal text-warm-white px-6 py-3 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-gold transition-colors"
              >
                Discuss Your Project
                <ChevronRight size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

const ALL = "All";
const categories = [ALL, ...Array.from(new Set(blogData.posts.map((p) => p.category)))];

export default function BlogPage() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState(ALL);

  const filtered =
    filter === ALL ? blogData.posts : blogData.posts.filter((p) => p.category === filter);

  useEffect(() => {
    document.title = "Design Journal & Blog | Art Interiorz Nagpur";
  }, []);

  return (
    <SiteShell>
      <PageHero title={blogData.hero.title} crumb={blogData.hero.crumb} image={blogData.hero.image} />

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Intro + filters row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
            <div className="max-w-xl">
              <Reveal><SectionLabel>From the Studio</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{blogData.intro}</p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-[10px] tracking-[0.25em] uppercase pb-1 border-b transition-colors ${
                      filter === cat
                        ? "text-charcoal border-gold"
                        : "text-muted-foreground border-transparent hover:text-charcoal"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="sync" initial={false}>
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                    <article
                      className="group bg-warm-white h-full flex flex-col cursor-pointer"
                      onClick={() => setActivePost(post)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-ivory">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                        />
                        {/* Category badge */}
                        <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm text-warm-white text-[9px] tracking-[0.2em] uppercase px-3 py-1.5">
                          {post.category}
                        </div>
                      </div>
                      <div className="mt-5 flex items-center gap-3 text-[10px] tracking-luxury uppercase text-muted-foreground">
                        <span>{post.date}</span>
                        <span className="h-px w-6 bg-border" />
                        <span className="flex items-center gap-1">
                          <Clock size={9} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl lg:text-[1.6rem] leading-tight text-charcoal group-hover:text-gold transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="mt-4 text-muted-foreground leading-relaxed flex-1 text-[14px]">
                        {post.excerpt}
                      </p>
                      <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between">
                        <div className="h-px w-8 bg-gold transition-all duration-300 group-hover:w-16" />
                        <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-charcoal group-hover:text-gold transition-colors font-medium">
                          Read Article <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </article>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Blog post modal */}
      <AnimatePresence>
        {activePost && (
          <BlogModal post={activePost} onClose={() => setActivePost(null)} />
        )}
      </AnimatePresence>
    </SiteShell>
  );
}

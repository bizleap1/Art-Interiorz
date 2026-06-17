import { useEffect } from "react";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { aboutPageData } from "@/data/aboutPageData";
import { aboutData } from "@/data/aboutData";
import { Check, Quote } from "lucide-react";

export default function AboutPage() {
  const d = aboutPageData;
  useEffect(() => {
    document.title = "About Us | Art Interiorz Nagpur";
  }, []);

  return (
    <SiteShell>
      <PageHero title={d.hero.title} crumb={d.hero.crumb} image={d.hero.image} />

      {/* Intro */}
      <section className="py-28 lg:py-40 bg-warm-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img
                src={d.intro.image}
                alt="Art Interiorz studio"
                className="h-full w-full object-cover"
                initial={false}
                animate={{ scale: 1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:pl-10">
            <Reveal><SectionLabel>{d.intro.label}</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
                {d.intro.heading.prefix}{" "}
                <em className="italic text-gradient-gold">{d.intro.heading.emphasis}</em>{" "}
                {d.intro.heading.suffix}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-xl">
                {d.intro.body}
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-border pt-10">
              {aboutData.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1}>
                  <div>
                    <div className="font-display text-4xl md:text-5xl text-charcoal">{s.value}</div>
                    <div className="mt-2 text-[11px] tracking-luxury uppercase text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="py-28 lg:py-40 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl mb-20">
            <Reveal><SectionLabel>{d.popularServices.label}</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
                {d.popularServices.heading.prefix}{" "}
                <em className="italic text-gradient-gold">{d.popularServices.heading.emphasis}</em>{" "}
                {d.popularServices.heading.suffix}
              </h2>
            </Reveal>
          </div>
          <div className="space-y-24">
            {d.popularServices.items.map((item, i) => (
              <div
                key={item.title}
                className={`grid lg:grid-cols-12 gap-12 items-center ${
                  i % 2 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <Reveal className="lg:col-span-6 lg:[direction:ltr]">
                  <div className="aspect-[5/4] overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                </Reveal>
                <Reveal delay={0.15} className="lg:col-span-6 lg:[direction:ltr]">
                  <div className="text-xs tracking-luxury uppercase text-gold mb-3">0{i + 1}</div>
                  <h3 className="font-display text-3xl md:text-5xl leading-tight">{item.title}</h3>
                  <p className="mt-5 italic text-charcoal/70">{item.subtitle}</p>
                  <p className="mt-5 text-muted-foreground leading-relaxed">{item.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders — using the actual founders photo */}
      <section className="py-28 lg:py-40 bg-warm-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
          {/* Founders photo */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden bg-beige">
                <img
                  src="/assets/founders.png"
                  alt="Mr. Kapil Thakur & Mrs. Kratika Thakur — Founders of Art Interiorz"
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              {/* Gold accent card */}
              <div className="absolute -bottom-6 -right-6 hidden md:flex items-center gap-4 bg-charcoal text-warm-white px-7 py-5 shadow-luxury">
                <Quote size={22} className="text-gold flex-shrink-0" strokeWidth={1.4} />
                <div>
                  <div className="font-display text-base leading-snug">Designing with heart,<br />building for life.</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Founders text */}
          <div className="lg:col-span-7 lg:pl-10">
            <Reveal><SectionLabel>{d.founders.label}</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight">
                {d.founders.names}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-2 flex items-center gap-3 text-xs tracking-luxury uppercase text-gold">
                <span className="h-px w-8 bg-gold" />
                {d.founders.role}
              </div>
            </Reveal>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed text-[15px]">
              {d.founders.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.2 + i * 0.05}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.35}>
              <div className="mt-10 flex gap-6">
                <div className="border-l-2 border-gold pl-5">
                  <div className="font-display text-3xl text-charcoal">9+</div>
                  <div className="text-[10px] tracking-luxury uppercase text-muted-foreground mt-1">Years of practice</div>
                </div>
                <div className="border-l-2 border-gold pl-5">
                  <div className="font-display text-3xl text-charcoal">600+</div>
                  <div className="text-[10px] tracking-luxury uppercase text-muted-foreground mt-1">Happy clients</div>
                </div>
                <div className="border-l-2 border-gold pl-5">
                  <div className="font-display text-3xl text-charcoal">650+</div>
                  <div className="text-[10px] tracking-luxury uppercase text-muted-foreground mt-1">Projects done</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-28 bg-ivory">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <Reveal><SectionLabel><span className="mx-auto">Why Choose Us</span></SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight">
              Five reasons clients <em className="italic text-gradient-gold">choose</em> Art Interiorz.
            </h2>
          </Reveal>
          <ul className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-5 text-left max-w-3xl mx-auto">
            {aboutData.whyChoose.map((reason, i) => (
              <Reveal key={reason} delay={i * 0.05}>
                <li className="flex items-start gap-3">
                  <Check size={18} className="mt-1 text-gold flex-shrink-0" strokeWidth={1.6} />
                  <span className="text-charcoal">{reason}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}

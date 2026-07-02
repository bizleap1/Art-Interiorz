import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { footerData } from "@/data/footerData";

const socialIcons: Record<string, typeof Instagram> = {
  Instagram,
  Facebook,
  WhatsApp: MessageCircle,
  LinkedIn: Linkedin,
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-12 gap-12 pb-16 border-b border-warm-white/10">
          <div className="md:col-span-5">
            <Link href="/">
              <div className="font-display text-3xl cursor-pointer hover:opacity-80 transition-opacity">
                {footerData.brand}<span className="text-gradient-gold">.</span>
              </div>
            </Link>
            <p className="mt-5 text-warm-white/60 max-w-sm leading-relaxed">
              {footerData.tagline}
            </p>
            <div className="mt-4 text-xs text-warm-white/40 tracking-luxury uppercase">
              Designed and Maintained by <a href="https://bizleap.in/" target="_blank" rel="noreferrer" className="text-gold font-bold hover:opacity-80 transition-opacity">BIZLEAP</a>
            </div>
            <div className="mt-8 flex gap-3">
              {footerData.socials.map((s) => {
                const Icon = socialIcons[s.label] ?? Instagram;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-warm-white/15 hover:border-gold hover:text-gold transition-colors"
                  >
                    <Icon size={16} strokeWidth={1.4} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] tracking-luxury uppercase text-gold-soft mb-5">Explore</div>
            <ul className="space-y-3 text-warm-white/70">
              {footerData.explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[10px] tracking-luxury uppercase text-gold-soft mb-5">Studio</div>
            <ul className="space-y-3 text-warm-white/70">
              {footerData.studio.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li className="pt-2 text-xs tracking-luxury uppercase text-warm-white/40">
                {footerData.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-white/40">
          <div>Copyright 2017, ART Interiorz, All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}

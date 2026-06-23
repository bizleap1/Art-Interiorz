import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { useEffect } from "react";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const jobs = [
  {
    id: 1,
    title: "Senior Interior Designer",
    location: "Nagpur",
    type: "Full-Time",
    experience: "4-6 Years",
    description: "We are looking for a creative and experienced Senior Interior Designer to lead our luxury residential projects.",
  },
  {
    id: 2,
    title: "Site Supervisor",
    location: "Nagpur",
    type: "Full-Time",
    experience: "3+ Years",
    description: "Seeking a dedicated Site Supervisor to oversee daily operations, quality control, and timely execution of our interior projects.",
  },
  {
    id: 3,
    title: "3D Visualizer",
    location: "Remote / Nagpur",
    type: "Full-Time / Contract",
    experience: "2-5 Years",
    description: "Join our design team as a 3D Visualizer. Must have strong skills in 3ds Max, V-Ray, or Corona renderer.",
  }
];

export default function CareerPage() {
  useEffect(() => {
    document.title = "Careers | Art Interiorz Nagpur";
  }, []);

  return (
    <SiteShell>
      <PageHero
        title="Join Our Team"
        crumb="Careers"
        image="/assets/hall.jpg"
      />

      <section className="py-24 lg:py-32 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl mb-20">
            <Reveal><SectionLabel>Careers</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-charcoal">
                Build a career in creating <em className="italic text-gradient-gold">beautiful spaces</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                At Art Interiorz, we believe that great design comes from great people. 
                We are always looking for passionate, creative, and driven individuals to join our growing team. 
                If you have an eye for detail and a love for luxury interiors, we'd love to hear from you.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {jobs.map((job, idx) => (
              <Reveal key={job.id} delay={0.1 * idx}>
                <div className="bg-warm-white border border-border p-8 lg:p-10 hover:shadow-luxury transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex-1">
                    <h3 className="font-display text-2xl lg:text-3xl text-charcoal mb-4 group-hover:text-gold transition-colors">{job.title}</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-charcoal/70">
                      <span className="flex items-center gap-2 border border-border px-3 py-1.5"><MapPin size={16} className="text-gold" /> {job.location}</span>
                      <span className="flex items-center gap-2 border border-border px-3 py-1.5"><Briefcase size={16} className="text-gold" /> {job.type}</span>
                      <span className="flex items-center gap-2 border border-border px-3 py-1.5"><Clock size={16} className="text-gold" /> {job.experience}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Link href="/contact" className="inline-flex items-center gap-3 bg-charcoal text-warm-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold hover:text-warm-white transition-all">
                      Apply Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 text-center border-t border-border pt-16">
             <Reveal>
              <h3 className="font-display text-2xl text-charcoal mb-4">Don't see a perfect fit?</h3>
              <p className="text-muted-foreground mb-8">Send us your resume and portfolio anyway. We're always open to meeting talented people.</p>
              <a href="mailto:artinteriorz17@gmail.com" className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase text-charcoal border-b-2 border-charcoal pb-1 hover:border-gold hover:text-gold transition-colors">
                Email Us Your Resume
              </a>
             </Reveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

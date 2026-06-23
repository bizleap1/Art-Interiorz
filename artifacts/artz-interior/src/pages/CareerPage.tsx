import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function CareerPage() {
  const [isSubmittingVendor, setIsSubmittingVendor] = useState(false);
  const [sentVendor, setSentVendor] = useState(false);
  const [errorMsgVendor, setErrorMsgVendor] = useState("");
  const vendorFormRef = useRef<HTMLFormElement>(null);

  const [isSubmittingArchitect, setIsSubmittingArchitect] = useState(false);
  const [sentArchitect, setSentArchitect] = useState(false);
  const [errorMsgArchitect, setErrorMsgArchitect] = useState("");
  const architectFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.title = "Careers | Art Interiorz Nagpur";
  }, []);

  const handleVendorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittingVendor) return;

    setErrorMsgVendor("");
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("company_website")) {
      setSentVendor(true);
      return;
    }

    const serviceType = (data.get("service_type") as string)?.trim() ?? "";
    const productType = (data.get("product_type") as string)?.trim() ?? "";
    const message = (data.get("message") as string)?.trim() ?? "";

    const payload = {
      full_name: (data.get("name") as string)?.trim() ?? "",
      email: (data.get("email") as string)?.trim() ?? "",
      phone: (data.get("phone") as string)?.trim() ?? "",
      project_type: `Vendor Application - ${serviceType}`,
      message: `Service Type: ${serviceType}\nProduct Type: ${productType}\n\nAdditional Details:\n${message}`,
    };

    if (!payload.full_name || !payload.email || !payload.phone || !serviceType || !productType) {
      setErrorMsgVendor("Please fill out all required fields.");
      return;
    }

    try {
      setIsSubmittingVendor(true);
      const { data: responseData, error } = await supabase.functions.invoke("send-career-email", { body: payload });

      if (error) throw new Error(error.message || "Failed to submit application");
      if (responseData?.error) throw new Error(responseData.error);

      setSentVendor(true);
      vendorFormRef.current?.reset();
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsgVendor(err.message || "Something went wrong.");
    } finally {
      setIsSubmittingVendor(false);
    }
  };

  const handleArchitectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittingArchitect) return;

    setErrorMsgArchitect("");
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("company_website")) {
      setSentArchitect(true);
      return;
    }

    const portfolio = (data.get("portfolio") as string)?.trim() ?? "";
    const role = (data.get("role") as string)?.trim() ?? "";
    const message = (data.get("message") as string)?.trim() ?? "";

    const payload = {
      full_name: (data.get("name") as string)?.trim() ?? "",
      email: (data.get("email") as string)?.trim() ?? "",
      phone: (data.get("phone") as string)?.trim() ?? "",
      project_type: `Architect/Job Application - ${role}`,
      message: `Role Applied For: ${role}\nPortfolio/Resume Link: ${portfolio}\n\nCover Letter / Details:\n${message}`,
    };

    if (!payload.full_name || !payload.email || !payload.phone || !portfolio || !role) {
      setErrorMsgArchitect("Please fill out all required fields.");
      return;
    }

    try {
      setIsSubmittingArchitect(true);
      const { data: responseData, error } = await supabase.functions.invoke("send-career-email", { body: payload });

      if (error) throw new Error(error.message || "Failed to submit application");
      if (responseData?.error) throw new Error(responseData.error);

      setSentArchitect(true);
      architectFormRef.current?.reset();
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsgArchitect(err.message || "Something went wrong.");
    } finally {
      setIsSubmittingArchitect(false);
    }
  };

  return (
    <SiteShell>
      <PageHero
        title="Join Our Team"
        crumb="Careers"
        image="/assets/hall.jpg"
      />

      <section className="py-24 lg:py-32 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-20">
            <Reveal><SectionLabel><span className="mx-auto">Work With Us</span></SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-charcoal">
                Partner with us or <em className="italic text-gradient-gold">join the team</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Whether you're a talented architect ready to design beautiful spaces, or a vendor looking to supply premium materials, we'd love to hear from you.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Architect Form */}
            <Reveal delay={0.3}>
              <div className="bg-warm-white p-8 md:p-12 shadow-luxury border border-border h-full flex flex-col">
                <div className="mb-8 border-b border-border pb-6">
                  <h3 className="font-display text-2xl text-charcoal">Architect / Job Application</h3>
                  <p className="text-muted-foreground text-sm mt-2">Join our design team and build extraordinary spaces.</p>
                </div>

                {sentArchitect ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mb-6">
                      <CheckCircle2 className="text-gold" size={28} />
                    </div>
                    <h4 className="font-display text-2xl mb-3 text-charcoal">Application Received</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Thank you! Your application has been sent to HR.
                    </p>
                    <button
                      onClick={() => setSentArchitect(false)}
                      className="mt-8 text-xs tracking-luxury uppercase text-gold hover:text-charcoal transition-colors pb-1 border-b border-gold hover:border-charcoal"
                    >
                      Submit another
                    </button>
                  </div>
                ) : (
                  <form ref={architectFormRef} onSubmit={handleArchitectSubmit} className="flex flex-col flex-1">
                    {errorMsgArchitect && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-sm">
                        {errorMsgArchitect}
                      </div>
                    )}
                    <input type="text" name="company_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    <div className="space-y-6 mb-8 flex-1">
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Full Name</span>
                        <input type="text" name="name" required disabled={isSubmittingArchitect} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Email Address</span>
                        <input type="email" name="email" required disabled={isSubmittingArchitect} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Phone Number</span>
                        <input type="tel" name="phone" required disabled={isSubmittingArchitect} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Role Applied For</span>
                        <input type="text" name="role" placeholder="e.g. Senior Architect" required disabled={isSubmittingArchitect} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50 placeholder:text-muted-foreground/30" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Portfolio / Resume Link</span>
                        <input type="url" name="portfolio" placeholder="https://" required disabled={isSubmittingArchitect} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50 placeholder:text-muted-foreground/30" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Cover Letter / Details</span>
                        <textarea name="message" rows={3} disabled={isSubmittingArchitect} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal resize-none transition-colors disabled:opacity-50" />
                      </label>
                    </div>

                    <button type="submit" disabled={isSubmittingArchitect} className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full justify-center">
                      {isSubmittingArchitect ? "Submitting..." : "Submit Application"}
                      {!isSubmittingArchitect && <span className="h-px w-6 bg-warm-white group-hover:w-10 transition-all" />}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Vendor Form */}
            <Reveal delay={0.4}>
              <div className="bg-warm-white p-8 md:p-12 shadow-luxury border border-border h-full flex flex-col">
                <div className="mb-8 border-b border-border pb-6">
                  <h3 className="font-display text-2xl text-charcoal">Vendor / Supplier Registration</h3>
                  <p className="text-muted-foreground text-sm mt-2">Partner with us to provide premium materials and services.</p>
                </div>

                {sentVendor ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mb-6">
                      <CheckCircle2 className="text-gold" size={28} />
                    </div>
                    <h4 className="font-display text-2xl mb-3 text-charcoal">Registration Received</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Thank you! Your details have been sent to our procurement team.
                    </p>
                    <button
                      onClick={() => setSentVendor(false)}
                      className="mt-8 text-xs tracking-luxury uppercase text-gold hover:text-charcoal transition-colors pb-1 border-b border-gold hover:border-charcoal"
                    >
                      Submit another
                    </button>
                  </div>
                ) : (
                  <form ref={vendorFormRef} onSubmit={handleVendorSubmit} className="flex flex-col flex-1">
                    {errorMsgVendor && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-sm">
                        {errorMsgVendor}
                      </div>
                    )}
                    <input type="text" name="company_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    <div className="space-y-6 mb-8 flex-1">
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Full Name / Contact Person</span>
                        <input type="text" name="name" required disabled={isSubmittingVendor} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Email Address</span>
                        <input type="email" name="email" required disabled={isSubmittingVendor} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Phone Number</span>
                        <input type="tel" name="phone" required disabled={isSubmittingVendor} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Service Type</span>
                        <input type="text" name="service_type" placeholder="e.g. Carpentry, Painting" required disabled={isSubmittingVendor} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50 placeholder:text-muted-foreground/30" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Product Type / Materials</span>
                        <input type="text" name="product_type" placeholder="e.g. Hardware, Laminates" required disabled={isSubmittingVendor} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50 placeholder:text-muted-foreground/30" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Company Overview / Details</span>
                        <textarea name="message" rows={3} disabled={isSubmittingVendor} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal resize-none transition-colors disabled:opacity-50" />
                      </label>
                    </div>

                    <button type="submit" disabled={isSubmittingVendor} className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full justify-center">
                      {isSubmittingVendor ? "Submitting..." : "Submit Registration"}
                      {!isSubmittingVendor && <span className="h-px w-6 bg-warm-white group-hover:w-10 transition-all" />}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </SiteShell>
  );
}

import { Mail, MapPin, Phone, Briefcase } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { contactData } from "@/data/contactData";
import { trackContactFormSubmission, trackCallButtonClick } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";

const iconMap = {
  Studio: MapPin,
  Telephone: Phone,
  Email: Mail,
  Careers: Briefcase,
} as const;

const mapEmbedUrl =
  "https://maps.google.com/maps?q=Manish+Nagar+Somalwada+Nagpur+Maharashtra+440015&t=&z=15&ie=UTF8&iwloc=&output=embed";

export function Contact({ fullWidthMap = false }: { fullWidthMap?: boolean }) {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    
    // Spam protection: Honeypot field
    if (data.get('company_website')) {
      // Silently succeed for bots
      setSent(true);
      return;
    }

    const formData = {
      full_name: (data.get('name') as string)?.trim() ?? '',
      email: (data.get('email') as string)?.trim() ?? '',
      phone: (data.get('phone') as string)?.trim() ?? '',
      project_type: (data.get('type') as string)?.trim() ?? '',
      message: (data.get('message') as string)?.trim() ?? '',
    };

    // Basic frontend validation
    if (!formData.full_name || !formData.email || !formData.phone || !formData.project_type || !formData.message) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      trackContactFormSubmission({
        name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      const { data: responseData, error } = await supabase.functions.invoke('send-enquiry-email', {
        body: formData,
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to send enquiry");
      }

      if (responseData?.error) {
        throw new Error(responseData.error);
      }

      // Success
      setSent(true);
      formRef.current?.reset();
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneClick = (phoneNumber: string) => {
    trackCallButtonClick(phoneNumber);
  };

  return (
    <>
      <section id="contact" className="relative py-28 lg:py-40 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>{contactData.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
                {contactData.heading.prefix}{" "}
                <em className="italic text-gradient-gold">{contactData.heading.emphasis}</em>
                {contactData.heading.suffix}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">{contactData.intro}</p>
            </Reveal>

            <div className="mt-12 space-y-8">
              {contactData.infos.map((info, i) => {
                const Icon = iconMap[info.label as keyof typeof iconMap] ?? MapPin;
                const isPhone = info.label === "Telephone";
                return (
                  <Reveal key={`${info.label}-${i}`} delay={0.2 + i * 0.1}>
                    <div className="flex items-start gap-5 group">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-border group-hover:border-gold group-hover:text-gold transition-colors">
                        <Icon size={18} strokeWidth={1.4} />
                      </div>
                      <div>
                        <div className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                          {info.label}
                        </div>
                        {isPhone ? (
                          Array.isArray(info.value) ? (
                            <div className="mt-1 flex flex-col gap-1">
                              {info.value.map((phone, idx) => (
                                <a
                                  key={idx}
                                  href={`tel:${phone.replace(/\s/g, "")}`}
                                  onClick={() => handlePhoneClick(phone)}
                                  className="text-charcoal hover:text-gold transition-colors block"
                                >
                                  {phone}
                                </a>
                              ))}
                            </div>
                          ) : (
                            <a
                              href={`tel:${(info.value as string).replace(/\s/g, "")}`}
                              onClick={() => handlePhoneClick(info.value as string)}
                              className="mt-1 block text-charcoal hover:text-gold transition-colors"
                            >
                              {info.value}
                            </a>
                          )
                        ) : (
                          <div className="mt-1 text-charcoal">{info.value}</div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {!fullWidthMap && (
              <Reveal delay={0.5}>
                <div className="mt-12 overflow-hidden border border-border" style={{ height: "280px" }}>
                  <iframe
                    title="Art Interiorz Studio Location"
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] tracking-luxury uppercase text-muted-foreground">
                  <MapPin size={11} className="text-gold" />
                  Manish Nagar, Somalwada, Nagpur · By appointment
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.2} className="lg:col-span-7">
            {sent ? (
              <div className="bg-warm-white p-8 md:p-12 shadow-luxury border border-border h-full flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mb-6">
                  <Mail className="text-gold" size={24} />
                </div>
                <h3 className="font-display text-3xl mb-4">Thank You</h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  Thank you. Your enquiry has been submitted successfully. Our team will contact you soon.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 text-xs tracking-luxury uppercase text-gold hover:text-charcoal transition-colors pb-1 border-b border-gold hover:border-charcoal"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <motion.form
                ref={formRef}
                onSubmit={handleFormSubmit}
                className="bg-warm-white p-8 md:p-12 shadow-luxury border border-border"
              >
                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-sm">
                    {errorMsg}
                  </div>
                )}
                
                {/* Honeypot field (hidden from users, stops bots) */}
                <input 
                  type="text" 
                  name="company_website" 
                  style={{ display: 'none' }} 
                  tabIndex={-1} 
                  autoComplete="off" 
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name", type: "text", name: "name" },
                    { label: "Email", type: "email", name: "email" },
                    { label: "Phone", type: "tel", name: "phone" },
                    { label: "Project Type", type: "text", name: "type" },
                  ].map((f) => (
                    <label key={f.name} className="block">
                      <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                        {f.label}
                      </span>
                      <input
                        type={f.type}
                        name={f.name}
                        required
                        disabled={isSubmitting}
                        className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors disabled:opacity-50"
                      />
                    </label>
                  ))}
                </div>
                <label className="block mt-8">
                  <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                    Tell us about your project
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    disabled={isSubmitting}
                    className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal resize-none transition-colors disabled:opacity-50"
                  />
                </label>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                  <p className="text-xs text-muted-foreground max-w-xs">
                    We respond to enquiries within two business days.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-9 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Enquiry"}
                    {!isSubmitting && <span className="h-px w-6 bg-warm-white group-hover:w-10 transition-all" />}
                  </button>
                </div>
              </motion.form>
            )}
          </Reveal>
        </div>
      </section>

      {fullWidthMap && (
        <section className="w-full bg-ivory border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-4">
            <Reveal>
              <div className="flex items-center gap-2 text-[10px] tracking-luxury uppercase text-muted-foreground">
                <MapPin size={11} className="text-gold" />
                Manish Nagar, Somalwada, Nagpur · By appointment
              </div>
            </Reveal>
          </div>
          <div className="w-full h-[min(52vh,480px)] min-h-[320px]">
            <iframe
              title="Art Interiorz Studio Location"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      )}
    </>
  );
}

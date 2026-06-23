import { useEffect } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { PriceEstimatorSection } from "@/components/site/PriceEstimatorSection";
import { Services } from "@/components/site/Services";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { HowItWorks } from "@/components/site/HowItWorks";
import { HappyClients } from "@/components/site/HappyClients";
import { Portfolio } from "@/components/site/Portfolio";
import { GoogleReviews } from "@/components/site/GoogleReviews";
import { Contact } from "@/components/site/Contact";

export default function HomePage() {
  useEffect(() => {
    document.title = "Art Interiorz — Best Interior Designer in Nagpur";
  }, []);

  return (
    <SiteShell>
      <Hero />
      <About />
      <Services />
      <PriceEstimatorSection />
      <WhyChooseUs />
      <HowItWorks />
      <HappyClients />
      {/* <Portfolio /> */}
      <GoogleReviews />
      <Contact fullWidthMap />
    </SiteShell>
  );
}

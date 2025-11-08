import { HeroSection } from "@/components/sections/hero-section";
import { MarketDashboard } from "@/components/sections/market-dashboard";
import { FeaturesSection } from "@/components/sections/product-features";
import { WorkflowSection } from "@/components/sections/workflow-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CallToAction } from "@/components/sections/cta-section";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <HeroSection />
      <FeaturesSection />
      <MarketDashboard />
      <WorkflowSection />
      <TestimonialsSection />
      <CallToAction />
    </div>
  );
}

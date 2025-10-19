import Heading from "../reusable-components/Heading";
import FeaturesGrid from "./FeaturesGrid";
const features = [
  { icon: "Truck", title: "Free shipping on orders over $50" },
  { icon: "Clock", title: "Available to you 24/7" },
  { icon: "ShieldCheck", title: "Extended Warranty Plans" },
  { icon: "RefreshCw", title: "Easy 30-Day Returns" },
];

export default function WhyUs() {
  return (
    <section className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="relative text-white py-16 container mx-auto px-4">
        <Heading className="text-3xl md:text-4xl font-bold mb-6">Why Us</Heading>
        <div className="border-t border-white/30 mb-12"></div>
        <FeaturesGrid features={features} />
      </div>
    </section>
  );
}

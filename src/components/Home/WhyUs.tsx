import Heading from "../reusable-components/Heading";
import FeaturesGrid from "./FeaturesGrid";

const features = [
  { icon: "BookOpen", title: "Wide Collection of Books from All Genres" },
  { icon: "Clock", title: "24/7 Access to Digital Library & Support" },
  { icon: "ShieldCheck", title: "Secure & Encrypted Payment System" },
  { icon: "RefreshCw", title: "Easy Return for Damaged or Wrong Books" },
];

export default function WhyUs() {
  return (
    <section className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="relative text-white py-16 container mx-auto px-4">
        <Heading className="text-3xl md:text-4xl font-bold mb-6">Why Choose Us?</Heading>
        <div className="border-t border-white/30 mb-12"></div>
        <FeaturesGrid features={features} />
      </div>
    </section>
  );
}

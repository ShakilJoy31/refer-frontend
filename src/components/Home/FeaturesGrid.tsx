"use client";

import { motion } from "framer-motion";
import { Truck, Clock, ShieldCheck, RefreshCw, BookOpen } from "lucide-react";
import Paragraph from "../reusable-components/Paragraph";

const iconMap = {
  BookOpen: <BookOpen className="w-8 h-8 text-white" />,
  Clock: <Clock className="w-8 h-8 text-white" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-white" />,
  RefreshCw: <RefreshCw className="w-8 h-8 text-white" />,
  Truck: <Truck className="w-8 h-8 text-white" />, // optional if you want delivery for books
};

export default function FeaturesGrid({ features }: { features: { icon: string; title: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-10 gap-4">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.002 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 8px 25px rgba(255,255,255,0.15)",
          }}
          className="flex items-start gap-4 p-6 rounded-xl transition hover:cursor-pointer"
        >
          <div className="flex-shrink-0">{iconMap[feature.icon]}</div>
          <Paragraph className="text-sm md:text-base leading-relaxed font-medium">
            {feature.title}
          </Paragraph>
        </motion.div>
      ))}
    </div>
  );
}

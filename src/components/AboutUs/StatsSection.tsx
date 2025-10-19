"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 89, suffix: "k+", label: "Organic Products" },
  { value: 80, suffix: "k+", label: "Metric to supplied" },
  { value: 40, suffix: "k+", label: "Experienced Farmer" },
  { value: 25, suffix: "k+", label: "Organic Awards" },
];

// Custom hook for count-up animation
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 26);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

// Component for individual stat item
function StatItemComponent({ stat, index }: { stat: StatItem; index: number }) {
  const count = useCountUp(stat.value, 2000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <Heading className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {count}
        {stat.suffix}
      </Heading>
      <Paragraph className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-500">
        {stat.label}
      </Paragraph>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <StatItemComponent key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
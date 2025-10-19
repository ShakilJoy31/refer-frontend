"use client";

import { motion } from "framer-motion";
import React from "react";

interface MotionWrapperProps {
  children: React.ReactNode; 
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
}

// Define proper TypeScript types for the variants
type DirectionVariants = {
  hidden: { opacity: number; x?: number; y?: number };
  visible: { opacity: number; x?: number; y?: number };
};

type VariantsMap = {
  [key in MotionWrapperProps["direction"]]: DirectionVariants;
};

export default function MotionWrapper({
  children,
  direction = "up",
  delay = 0,
}: MotionWrapperProps) {
  const variants: VariantsMap = {
    left: { 
      hidden: { opacity: 0, x: -50 }, 
      visible: { opacity: 1, x: 0 } 
    },
    right: { 
      hidden: { opacity: 0, x: 50 }, 
      visible: { opacity: 1, x: 0 } 
    },
    up: { 
      hidden: { opacity: 0, y: 50 }, 
      visible: { opacity: 1, y: 0 } 
    },
    down: { 
      hidden: { opacity: 0, y: -50 }, 
      visible: { opacity: 1, y: 0 } 
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      variants={variants[direction]}
    >
      {children}
    </motion.div>
  );
}
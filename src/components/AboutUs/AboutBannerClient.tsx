// components/Home/AboutBannerClient.tsx (Client)
"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AboutBannerClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="relative z-10 text-center text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

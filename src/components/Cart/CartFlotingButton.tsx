"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/hooks/CartContext";
import Button from "../reusable-components/Button";
import { useRouter } from "next/navigation";

export default function CartFlotingButton() {
  const { totalItems, lastAddedAt } = useCart();
  const [showDot, setShowDot] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (lastAddedAt) {
      setShowDot(true);
    }
  }, [lastAddedAt]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${totalItems === 0 ? "hidden" : ""}`}>
      {/* Button */}
      <Button
        onClick={() => router.push("/cart")}
        className="relative hover:cursor-pointer bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105"
        aria-label="Cart"
      >
        <FaShoppingCart className="text-2xl md:text-3xl lg:text-4xl " />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            {totalItems}
          </span>
        )}

        {/* Flying dot when item added */}
        <AnimatePresence>
          {showDot && (
            <motion.span
              className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow"
              initial={{ opacity: 0.9, scale: 0.8, x: -40, y: -40 }}
              animate={{ opacity: 1, scale: 1.6, x: 0, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => setShowDot(false)}
            />
          )}
        </AnimatePresence>
      </Button>

    </div>
  );
}

// components/product/PriceSection.tsx
import { motion } from "framer-motion";
import Paragraph from "../reusable-components/Paragraph";

interface PriceSectionProps {
  price: number;
  originalPrice?: number;
}

export default function PriceSection({ price, originalPrice }: PriceSectionProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${price.toFixed(2)}
        </span>
        
        {originalPrice && originalPrice > price && (
          <>
            <span className="text-xl text-gray-500 line-through dark:text-gray-400">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded dark:bg-red-900/30 dark:text-red-300">
              {discount}% OFF
            </span>
          </>
        )}
      </div>
      
      {originalPrice && originalPrice > price && (
        <Paragraph className="text-sm text-green-600 dark:text-green-400">
          You save ${(originalPrice - price).toFixed(2)}
        </Paragraph>
      )}
    </motion.div>
  );
}
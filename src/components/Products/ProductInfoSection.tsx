// components/product/ProductDetails.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product/productCardTypes";
import PriceSection from "./PriceSection";
import DeliveryOptions from "./DeliveryOptions";
import { ShoppingCart, Share2 } from "lucide-react";
import Button from "../reusable-components/Button";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";

interface ProductInfoSectionProps {
  product: Product;
}

export default function ProductInfoSection({ product }: ProductInfoSectionProps) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-6"
    >
      {/* Product Title */}
      <Heading className="text-3xl font-bold text-gray-900 dark:text-white">
        {product.name}
      </Heading>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < 4 ? "fill-current" : "stroke-current fill-none"}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.349 2.005 10.651 2.005 10.951 2.927L12.064 6.366C12.198 6.78 12.582 7.063 13.017 7.063H16.607C17.57 7.063 17.97 8.276 17.19 8.866L14.312 11.099C13.962 11.364 13.816 11.821 13.95 12.235L15.063 15.674C15.363 16.595 14.32 17.353 13.54 16.762L10.662 14.529C10.312 14.264 9.688 14.264 9.338 14.529L6.46 16.762C5.68 17.353 4.637 16.595 4.937 15.674L6.05 12.235C6.184 11.821 6.038 11.364 5.688 11.099L2.81 8.866C2.03 8.276 2.43 7.063 3.393 7.063H6.983C7.418 7.063 7.802 6.78 7.936 6.366L9.049 2.927Z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          (42 reviews)
        </span>
      </div>

      {/* Price */}
      <PriceSection
        price={product.price}
        originalPrice={product.originalPrice}
      />

      {/* Description */}
      <Paragraph className="text-gray-700 dark:text-gray-300">
        {product.description || "Premium quality product with excellent features and durability. Designed for comfort and performance."}
      </Paragraph>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-gray-900 dark:text-white font-medium">Quantity:</span>
        <div className="flex items-center border rounded-md dark:border-gray-700">
          <Button
            onClick={decrementQuantity}
            className="w-8 flex justify-center py-2 text-gray-600 dark:text-gray-400 hover:bg-cyan-100 rounded-tr rounded-br dark:hover:bg-gray-800 hover:cursor-pointer "
          >
            -
          </Button>
          <span className="px-4 py-2 text-gray-900 dark:text-white border-r border-l">{quantity}</span>
          <Button
            onClick={incrementQuantity}
            className="w-8 flex justify-center py-2 text-gray-600 dark:text-gray-400 hover:bg-cyan-100 rounded-tl rounded-bl dark:hover:bg-gray-800 hover:cursor-pointer "
          >
            +
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-gradient-to-r hover:cursor-pointer from-cyan-600 to-blue-700 text-white rounded-md transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </Button>

        <Button
          as="button"
          onClick={handleWishlist}
          className="p-2 rounded-xl hover:cursor-pointer text-xs font-normal text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isWishlisted ? (
              <motion.div
                key="filled"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaHeart size={25} />
              </motion.div>
            ) : (
              <motion.div
                key="outlined"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaRegHeart size={25} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 py-3 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Share2 size={25} />
        </Button>
      </div>

      {/* Delivery Options */}
      <DeliveryOptions />
    </motion.div>
  );
}
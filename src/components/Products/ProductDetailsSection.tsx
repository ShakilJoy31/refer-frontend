// components/product/ProductDetailsSection.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product/productCardTypes";
import PriceSection from "./PriceSection";
import DeliveryOptions from "./DeliveryOptions";
import { ShoppingCart, Share2, Star } from "lucide-react";
import Button from "../reusable-components/Button";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";

interface ProductDetailsSectionProps {
    product: Product;
}

export default function ProductDetailsSection({ product }: ProductDetailsSectionProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    const handleAddToCart = () => {
        addToCart(product, 1);
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
            className="space-y-4"
        >
            {/* Product Title */}
            <Heading className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.name}
            </Heading>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <div className="flex text-cyan-400">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < 4 ? "fill-current" : "stroke-current fill-none"}`}
                            size={18}
                        />
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
                {product.description.slice(0, 320) || "Premium quality product with excellent features and durability. Designed for comfort and performance."}
            </Paragraph>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
                <span className="text-gray-900 dark:text-white font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md dark:border-gray-700 ">
                    <Button
                        onClick={decrementQuantity}
                        className="w-16 md:w-8 flex justify-center py-2 text-gray-600 dark:text-gray-400 hover:bg-cyan-100 rounded-tr rounded-br dark:hover:bg-gray-800 hover:cursor-pointer "
                    >
                        -
                    </Button>
                    <span className="px-4 py-2 text-gray-900 dark:text-white border-r border-l">{quantity}</span>
                    <Button
                        onClick={incrementQuantity}
                        className="w-16 md:w-8 flex justify-center py-2 text-gray-600 dark:text-gray-400 hover:bg-cyan-100 rounded-tl rounded-bl dark:hover:bg-gray-800 hover:cursor-pointer "
                    >
                        +
                    </Button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
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
                    className="flex items-center justify-center gap-2 py-3 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Share2 size={25} />
                </Button>
            </div>

            {/* Delivery Options */}
            <DeliveryOptions />
        </motion.div>
    );
}
"use client";

import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import { ProductCardProps } from "@/types/product/productCardTypes";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import Button from "../reusable-components/Button";
import { useRouter } from "next/navigation";
import { FaCartArrowDown } from "react-icons/fa";


const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
  imageHeight = "h-36 md:h-44 lg:h-54",
  showCategory = true,
  showRating = true,
  showActions = true,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <CardContainer className={`inter-var ${className}`}>
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-cyan-500 border-cyan-300 w-full h-auto rounded-xl p-1 md:p-2 lg:p-3 xl:p-4 border transition-all duration-300">
        {/* Badges */}
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          {product.isSale && discountPercentage > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-xl ">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Category */}
        {showCategory && product.category && (
          <CardItem
            className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1 ">
            {product.category}
          </CardItem>
        )}

        {/* Product Image */}
        <CardItem className="w-full mt-8 relative">
          <div onClick={() => router.push(`/products/product-details/${product.slug}`)} className={`relative hover:cursor-pointer w-full ${imageHeight} overflow-hidden rounded-xl px-1 py-4 `}>
            <Image
              src={product.imageUrl[0]}
              alt={product.name}
              fill
              className="object-cover group-hover/card:shadow-xl transition-all duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardItem>

        {/* Product Name */}
        <CardItem onClick={() => router.push(`/products/product-details/${product.slug}`)}
          className="text-lg font-bold text-neutral-700 hover:cursor-pointer dark:text-white mt-4 line-clamp-1">
          {product.name}
        </CardItem>

        {/* Product Description */}
        <CardItem onClick={() => router.push(`/products/product-details/${product.slug}`)}
          as="p"
          className="text-neutral-500 hover:cursor-pointer text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2">
          {product.description}
        </CardItem>

        {/* Rating */}
        {showRating && product.rating && (
          <CardItem className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating!)
                    ? "text-yellow-400"
                    : "text-gray-300"
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                ({product.reviewCount || 0})
              </span>
            </div>
          </CardItem>
        )}

        {/* Price */}
        <CardItem className="flex items-center mt-3">
          <span className="text-xl font-bold text-neutral-700 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </CardItem>

        {/* Actions */}
        {showActions && (
          <div className="flex justify-between items-center mt-2 md:mt-4 lg:mt-6">
            <Button
              as="button"
              onClick={() => router.push(`/products/product-details/${product.slug}`)}
              className="px-4 py-2 hover:cursor-pointer rounded-xl text-xs font-normal dark:text-white text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              Quick View
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
              as="button"
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-xl hover:cursor-pointer bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-xs font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              <span className="hidden md:block ">Add to Cart</span>
              <span  className="block md:hidden "><FaCartArrowDown size={20}></FaCartArrowDown></span>
            </Button>
          </div>
        )}
      </CardBody>
    </CardContainer>
  );
};

export default ProductCard;
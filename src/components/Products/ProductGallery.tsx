"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { Product } from "@/types/product/productCardTypes";
import productImage from "../../../public/product2.jpg";
import Button from "../reusable-components/Button";
import productImage2 from "../../../public/380.jpg";
import Image from "next/image";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showZoomOptions, setShowZoomOptions] = useState(false);
  const [currentZoomScale, setCurrentZoomScale] = useState(2);

  const images: string[] = Array.isArray(product.imageUrl) && product.imageUrl.length > 0
    ? product.imageUrl
    : [productImage.src, productImage2.src];

  const zoomOptions = [1, 1.5, 2.0, 3.0, 4.0];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const handleZoomOptionClick = (scale: number) => {
    setCurrentZoomScale(scale);
    setShowZoomOptions(false);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container with Hover Zoom */}
      <div
        className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsZoomed(true)}
      >
        {/* This div now has relative positioning for the fill image */}
        <div
          className="relative w-full h-full cursor-zoom-in transform-gpu transition-transform duration-100"
          style={{
            transform: isHovered ? `scale(${currentZoomScale})` : "scale(1)",
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          }}
        >
          <Image
            src={images[selectedImageIndex]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority // Add priority to the main product image
          />
        </div>

        {/* Navigation Arrows */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute hover:cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute hover:cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Zoom Indicator with Options */}
        <div className="absolute bottom-2 right-2">
          {showZoomOptions ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-col-reverse items-end space-y-2"
            >
              {zoomOptions.map((scale) => (
                <Button
                  key={scale}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOptionClick(scale);
                  }}
                  className={`flex hover:cursor-pointer items-center justify-center w-10 h-10 rounded-full shadow-md transition-colors text-xs font-semibold
                    ${currentZoomScale === scale ? "bg-cyan-600 text-white dark:bg-blue-400" : "bg-white/80 text-gray-800 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700 dark:text-gray-200"}`}
                  aria-label={`Set zoom to ${scale}x`}
                >
                  {scale.toFixed(1)}x
                </Button>
              ))}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowZoomOptions(false);
                }}
                className="bg-white/80 hover:cursor-pointer mb-2 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors w-10 h-10"
                aria-label="Close zoom options"
              >
                <X className="w-6 h-6" />
              </Button>
            </motion.div>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setShowZoomOptions(true);
              }}
              className="bg-white/80 hover:cursor-pointer dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Show zoom options"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation - No priority needed for thumbnails */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((image, index) => (
          <Button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`aspect-square overflow-hidden rounded-md border-2 ${
              selectedImageIndex === index
                ? "border-cyan-600 border-2 dark:border-cyan-200"
                : "border-transparent"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`${product.name} view ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                className="object-cover cursor-pointer"
              />
            </div>
          </Button>
        ))}
      </div>

      {/* Zoom Modal - No priority needed for modal images */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-4xl max-h-[80vh]"
            >
              <Image
                src={images[selectedImageIndex]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
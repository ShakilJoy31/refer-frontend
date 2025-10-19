// components/Home/CategorySection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaHeart, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "../reusable-components/Button";
import { Product } from "@/types/product/productCardTypes";
import { getProductsByCategory } from "@/utils/helper/dataFetcher";
import DataLoader from "../reusable-components/DataLoader";
import { Star } from "lucide-react";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";

interface Category {
  name: string;
}

interface CategorySectionProps {
  categories: Category[];
  categoryProducts: Product[];
  defaultCategory: string;
}

export default function CategorySection({
  categories,
  categoryProducts,
  defaultCategory
}: CategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Get category from URL or use default
  const urlCategory = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(urlCategory || defaultCategory);
  const [products, setProducts] = useState<Product[]>(categoryProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    categoryProducts.length > 0 ? categoryProducts[0] : null
  );
  const [loading, setLoading] = useState(false);

  // Update URL when category changes
  const updateCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    router.replace(`/?${params.toString()}`, { scroll: false });
    setActiveCategory(category);
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const categoryProducts = await getProductsByCategory(activeCategory);
        setProducts(categoryProducts);
        if (categoryProducts.length > 0) {
          setSelectedProduct(categoryProducts[0]);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="flex justify-center my-6"><DataLoader></DataLoader></div>
    );
  }

  const handleWishlist = (selectProduct: Product) => {
    if (isInWishlist(selectProduct.id)) {
      removeFromWishlist(selectProduct.id);
    } else {
      addToWishlist(selectProduct);
    }
  };

  const handleAddToCart = (cartProduct: Product) => {
    addToCart(cartProduct, 1);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-6">
        <Heading className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Browse Products by Category
        </Heading>
        <Paragraph className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover our premium collection of products across various categories
        </Paragraph>
      </div>

      <div className="relative mb-6">
        <div className="relative">
          <div
            id="category-tabs"
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 bg-cyan-100 rounded-full w-max max-w-full mx-auto"
          >
            {categories.map((cat) => (
              <Button
                key={cat.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateCategory(cat.name);

                  const container = scrollContainerRef.current;
                  if (!container) return;

                  const button = e.currentTarget as HTMLElement;
                  const buttonRect = button.getBoundingClientRect();
                  const containerRect = container.getBoundingClientRect();

                  const isFullyVisible =
                    buttonRect.left >= containerRect.left &&
                    buttonRect.right <= containerRect.right;

                  if (!isFullyVisible) {
                    const scrollLeft =
                      button.offsetLeft -
                      container.clientWidth / 2 +
                      button.clientWidth / 2;

                    container.scrollTo({
                      left: scrollLeft,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`flex-shrink-0 hover:cursor-pointer px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === cat.name
                    ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg"
                    : "text-gray-700 "
                  }`}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Main Featured Product */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative group h-full"
        >
          {selectedProduct && (
            <>
              <div onClick={() => router.push(`/products/product-details/${selectedProduct.slug}`)} className="relative hover:cursor-pointer overflow-hidden rounded-2xl shadow-2xl h-full">
                <div className="h-full">
                  <Image
                    src={selectedProduct.imageUrl[0] || "/placeholder.jpg"}
                    alt={selectedProduct.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ height: '100%', minHeight: '500px' }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Product Badge */}
                {selectedProduct.isNew && (
                  <div className="absolute top-4 left-4 bg-white text-cyan-600 px-3 py-1 rounded-full text-sm font-semibold">
                    New Arrival
                  </div>
                )}
                {selectedProduct.isSale && (
                  <div className="absolute top-4 right-4 bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </div>
                )}

                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Heading className="text-xl font-bold mb-2">{selectedProduct.name}</Heading>
                  <div className="flex items-center">
                    <div className="flex text-cyan-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'stroke-current'}`}
                          size={18}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">({selectedProduct.reviewCount})</span>
                  </div>
                  <div className="grid md:flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">${selectedProduct.price}</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-lg line-through text-gray-300">
                          ${selectedProduct.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2 mt-4 md:mt-0 ">
                      <Button onClick={() => handleAddToCart(selectedProduct)} className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:cursor-pointer hover:bg-gray-100 w-full md:w-auto px-4 py-2 rounded-lg font-semibold transition-colors">
                        <FaShoppingCart className="inline mr-2" />
                        Add to Cart
                      </Button>

                      <Button
                        as="button"
                        onClick={() => handleWishlist(selectedProduct)}
                        className="p-2 rounded-xl hover:cursor-pointer text-xs font-normal text-red-500 transition-colors"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {isInWishlist(selectedProduct.id) ? (
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
                    </div>

                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 h-full"
        >
          {products.slice(0, 6).map((product, index) => {
            let clickTimeout: NodeJS.Timeout | null = null;

            const handleClick = () => {
              if (clickTimeout) {
                // Double click detected - navigate to product details
                clearTimeout(clickTimeout);
                clickTimeout = null;
                router.push(`/products/product-details/${product.slug}`);
              } else {
                // First click - set timeout for potential double click
                clickTimeout = setTimeout(() => {
                  // Single click action - select the product
                  setSelectedProduct(product);
                  clickTimeout = null;
                }, 300); // 300ms delay to detect double click
              }
            };

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full ${selectedProduct?.id === product.id ? 'ring-2 ring-cyan-500' : ''
                  }`}
                onClick={handleClick}
              >
                <div className="relative h-full flex flex-col">
                  <div className="relative flex-1">
                    <Image
                      src={product.imageUrl[0] || "/placeholder.jpg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-500 "
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Product Badges */}
                    <div className="absolute top-2 left-2">
                      {product.isNew && (
                        <span className="bg-white text-cyan-600 px-2 py-1 rounded text-xs font-semibold">
                          New
                        </span>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      {product.isSale && (
                        <span className="bg-cyan-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <Button onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }} className="bg-white px-2.5 rounded-full shadow-md hover:cursor-pointer transition-colors">
                        <FaShoppingCart size={18} className="text-cyan-600" />
                      </Button>

                      <Button
                        as="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlist(product);
                        }}
                        className="p-2 rounded-xl hover:cursor-pointer text-xs font-normal text-red-500 transition-colors hover:bg-none"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {isInWishlist(product.id) ? (
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
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800">
                    <Heading className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1 text-lg ">
                      {product.name}
                    </Heading>
                    <div className="flex items-center mb-2">
                      <div className="flex text-cyan-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current'}`}
                            size={18}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600 dark:text-gray-300">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900 dark:text-white">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm line-through text-gray-500">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:cursor-pointer text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          View All Products
        </Button>
      </div>
    </section>
  );
}
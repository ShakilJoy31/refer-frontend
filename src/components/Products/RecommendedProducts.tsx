// components/product/RecommendedProducts.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../ui/ProductCard";
import { Product } from "@/types/product/productCardTypes";
import { getRecommendedProducts } from "@/utils/helper/dataFetcher";
import Heading from "../reusable-components/Heading";

interface RecommendedProductsProps {
    currentProductId: string;
    initialProducts?: Product[];
}

export default function RecommendedProducts({
    currentProductId,
    initialProducts = []
}: RecommendedProductsProps) {
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState(!initialProducts.length);

    useEffect(() => {
        // Only fetch if we don't have initial data
        if (initialProducts.length === 0) {
            const fetchRecommendedProducts = async () => {
                try {
                    setLoading(true);
                    const products = await getRecommendedProducts(currentProductId, 4);
                    setRecommendedProducts(products);
                } catch (error) {
                    console.error("Error fetching recommended products:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchRecommendedProducts();
        }
    }, [currentProductId, initialProducts.length]);

    if (loading) {
        return (
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    You might also like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-md"></div>
                            <div className="mt-2 bg-gray-200 dark:bg-gray-700 h-4 rounded"></div>
                            <div className="mt-2 bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (recommendedProducts.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <Heading
                    level={2}
                    className="text-xl font-bold text-gray-900 dark:text-white mb-6"
                >
                    You might also like
                </Heading>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {recommendedProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}>
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
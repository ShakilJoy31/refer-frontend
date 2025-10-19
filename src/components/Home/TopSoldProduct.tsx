import React from "react";
import ProductCard from "@/components/ui/ProductCard";
import Heading from "../reusable-components/Heading";
import { Product } from "@/types/product/productCardTypes";

interface TopSoldProductsProps {
  products: Product[];
}

const TopSoldProducts: React.FC<TopSoldProductsProps> = ({ products }) => {
  // Example: sort by reviewCount (or rating), then take top 8
  const topSoldProducts = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);

  return (
    <section className="container mx-auto px-4 py-8">
      <Heading className="text-3xl font-bold text-center mb-8">Our Top Sold Products</Heading>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {topSoldProducts.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            className="hover:scale-105 transition-transform"
            
            showCategory={true}
            showRating={true}
            showActions={true}
          />
        ))}
      </div>
    </section>
  );
};

export default TopSoldProducts;

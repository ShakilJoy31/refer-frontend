// components/Home/NewProduct.tsx
import React from "react";
import ProductCard from "@/components/ui/ProductCard";
import Heading from "../reusable-components/Heading";
import { Product } from "@/types/product/productCardTypes";

interface NewProductsProps {
  products: Product[];
}

const NewProducts: React.FC<NewProductsProps> = ({ products }) => {
  const newProducts = products.filter(product => product.isNew);
  return (
    <section className="container mx-auto px-4 py-8">
      <Heading className="text-3xl font-bold text-center mb-8">New Products</Heading>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {newProducts.map((product, index) => (
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

export default NewProducts;
// utils/helper/dataFetcher.ts
import { Product } from "@/types/product/productCardTypes";
import { baseUrl } from "../constant/appConfiguration";

export async function getProductsData() {
  try {
    // In production
    const response = await fetch(`${baseUrl}/products.json`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to empty array
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  const products = await getProductsData();
  return products.find((product: Product) => product.slug === slug);
}

export async function getRecommendedProducts(currentProductId: string, count: number = 4) {
  const products = await getProductsData();
  
  // Filter out the current product and get random products
  return products
    .filter((product: Product) => product.id !== currentProductId)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

export async function getProductsByCategory(category: string) {
  const products = await getProductsData();
  return products.filter((product: Product) => product.category === category);
}

export async function getAllCategories() {
  const products = await getProductsData();
  // Get unique categories from products
  const categories = [...new Set(products.map((product: Product) => product.category))];
  return categories.map(category => ({ name: category }));
}
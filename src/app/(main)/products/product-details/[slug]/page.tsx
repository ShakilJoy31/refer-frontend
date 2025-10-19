import ProductDetail from "@/components/Products/ProductDetails";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import { Product } from "@/types/product/productCardTypes";
import { getProductBySlug, getProductsData, getRecommendedProducts } from "@/utils/helper/dataFetcher";

// 1. Define a specific type for the page props
interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 2. Apply the interface to the generateMetadata function
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params; // ✅ await here
  const product = await getProductBySlug(slug);

  return generateDynamicMetadata({
    title: `${product.name} | Premium Online Store`,
    description: product.description.substring(0, 160),
    keywords: [...product.tags, product.category, "buy online", "premium quality"],
  });
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = await getProductsData();
  return products.map((product: Product) => ({
    slug: product.slug,
  }));
}

// 3. Apply the same interface to the page component
const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params; // ✅ await here
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Fetch recommended products on the server
  const recommendedProducts = await getRecommendedProducts(product.id, 8);

  return (
    <div className="bg-[#F4F6F8] dark:bg-gray-900 min-h-screen">
      <ProductDetail product={product} recommendedProducts={recommendedProducts} />
    </div>
  );
};

export default ProductPage;

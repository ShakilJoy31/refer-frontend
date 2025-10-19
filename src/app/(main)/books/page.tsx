import { ProductListing } from "@/components/Products/ProductListing";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import { getProductsData } from "@/utils/helper/dataFetcher";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Premium Online Store | Products",
    description: "Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, home goods and more. Free shipping on orders over $50. Secure checkout guaranteed.",
    keywords: [
      "online shopping", "ecommerce store", "buy products online",
      "electronics", "fashion", "home decor", "premium products",
      "discounts", "free shipping", "secure checkout", "best deals",
      "shopping", "online store", "quality products", "affordable prices"
    ],
  });
}

const ProductsPage = async () => {
  const products = await getProductsData();
  return (
    <div className="bg-[#F4F6F8] dark:bg-gray-600">
      <ProductListing products={products}></ProductListing>
    </div>
  )
}

export default ProductsPage;
// app/page.tsx
import HomeBanner from "@/components/Home/Banner";
import CategorySection from "@/components/Home/CategorySection";
import NewProduct from "@/components/Home/NewProduct";
import NewsletterSection from "@/components/Home/NewsletterSection";
import OfferProducts from "@/components/Home/OfferedProducts";
import TopSoldProducts from "@/components/Home/TopSoldProduct";
import WhyUs from "@/components/Home/WhyUs";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import { getAllCategories, getProductsByCategory, getProductsData } from "@/utils/helper/dataFetcher";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Premium Online Store | Home ",
    description: "Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, home goods and more. Free shipping on orders over $50. Secure checkout guaranteed.",
    keywords: [
      "online shopping", "ecommerce store", "buy products online",
      "electronics", "fashion", "home decor", "premium products",
      "discounts", "free shipping", "secure checkout", "best deals",
      "shopping", "online store", "quality products", "affordable prices"
    ],
  });
}

// Update the interface to reflect that searchParams is a Promise
interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  // Await the searchParams promise first
  const resolvedSearchParams = await searchParams;
  
  // Get category from URL params or use default
  const category = typeof resolvedSearchParams.category === 'string'
    ? resolvedSearchParams.category
    : "Electronics";

  // Fetch products data on the server
  const products = await getProductsData();

  // Fetch categories and products for the selected category
  const rawCategories = await getAllCategories();
  const categories = rawCategories.map((cat: { name: string }) => ({
    ...cat,
    name: typeof cat.name === "string" ? cat.name : String(cat.name),
  }));

  const categoryProducts = await getProductsByCategory(category);
  
  return (
    <div className="bg-[#F4F6F8] dark:bg-gray-600">
      <HomeBanner></HomeBanner>
      <NewProduct products={products}></NewProduct>
      <TopSoldProducts products={products} />
      <OfferProducts products={products} />
      <CategorySection
        categories={categories}
        categoryProducts={categoryProducts}
        defaultCategory={category}
      />
      <WhyUs></WhyUs>
      <NewsletterSection></NewsletterSection>
    </div>
  )
}

export default Home;

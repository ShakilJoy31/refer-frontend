import CartFlotingButton from "@/components/Cart/CartFlotingButton";
import Footer from "@/components/navigations/Footer";
import PublicNav from "@/components/navigations/PublicNav";
import WishlistFloatingButton from "@/components/Wishlist/WishlistFlotingButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNav />
      <div>{children}</div>
      <Footer></Footer>
      <CartFlotingButton />
      <WishlistFloatingButton />
    </>
  );
}
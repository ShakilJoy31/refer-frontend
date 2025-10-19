import "./globals.css";
import { ThemeProvider } from "../components/reusable-components/ThemeProvider";
import { appConfiguration } from "@/utils/constant/appConfiguration";
import Providers from "../hooks/Providers";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/hooks/CartContext";
import { WishlistProvider } from "@/hooks/WishlistContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



// export async function generateMetadata(): Promise<Metadata> {
//   // For the root layout, we want the default values, so we call without parameters
//   return generateDynamicMetadata();
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` antialiased`} suppressHydrationWarning={true}>
        <Providers>
          {" "}
          <ThemeProvider
            defaultTheme="light"
            storageKey={`${appConfiguration.appCode}theme`}>
            <CartProvider>
              <WishlistProvider>
                {children}
              </WishlistProvider>
            </CartProvider>
          </ThemeProvider>
          <Toaster />
        </Providers>
         <ToastContainer />
      </body>
    </html>
  );
}


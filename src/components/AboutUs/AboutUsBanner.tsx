// components/Home/AboutBanner.tsx (Server)
import Image from "next/image";
import React from "react";
import bannerImg from "../../../public/about-us-banner.jpg";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import AboutBannerClient from "./AboutBannerClient";

export default function AboutBanner() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <Image
        src={bannerImg}
        alt="About Orgado"
        fill
        className="object-cover brightness-50"
        priority
      />
      <AboutBannerClient>
        <Heading className="text-3xl md:text-5xl font-bold">
          About E-Commerce
        </Heading>
        <Paragraph className="mt-3 text-lg md:text-xl font-light">
          Discover amazing products at unbeatable prices. Shop the latest trends
          in electronics, fashion, home goods and more. Free shipping on orders
          over $50.
        </Paragraph>
      </AboutBannerClient>
    </section>
  );
}

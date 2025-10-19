import Image from "next/image";
import React from "react";

import img1 from "../../../public/about-img-3.webp";
import img2 from "../../../public/about-img-4.webp";
import img3 from "../../../public/about-img-5.webp";
import ceoImg from "../../../public/about-author.webp";
import authorSign from "../../../public/author-signature.webp";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import MotionWrapper from "../reusable-components/MotionWrapper";

export default function AboutSection() {
    return (
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Left Images */}
                <MotionWrapper direction="left" delay={0}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Image
                                src={img1}
                                alt="Farmers"
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <Image
                            src={img2}
                            alt="Strawberry Basket"
                            className="rounded-lg object-cover"
                        />
                        <Image
                            src={img2}
                            alt="Strawberry Basket"
                            className="rounded-lg object-cover"
                        />
                    </div>
                </MotionWrapper>

                {/* Right Content */}
                <MotionWrapper direction="right" delay={0.2}>
                    <span className="text-green-700 font-medium uppercase tracking-wide">
                        About Us
                    </span>
                    <Heading className="mt-2 text-3xl md:text-4xl font-bold leading-snug">
                        We believe in pure and organic quality
                    </Heading>

                    <div className="flex flex-col md:flex-row md:items-start gap-6 mt-6">
                        <Image
                            src={img3}
                            alt="Fresh Vegetables"
                            className="rounded-lg object-cover w-full md:w-auto"
                        />
                        <div>
                            <Paragraph className="mt-4 text-gray-700 leading-relaxed dark:text-gray-300">
                                We had reached a great height in the atmosphere, for the sky was
                                a dead black, and the stars had ceased to twinkle. By the same
                                illusion which lifts the horizon of the sea to the level. Always
                                be able to find the phone that you are looking for in our offer,
                                have made us stand out in the market, but they are simply
                                symptoms of our dedication to what we are doing and our desire
                                to constantly.
                            </Paragraph>

                            {/* CEO Section */}
                            <div className="mt-6 flex items-center gap-4">
                                <Image
                                    src={ceoImg}
                                    alt="CEO"
                                    width={60}
                                    height={60}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <Heading className="font-semibold text-lg">Noyaviram</Heading>
                                    <Paragraph className="text-sm text-gray-500">
                                        Founder & CEO, Orgado
                                    </Paragraph>
                                    <Image
                                        src={authorSign}
                                        alt="CEO signature"
                                        width={60}
                                        height={60}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </MotionWrapper>
            </div>
        </section>
    );
}

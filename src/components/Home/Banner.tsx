"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import backgroundImage from "../../../public/home-banner (1).jpg";
import backgroundImage2 from "../../../public/home-banner (2).jpg";
import backgroundImage3 from "../../../public/home-banner (5).jpg";
import backgroundImage4 from "../../../public/home-banner (4).jpg";

// Updated Banner data for Books
const bannerSlides = [
  {
    id: 1,
    image: backgroundImage.src,
    title: "Discover Your Next Favorite Book Today",
    description: "Explore a vast library of genres and titles curated for book lovers like you. Whether you're into thrillers or romance, we've got your next read.",
    buttonText: "BROWSE BOOKS ↓",
    overlay: "bg-black/60"
  },
  {
    id: 2,
    image: backgroundImage2.src,
    title: "Read Anywhere, Anytime on Any Device",
    description: "Enjoy seamless reading across mobile, tablet, and desktop. Your library is always with you, whether you're offline or online.",
    buttonText: "START READING →",
    overlay: "bg-blue-900/50"
  },
  {
    id: 3,
    image: backgroundImage3.src,
    title: "Fast Delivery & Instant Downloads",
    description: "Order physical copies or download eBooks instantly. Get your favorite books delivered to your doorstep or device in no time.",
    buttonText: "SHOP NOW →",
    overlay: "bg-purple-900/50"
  },
  {
    id: 4,
    image: backgroundImage4.src,
    title: "Personalized Book Recommendations Powered by AI",
    description: "Let our smart engine suggest your next read based on your preferences, reading history, and ratings.",
    buttonText: "FIND YOUR BOOK →",
    overlay: "bg-green-900/50"
  }
];

const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function HomeBanner() {
  return (
    <section className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1200}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop={true}
        className="h-full w-full"
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={`Banner ${slide.id}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={90}
                />
                {/* Dynamic Overlay */}
                <div className={`absolute inset-0 ${slide.overlay}`}></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight md:leading-snug lg:leading-tight mb-4 md:mb-6"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="text-white/90 text-base sm:text-lg md:text-xl lg:text-xl max-w-3xl mx-auto leading-relaxed md:leading-loose mb-6 md:mb-8 px-4"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.button
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                    className="mt-4 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-2xl relative overflow-hidden transition-all duration-500 group hover:scale-105 hover:shadow-2xl cursor-pointer"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-in-out"></span>
                    <span className="relative z-10 group-hover:text-white text-sm sm:text-base md:text-lg">
                      {slide.buttonText}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-next !text-white !w-12 !h-12 !right-4 sm:!right-6 lg:!right-8 after:!text-2xl hover:!scale-110 !transition-transform !duration-300"></div>
        <div className="swiper-button-prev !text-white !w-12 !h-12 !left-4 sm:!left-6 lg:!left-8 after:!text-2xl hover:!scale-110 !transition-transform !duration-300"></div>

        {/* Progress Bar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-24 h-1 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full swiper-progress-bar animate-progress"></div>
        </div>
      </Swiper>

      {/* Custom CSS for progress bar animation */}
      <style jsx global>{`
        .swiper-progress-bar {
          width: 100%;
          transform: scaleX(0);
          transform-origin: left;
          animation: progress 6s linear infinite;
        }

        @keyframes progress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .swiper-pagination {
          bottom: 8px !important;
        }

        .swiper-pagination-bullet-active {
          background: white !important;
          transform: scale(1.2);
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

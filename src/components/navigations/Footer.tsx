import { FaTelegramPlane, FaWhatsapp, FaInstagram, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPayment } from "react-icons/md";
import Image from "next/image";
import siteLogo from "../../../public/demo_logo_footer.png";
import Paragraph from "../reusable-components/Paragraph";
import Heading from "../reusable-components/Heading";
import Link from "next/link";
import { footerSvg } from "@/utils/constant/footerWaveSvg";
import Button from "../reusable-components/Button";
import InputField from "../ui/input";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0f0c29] to-black text-gray-300 relative">
      {footerSvg}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-10 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Bookstore Info */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <Image
              src={siteLogo}
              alt="BookWorm Logo"
              width={160}
              height={60}
              className="w-72 h-28 object-contain"
            />
          </div>
          <Paragraph className="text-sm mb-4">
            Welcome to <b>BookVerse</b> — your gateway to new worlds, timeless classics, and inspiring stories. Explore, read, and let your imagination travel beyond reality.
          </Paragraph>

          <div className="flex items-start gap-2 mb-3">
            <MdLocationOn className="text-blue-400 text-lg mt-0.5 flex-shrink-0" />
            <Paragraph className="text-sm">
              221B Library Lane, Booktown, Literature City, 56001
            </Paragraph>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <FaPhoneAlt className="text-blue-400 text-lg flex-shrink-0" />
            <Paragraph className="text-sm">+1 (800) 987-BOOK</Paragraph>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <MdEmail className="text-blue-400 text-lg flex-shrink-0" />
            <Paragraph className="text-sm">support@bookverse.com</Paragraph>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            <Link href="#" className="bg-blue-600 hover:bg-blue-500 duration-200 text-white p-2 rounded-full text-sm">
              <FaFacebookF />
            </Link>
            <Link href="#" className="bg-blue-600 hover:bg-blue-500 duration-200 text-white p-2 rounded-full text-sm">
              <FaInstagram />
            </Link>
            <Link href="#" className="bg-blue-600 hover:bg-blue-500 duration-200 text-white p-2 rounded-full text-sm">
              <FaWhatsapp />
            </Link>
            <Link href="#" className="bg-blue-600 hover:bg-blue-500 duration-200 text-white p-2 rounded-full text-sm">
              <FaTelegramPlane />
            </Link>
          </div>
        </div>

        {/* Book Categories */}
        <div>
          <Heading className="font-bold mb-4 text-white text-lg">Book Categories</Heading>
          <ul className="space-y-2 text-sm">
            {[
              "Fiction & Literature",
              "Science & Technology",
              "Biographies & Memoirs",
              "Self-Help & Motivation",
              "Children's Books",
              "History & Culture",
              "Fantasy & Sci-Fi",
              "Academic & Study Materials"
            ].map((item, index) => (
              <li key={index} className="hover:text-blue-400 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        {/* Reader Support */}
        <div>
          <Heading className="font-bold mb-4 text-white text-lg">Reader Support</Heading>
          <ul className="space-y-2 text-sm">
            {[
              "Contact Us",
              "FAQs",
              "Delivery Information",
              "Return & Replacement",
              "Track Your Order",
              "Author Collaboration",
              "Gift Cards",
              "Membership Plans"
            ].map((item, index) => (
              <li key={index} className="hover:text-blue-400 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <Heading className="font-bold mb-4 text-white text-lg">Join Our Book Club</Heading>
          <Paragraph className="text-sm mb-4">
            Subscribe for book recommendations, new arrivals, author events & special offers.
          </Paragraph>
          <div className="flex flex-col gap-3">
            <InputField
              name="email"
              type="email"
              placeholder="Your Email"
              icon={<MdEmail className="h-5 w-5 text-gray-400" />}
              className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
            />
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:bg-blue-500 hover:cursor-pointer text-white py-2 rounded text-sm font-medium transition-colors">
              Subscribe
            </Button>
          </div>

          <div className="mt-6">
            <Heading className="font-bold mb-3 text-white text-sm">Payment Options</Heading>
            <div className="flex gap-2">
              <MdPayment className="text-2xl bg-white p-1 rounded" />
              <Paragraph className="bg-white p-1 rounded text-xs font-bold px-2 text-gray-800 ">VISA</Paragraph>
              <Paragraph className="bg-white p-1 rounded text-xs font-bold px-2 text-gray-800 ">MC</Paragraph>
              <Paragraph className="bg-white p-1 rounded text-xs font-bold px-2 text-gray-800 ">AMEX</Paragraph>
              <Paragraph className="bg-white p-1 rounded text-xs font-bold px-2 text-gray-800 ">PAYPAL</Paragraph>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-[1px] w-full bg-[#0099FF]"></div>
      <div className="container mx-auto mt-6 pb-4 flex flex-col md:flex-row justify-between items-center px-4">
        <Paragraph className="text-xs text-gray-500 mb-2 md:mb-0">
          © {new Date().getFullYear()} BookVerse. All Rights Reserved.
        </Paragraph>
        <div className="flex gap-4">
          <span className="cursor-pointer text-xs text-gray-500 hover:text-gray-300">Privacy Policy</span>
          <span className="text-gray-600">|</span>
          <span className="cursor-pointer text-xs text-gray-500 hover:text-gray-300">Terms & Conditions</span>
          <span className="text-gray-600">|</span>
          <span className="cursor-pointer text-xs text-gray-500 hover:text-gray-300">Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}

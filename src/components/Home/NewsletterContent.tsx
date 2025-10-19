"use client";

import { motion } from "framer-motion";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import Button from "../reusable-components/Button";
import { MdEmail } from "react-icons/md";
import InputField from "../ui/input";

export default function NewsletterContent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full container bg-[#3a3749]/90 text-white rounded-lg shadow-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10"
        >
            {/* Left side - Text */}
            <div>
                <Heading className="text-3xl md:text-4xl font-bold mb-4">
                    Unlock Exclusive Deals
                </Heading>
                <Paragraph className="text-base md:text-lg leading-relaxed">
                    Sign up for our newsletter and enjoy unmatched discounts, early
                    access to sales, and insider tips!
                </Paragraph>
            </div>

            {/* Right side - Form */}
            <form className="flex flex-col space-y-4">
                <Paragraph>Enter Your Email</Paragraph>
                <InputField
                    name="email"
                    type="email"
                    placeholder="Type Your Email"
                    icon={<MdEmail className="h-5 w-5 text-gray-400" />}
                    className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
                />

                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="subscribe" className="accent-cyan-500 w-5 h-5" />
                    <label htmlFor="subscribe" className="text-sm">
                        Yes, subscribe me to your newsletter.
                    </label>
                </div>

                <Button type="submit"
                    className="bg-white hover:cursor-pointer text-black font-semibold py-2 px-6 rounded-md transition">SUBMIT</Button>
            </form>
        </motion.div>
    );
}

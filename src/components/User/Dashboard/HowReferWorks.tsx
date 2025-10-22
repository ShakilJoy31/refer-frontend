"use client";

import React from "react";
import { motion } from "framer-motion";

import { FiCreditCard, FiShare2, FiUserPlus } from "react-icons/fi";
import Paragraph from "@/components/reusable-components/Paragraph";
import Heading from "@/components/reusable-components/Heading";



export default function HowReferWorksComponent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8"
        >
            <Heading className="text-2xl font-bold text-white mb-8 text-center">
                How The Referral Program Works
            </Heading>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl border border-purple-500/20"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <FiShare2 size={24} className="text-white" />
                    </div>
                    <Heading className="text-xl font-semibold text-white mb-3">Share Your Link</Heading>
                    <Paragraph className="text-white/70">
                        Share your unique referral link with friends, family, and on social media
                    </Paragraph>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-2xl border border-cyan-500/20"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <FiUserPlus size={24} className="text-white" />
                    </div>
                    <Heading className="text-xl font-semibold text-white mb-3">They Sign Up</Heading>
                    <Paragraph className="text-white/70">
                        Your friends sign up using your referral link and join the platform
                    </Paragraph>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl border border-green-500/20"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <FiCreditCard size={24} className="text-white" />
                    </div>
                    <Heading className="text-xl font-semibold text-white mb-3">Earn Together</Heading>
                    <Paragraph className="text-white/70">
                        Earn 2 credits when they complete their first purchase - they get 2 credits too!
                    </Paragraph>
                </motion.div>
            </div>
        </motion.div>
    );
}
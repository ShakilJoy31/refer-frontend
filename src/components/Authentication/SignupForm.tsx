"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock, FiGift } from "react-icons/fi";
import Button from "../reusable-components/Button";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import InputField from "../ui/input";
import Link from "next/link";
import { useRegisterMutation } from "@/redux/features/file/authenticationApi";
import { saveTokenToCookie } from "@/utils/helper/tokenHelper";
import { toastShowing } from "../reusable-components/toastShowing";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        referredBy: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        referredBy: ""
    });

    const [register, { data, isLoading, error }] = useRegisterMutation();

    console.log(data)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: "",
            email: "",
            password: "",
            referredBy: ""
        };

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return !newErrors.name && !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // Prepare data for API (exclude referredBy if empty)
            const apiData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                ...(formData.referredBy && { referredBy: formData.referredBy })
            };
            const result = await register(apiData).unwrap();
            if (result.status === 'success') {
                saveTokenToCookie(result?.data?.token);
                toastShowing('Success!', 'bottom-right', 2000, 'green', 'white');
            } else {
                toastShowing('OPPS! Failed to signup!', 'bottom-right', 2000, 'green', 'white');
            }

        } catch (err) {
            console.error("Registration failed:", err);
            // Error is already handled by RTK Query, but you can add additional handling
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-8">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                className="w-full max-w-xl relative z-10"
            >
                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                    {/* Gradient Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        >
                            <Heading className="text-3xl font-bold text-white mb-2">
                                Join Our Community
                            </Heading>
                            <Paragraph className="text-white/90 text-sm">
                                Create your account and start your referral journey
                            </Paragraph>
                        </motion.div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        {/* API Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-200 text-sm"
                            >
                                {"data" in error ? "Registration failed" : "Registration failed"}
                            </motion.div>
                        )}

                        <motion.form
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {/* Name Field */}
                            <motion.div>
                                <InputField
                                    label="Full Name"
                                    name="name"
                                    type="text"
                                    inputLabelClassName="text-white mb-1 text-sm font-medium dark:text-gray-300"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    icon={<FiUser className="h-5 w-5 text-purple-500" />}
                                    className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                />
                                {errors.name && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-400 text-xs mt-1"
                                    >
                                        {errors.name}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Email Field */}
                            <motion.div>
                                <InputField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    inputLabelClassName="text-white mb-1 text-sm font-medium dark:text-gray-300"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    icon={<FiMail className="h-5 w-5 text-purple-500" />}
                                    className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                />
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-400 text-xs mt-1"
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Password Field */}
                            <motion.div>
                                <div className="relative">
                                    <InputField
                                        label="Password"
                                        name="password"
                                        inputLabelClassName="text-white mb-1 text-sm font-medium dark:text-gray-300"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a strong password"
                                        icon={<FiLock className="h-5 w-5 text-purple-500" />}
                                        className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 -bottom-2 transform -translate-y-1/2 text-gray-400 hover:cursor-pointer transition-colors duration-200 p-1"
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={showPassword ? "hide" : "show"}
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                exit={{ scale: 0, rotate: 180 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {showPassword ? <FiEyeOff size={25} /> : <FiEye size={25} />}
                                            </motion.div>
                                        </AnimatePresence>
                                    </Button>
                                </div>
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-400 text-xs mt-1"
                                    >
                                        {errors.password}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Referred By Field */}
                            <motion.div>
                                <InputField
                                    label="Referred By (Optional)"
                                    name="referredBy"
                                    type="text"
                                    inputLabelClassName="text-white mb-1 text-sm font-medium dark:text-gray-300"
                                    value={formData.referredBy}
                                    onChange={handleChange}
                                    placeholder="Enter referral code"
                                    icon={<FiGift className="h-5 w-5 text-cyan-400" />}
                                    className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                                />
                                {errors.referredBy && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-400 text-xs mt-1"
                                    >
                                        {errors.referredBy}
                                    </motion.p>
                                )}
                                <Paragraph className="text-cyan-300 text-xs mt-2">
                                    Enter a referral code to get bonus rewards!
                                </Paragraph>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:shadow-xl"
                                >
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-center"
                                            >
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                                />
                                                Creating Account...
                                            </motion.div>
                                        ) : (
                                            <motion.span
                                                key="text"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                Create Account
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </motion.div>
                        </motion.form>

                        {/* Additional Links */}
                        <motion.div
                            className="mt-6 text-center"
                        >
                            <Paragraph className="text-white/70 text-sm">
                                Already have an account?{" "}
                                <Link
                                    href="/authentication/login"
                                    className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors duration-200 underline"
                                >
                                    Sign in here
                                </Link>
                            </Paragraph>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-purple-400 rounded-full blur-sm"
                    animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-400 rounded-full blur-sm"
                    animate={{
                        y: [0, 10, 0],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                />
            </motion.div>
        </section>
    );
}
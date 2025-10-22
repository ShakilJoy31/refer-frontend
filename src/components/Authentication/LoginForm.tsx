"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import Button from "../reusable-components/Button";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import InputField from "../ui/input";
import Link from "next/link";
import { useLoginMutation } from "@/redux/features/file/authenticationApi";
import { saveTokenToCookie } from "@/utils/helper/tokenHelper";
import { toastShowing } from "../reusable-components/toastShowing";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const [login, { isLoading, error }] = useLoginMutation();

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
            email: "",
            password: ""
        };

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
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const result = await login(formData).unwrap();
            if (result.status === 'success') {
                saveTokenToCookie(result?.data?.token);
                toastShowing('Success! Redirecting to home page.', 'bottom-right', 2000, 'green', 'white');
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            } else {
                toastShowing('OPPS! Failed to signup!', 'bottom-right', 2000, 'green', 'white');
            }
        } catch (err) {
            console.error("Login failed:", err);
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
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
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
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        >
                            <Heading className="text-3xl font-bold text-white mb-2">
                                Welcome Back
                            </Heading>
                            <Paragraph className="text-white/90 text-sm">
                                Sign in to your account to continue your journey
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
                                {"data" in error && typeof error.data === "object" && error.data !== null && "message" in error.data
                                    ? (error.data as { message?: string }).message
                                    : "Login failed"}
                            </motion.div>
                        )}

                        <motion.form
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
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
                                    icon={<FiMail className="h-5 w-5 text-cyan-500" />}
                                    className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
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
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        inputLabelClassName="text-white mb-1 text-sm font-medium dark:text-gray-300"
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        icon={<FiLock className="h-5 w-5 text-cyan-500" />}
                                        className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 -bottom-2 transform -translate-y-1/2 text-gray-400 hover:cursor-pointer transition-colors duration-200 p-1"
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={showPassword ? "hide" : "show"}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
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

                            {/* Submit Button */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='pt-4'
                            >
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:shadow-xl group"
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
                                                Signing In...
                                            </motion.div>
                                        ) : (
                                            <motion.span
                                                key="text"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-center"
                                            >
                                                Sign In
                                                <motion.span
                                                    className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                                                >
                                                    <FiArrowRight />
                                                </motion.span>
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </motion.div>
                        </motion.form>

                        {/* Sign Up Link */}
                        <motion.div
                            className="mt-8 text-center"
                        >
                            <Paragraph className="text-white/70 text-sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors duration-200 underline"
                                >
                                    Create one here
                                </Link>
                            </Paragraph>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full blur-sm"
                    animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full blur-sm"
                    animate={{
                        y: [0, 10, 0],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                />
            </motion.div>

            {/* Additional Background Animation */}
            <motion.div
                className="absolute bottom-10 left-10 w-4 h-4 bg-white/30 rounded-full"
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
            <motion.div
                className="absolute top-10 right-10 w-3 h-3 bg-cyan-300/40 rounded-full"
                animate={{
                    y: [0, 15, 0],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
        </section>
    );
}
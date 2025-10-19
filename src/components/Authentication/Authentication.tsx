"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../reusable-components/Button";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import { MdEmail } from "react-icons/md";
import InputField from "../ui/input";
import { RiLockPasswordFill } from "react-icons/ri";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const toggleMode = () => setIsLogin((prev) => !prev);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-cyan-600 to-blue-700 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-black p-8 shadow-lg">
                {/* Title */}
                <Heading className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
                    {isLogin ? "Login Form" : "Signup Form"}
                </Heading>

                {/* Toggle Buttons */}
                <div className="mb-6 flex rounded-lg border border-gray-200 bg-gray-100 p-1">
                    <Button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 rounded-md px-4 py-2 font-medium hover:cursor-pointer transition-colors ${isLogin
                            ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white"
                            : "text-gray-700 hover:text-blue-500"
                            }`}
                    >
                        Login
                    </Button>

                    <Button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 rounded-md px-4 py-2 font-medium hover:cursor-pointer transition-colors ${!isLogin
                            ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white"
                            : "text-gray-700 hover:text-blue-500"
                            }`}
                    >
                        Signup
                    </Button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ duration: 0.35 }}
                                className="space-y-4"
                            >
                                {/* Email */}
                                <div className="space-y-2">
                                    <InputField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        onChange={() => { }}
                                        placeholder="you@example.com"
                                        icon={<MdEmail className="h-5 w-5 text-gray-400" />}
                                        className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
                                    />
                                </div>

                                {/* Password with toggle */}
                                <div className="space-y-2">



                                    <div className="relative">
                                        <InputField
                                            label="Password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            onChange={() => { }}
                                            placeholder="••••••••"
                                            icon={<RiLockPasswordFill className="h-5 w-5 text-gray-400" />}
                                            className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 top-6.5 flex items-center text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </Button>
                                    </div>
                                </div>

                                {/* Forgot Password */}
                                <div className="text-right">
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full rounded-lg bg-gradient-to-r from-cyan-600 to-blue-700 hover:cursor-pointer px-4 py-2 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-blue-600"
                                >
                                    Login
                                </Button>

                                <Paragraph className="text-center text-sm text-gray-700 dark:text-gray-300 ">
                                    Not a member?{" "}
                                    <Button
                                        type="button"
                                        onClick={toggleMode}
                                        className="font-semibold text-blue-600 hover:underline"
                                    >
                                        Signup now
                                    </Button>
                                </Paragraph>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}
                                className="space-y-4"
                            >
                                {/* First + Last Name */}
                                <div className="flex gap-4">
                                    <div className="flex-1 space-y-2">
                                        <InputField
                                            label="First Name"
                                            name="firstname"
                                            type="text"
                                            placeholder="John"
                                            className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
                                        />

                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <InputField
                                            label="Last Name"
                                            name="lastname"
                                            type="text"
                                            placeholder="Doe"
                                            className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <InputField
                                        label="Email Address"
                                        name="signup-email"
                                        type="email"
                                        onChange={() => { }}
                                        placeholder="you@example.com"
                                        icon={<MdEmail className="h-5 w-5 text-gray-400" />}
                                        className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
                                    />
                                </div>

                                {/* Password with toggle */}
                                <div className="space-y-2">
                                    <div className="relative">
                                        <InputField
                                            label="Password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            onChange={() => { }}
                                            placeholder="••••••••"
                                            icon={<RiLockPasswordFill className="h-5 w-5 text-gray-400" />}
                                            className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 top-6.5 flex items-center text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full mt-4 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-700 hover:cursor-pointer px-4 py-2 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-blue-600"
                                >
                                    Signup
                                </Button>

                                <Paragraph className="text-center text-sm text-gray-600 dark:text-gray-300 ">
                                    Already a member?{" "}
                                    <Button
                                        type="button"
                                        onClick={toggleMode}
                                        className="font-semibold text-blue-600 hover:underline"
                                    >
                                        Login now
                                    </Button>
                                </Paragraph>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </section>
    );
}

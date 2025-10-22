"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { FiUsers, FiCreditCard, FiShare2, FiCheckCircle, FiUserPlus } from "react-icons/fi";
import Paragraph from "@/components/reusable-components/Paragraph";
import Heading from "@/components/reusable-components/Heading";
import Button from "@/components/reusable-components/Button";
import { getUserInfoFromToken } from "@/utils/helper/tokenHelper";
import { baseUrl } from "@/utils/constant/appConfiguration";
import { useGetUserDashboardQuery } from "@/redux/features/file/dashboardApi";
import HowReferWorksComponent from "./HowReferWorks";
import { useGetUserByIdQuery } from "@/redux/features/file/authenticationApi";
import DataLoader from "@/components/reusable-components/DataLoader";

interface DashboardStats {
    referredUsers: number;
    convertedUsers: number;
    totalCreditsEarned: number;
    referralLink: string;
    conversionRate: number;
}

interface User {
    _id: string;
    name: string;
    email: string;
    isPurchased?: boolean;
    createdAt: string;
}

export default function Dashboard() {
    const userInfo = getUserInfoFromToken();

    const { data, isLoading, error } = useGetUserDashboardQuery(userInfo.id!, {
        skip: !userInfo?.id, // Skip query if no userId
    });

      const { data:userData } = useGetUserByIdQuery(userInfo.id!, { 
        skip: !userInfo.id,
      });

    const [stats, setStats] = useState<DashboardStats>({
        referredUsers: 0,
        convertedUsers: 0,
        totalCreditsEarned: 0,
        referralLink: baseUrl + '/register?r=' + userInfo?.id,
        conversionRate: 0
    });

    const [copied, setCopied] = useState(false);

    // Update stats when data is loaded
    useEffect(() => {
        if (data?.data) {
            const conversionRate = data.data.referralStats.totalReferrals > 0 
                ? Math.round((data.data.referralStats.totalConverted / data.data.referralStats.totalReferrals) * 100)
                : 0;

            setStats({
                referredUsers: data.data.referralStats.totalReferrals,
                convertedUsers: data.data.referralStats.totalConverted,
                totalCreditsEarned: data.data.referralStats.totalEarned,
                referralLink: baseUrl + '/register?r=' + userInfo?.id,
                conversionRate
            });
        }
    }, [data, userInfo?.id]);

    const copyReferralLink = () => {
        navigator.clipboard.writeText(stats.referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareReferralLink = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join me on this amazing platform!',
                    text: 'Sign up using my referral link and get bonus credits!',
                    url: stats.referralLink,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            copyReferralLink();
        }
    };

    const StatCard = ({ 
        icon, 
        title, 
        value, 
        subtitle,
        color 
    }: { 
        icon: React.ReactNode, 
        title: string, 
        value: number, 
        subtitle?: string,
        color: string 
    }) => (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 ${color} relative overflow-hidden`}
        >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between relative z-10">
                <div>
                    <Paragraph className="text-white/70 text-sm font-medium">{title}</Paragraph>
                    <Heading className="text-3xl font-bold text-white mt-2">
                        {isLoading ? "..." : value}
                    </Heading>
                    {subtitle && (
                        <Paragraph className="text-white/50 text-xs mt-1">{subtitle}</Paragraph>
                    )}
                </div>
                <div className="text-3xl text-white/80 p-3 bg-white/10 rounded-xl">
                    {icon}
                </div>
            </div>
        </motion.div>
    );

    const UserCard = ({ user, isConverted }: { user: User, isConverted: boolean }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
        >
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <Paragraph className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                        {user.name}
                    </Paragraph>
                    <Paragraph className="text-white/60 text-sm">{user.email}</Paragraph>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <Paragraph className="text-white/50 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                </Paragraph>
                {isConverted && (
                    <div className="flex items-center space-x-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">
                        <FiCheckCircle size={12} />
                        <span>Purchased</span>
                    </div>
                )}
            </div>
        </motion.div>
    );

    if (isLoading) {
        return <DataLoader textToRender={'Loading dashboard...'}></DataLoader>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="text-red-400 text-6xl mb-4">⚠️</div>
                    <Heading className="text-2xl font-bold text-white mb-2">
                        Error Loading Dashboard
                    </Heading>
                    <Paragraph className="text-white/70">
                        Please try refreshing the page
                    </Paragraph>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center my-12"
                >
                    <Heading className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Referral Dashboard
                    </Heading>
                    <Paragraph className="text-white/70 text-lg max-w-2xl mx-auto">
                        Welcome back, <span className="text-cyan-300 font-semibold">{data?.data.user.name}</span>! 
                        Track your referrals, conversions, and earned credits in real-time.
                    </Paragraph>
                </motion.div>

                {/* Stats Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 ${userData?.data?.user?.isPurchased ? 'lg:grid-cols-5 gap-4' : 'lg:grid-cols-4 gap-6'} mb-8`}>
                    <StatCard
                        icon={<FiUsers />}
                        title="Total Referrals"
                        value={stats.referredUsers}
                        color="bg-gradient-to-br from-purple-500/20 to-purple-600/20"
                    />
                    <StatCard
                        icon={<FiCheckCircle />}
                        title="Converted Users"
                        value={stats.convertedUsers}
                        subtitle={`${stats.conversionRate}% conversion`}
                        color="bg-gradient-to-br from-green-500/20 to-green-600/20"
                    />
                    <StatCard
                        icon={<FiUserPlus />}
                        title="Pending Conversions"
                        value={stats.referredUsers - stats.convertedUsers}
                        color="bg-gradient-to-br from-orange-500/20 to-orange-600/20"
                    />
                    {
                        userData?.data?.user?.isPurchased && <StatCard
                        icon={<FiCreditCard />}
                        title="Book Purchased"
                        value={2}
                        subtitle="Earned from purchase book"
                        color="bg-gradient-to-br from-green-500/20 to-purple-600/20"
                    />
                    }
                    
                    <StatCard
                        icon={<FiCreditCard />}
                        title="Total Credits"
                        value={stats.totalCreditsEarned}
                        subtitle="Earned from referrals"
                        color="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20"
                    />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 my-8">
                    {/* Stats Summary Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="overflow-x-auto bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20"
                    >
                        <table className="min-w-full text-left text-sm text-white/80">
                            <thead className="text-white uppercase text-xs border-b border-white/20 bg-white/5">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium">Metric</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Current Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <td className="px-6 py-4">Referred Users</td>
                                    <td className="px-6 py-4 font-bold ">{stats.referredUsers}</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="px-6 py-4">Converted Users (Who purchased) </td>
                                    <td className="px-6 py-4 font-bold ">{stats.convertedUsers}</td>
                                </tr>
                                 <tr className="border-b border-white/10">
                                    <td className="px-6 py-4">Pending Users (Not Purchased) </td>
                                    <td className="px-6 py-4 font-bold ">{stats.referredUsers - stats.convertedUsers}</td>
                                </tr>
                                {
                                    userData?.data?.user?.isPurchased && <tr className="border-b border-white/10">
                                    <td className="px-6 py-4">Purchsed Book </td>
                                    <td className="px-6 py-4 font-bold ">2</td>
                                </tr>
                                }
                                <tr>
                                    <td className="px-6 py-4">Total Credits Earned</td>
                                    <td className="px-6 py-4 font-bold ">{stats.totalCreditsEarned + (userData?.data?.user?.isPurchased ? 2 : 0)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </motion.div>

                    {/* Referred Users List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="xl:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <Heading className="text-2xl font-bold text-white flex items-center">
                                <FiUsers className="mr-3" />
                                Your Referral Network
                            </Heading>
                            <div className="flex space-x-2">
                                <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm flex items-center">
                                    <FiCheckCircle size={14} className="mr-1" />
                                    {stats.convertedUsers} Purchased
                                </div>
                                <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center">
                                    <FiUsers size={14} className="mr-1" />
                                    {stats.referredUsers} Total
                                </div>
                            </div>
                        </div>

                        {data?.data.referredUsers && data.data.referredUsers.length > 0 ? (
                            <div className="space-y-3 max-h-96 pr-2 h-48 overflow-y-scroll scrollbar-hide">
                                {data.data.referredUsers.map((user: User) => {
                                    const isConverted = data.data.convertedUsers.some(
                                        (convertedUser: User) => convertedUser._id === user._id
                                    );
                                    return (
                                        <UserCard 
                                            key={user._id} 
                                            user={user} 
                                            isConverted={isConverted}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4 opacity-50">👥</div>
                                <Heading className="text-xl font-bold text-white/70 mb-2">
                                    No Referrals Yet
                                </Heading>
                                <Paragraph className="text-white/50">
                                    Start sharing your referral link to grow your network!
                                </Paragraph>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Referral Link Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8"
                >
                    <Heading className="text-2xl font-bold text-white mb-4 flex items-center">
                        <FiShare2 className="mr-3" />
                        Your Referral Link
                    </Heading>
                    <Paragraph className="text-white/70 mb-6 text-lg">
                        Share your unique link with friends. When they sign up and make their first purchase, 
                        <span className="text-cyan-300 font-semibold"> you both earn 2 credits! </span>
                        🎉
                    </Paragraph>

                    <div className="flex flex-col lg:flex-row gap-4 items-stretch">
                        <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center">
                            <div className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-lg mr-4 text-sm font-mono">
                                LINK
                            </div>
                            <Paragraph className="text-cyan-300 text-sm font-mono break-all flex-1">
                                {stats.referralLink}
                            </Paragraph>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={shareReferralLink}
                                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <FiShare2 size={20} />
                                Share Link
                            </Button>

                            <Button
                                onClick={copyReferralLink}
                                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:border-white/30 transform hover:scale-105"
                            >
                                {copied ? (
                                    <div className="flex gap-x-2 items-center ">
                                        <FiCheckCircle size={20} className="" />
                                        Copied!
                                    </div>
                                ) : (
                                    "Copy Link"
                                )}
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* How It Works Section */}
                <HowReferWorksComponent></HowReferWorksComponent>
            </div>

        </div>
    );
}
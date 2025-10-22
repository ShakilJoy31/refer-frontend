"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiSave, FiEdit3, FiArrowLeft, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Paragraph from "@/components/reusable-components/Paragraph";
import Heading from "@/components/reusable-components/Heading";
import Button from "@/components/reusable-components/Button";
import { getUserInfoFromToken } from "@/utils/helper/tokenHelper";
import { useGetUserByIdQuery, useUpdateUserByIdMutation } from "@/redux/features/file/authenticationApi";
import InputField from "@/components/ui/input";
import DataLoader from "@/components/reusable-components/DataLoader";

interface UserFormData {
    name: string;
    email: string;
    currentPassword: string;
    password: string;
    confirmPassword: string;
}

const PasswordInput = React.memo(({
    label,
    name,
    value,
    onChange,
    showPassword,
    setShowPassword,
    disabled,
    placeholder
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    disabled: boolean;
    placeholder: string;
}) => (
    <div>
        <InputField
            label={label}
            name={name}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            icon={<FiLock className="text-white/50" size={18} />}
            inputLabelClassName="flex items-center text-white/80 mb-3 font-medium"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed pl-10 pr-12"
        />
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute right-3 hover:cursor-pointer transform -translate-y-1/2 text-white/50 hover:text-white/70 disabled:opacity-30"
            style={{ top: '70%' }}
        >
            {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
        </button>
    </div>
));

PasswordInput.displayName = 'PasswordInput';

export default function EditProfile() {
    const userInfo = getUserInfoFromToken();
    const [isEditing, setIsEditing] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState<UserFormData>({
        name: "", email: "", currentPassword: "", password: "", confirmPassword: ""
    });
    const [originalData, setOriginalData] = useState<UserFormData>({
        name: "", email: "", currentPassword: "", password: "", confirmPassword: ""
    });

    const { data, isLoading, error } = useGetUserByIdQuery(userInfo.id!, { skip: !userInfo.id });
    const [updateUser, { isLoading: isUpdating, isSuccess: updateSuccess, error: updateError }] = useUpdateUserByIdMutation();

    useEffect(() => {
        if (data?.data?.user) {
            const user = data.data.user;
            setFormData({ name: user.name, email: user.email, currentPassword: "", password: "", confirmPassword: "" });
            setOriginalData({ name: user.name, email: user.email, currentPassword: "", password: "", confirmPassword: "" });
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const hasProfileChanges = formData.name !== originalData.name || formData.email !== originalData.email;
    const hasPasswordChanges = formData.currentPassword.trim() !== "" || formData.password.trim() !== "" || formData.confirmPassword.trim() !== "";
    const passwordsMatch = formData.password === formData.confirmPassword;
    const isPasswordStrong = formData.password.length >= 6 || formData.password === "";
    const canSubmit = hasProfileChanges || (hasPasswordChanges && passwordsMatch && isPasswordStrong && formData.currentPassword.trim() !== "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) {
            setIsEditing(false);
            return;
        }

        try {
            const payload: { password: string; currentPassword: string; name: string; email: string } = {
                name: formData.name, email: formData.email, password: "", currentPassword: ""
            };
            if (hasPasswordChanges) {
                payload.currentPassword = formData.currentPassword;
                payload.password = formData.password;
            }

            await updateUser({ userId: userInfo.id!, userData: payload }).unwrap();
            setIsEditing(false);
            setFormData(prev => ({ ...prev, currentPassword: "", password: "", confirmPassword: "" }));
            setOriginalData({ name: formData.name, email: formData.email, currentPassword: "", password: "", confirmPassword: "" });
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleCancel = () => {
        setFormData(originalData);
        setIsEditing(false);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    if (isLoading) {
        return <DataLoader textToRender={'Loading profile...'}></DataLoader>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className="text-red-400 text-6xl mb-4">⚠️</div>
                    <Heading className="text-2xl font-bold text-white mb-2">Error Loading Profile</Heading>
                    <Paragraph className="text-white/70 mb-4">Failed to load user data. Please try again.</Paragraph>
                    <Button onClick={() => window.location.reload()} className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white">Retry</Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-24">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Button onClick={() => window.history.back()} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-xl">
                            <FiArrowLeft size={20} />
                        </Button>
                        <div>
                            <Heading className="text-3xl font-bold text-white">Edit Profile</Heading>
                            <Paragraph className="text-white/70">Update your personal information and password</Paragraph>
                        </div>
                        {data?.data?.user?.isPurchased && <Button onClick={() => window.history.back()} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-xl">Already Purchased Book</Button>}
                    </div>
                    {!isEditing && (
                        <Button onClick={handleEditToggle} className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2">
                            <FiEdit3 size={18} /> Edit Profile
                        </Button>
                    )}
                </motion.div>

                {updateSuccess && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500/20 border border-green-500/30 text-green-300 p-4 rounded-xl mb-6 flex items-center">
                        <FiSave className="mr-3" size={20} /> Profile updated successfully!
                    </motion.div>
                )}

                {updateError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 flex items-center">
                        <FiSave className="mr-3" size={20} /> Failed to update profile. Please check your current password and try again.
                    </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <Heading className="text-xl font-bold text-white mb-4 flex items-center"><FiUser className="mr-2" />Profile Information</Heading>

                                <div className="mb-4">
                                    <InputField
                                        label="Full Name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        disabled={!isEditing || isUpdating}
                                        icon={<FiUser className="text-white/50" size={18} />}
                                        inputLabelClassName="flex items-center text-white/80 mb-3 font-medium"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed pl-10"
                                    />
                                    {!isEditing && <div className="absolute inset-0 bg-transparent rounded-xl cursor-not-allowed"></div>}
                                </div>

                                <div>
                                    <InputField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email address"
                                        disabled={!isEditing || isUpdating}
                                        icon={<FiMail className="text-white/50" size={18} />}
                                        inputLabelClassName="flex items-center text-white/80 mb-3 font-medium"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed pl-10"
                                    />
                                    {!isEditing && <div className="absolute inset-0 bg-transparent rounded-xl cursor-not-allowed"></div>}
                                </div>
                            </div>

                            {isEditing && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pt-6 border-t border-white/10">
                                    <Heading className="text-xl font-bold text-white mb-4 flex items-center"><FiLock className="mr-2" />Change Password</Heading>
                                    <Paragraph className="text-white/60 mb-4 text-sm">Leave password fields empty if you don&apos;t want to change your password.</Paragraph>

                                    <div className="space-y-4">
                                        <div className="relative">
                                            <PasswordInput label="Current Password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} showPassword={showCurrentPassword} setShowPassword={setShowCurrentPassword} disabled={!isEditing || isUpdating} placeholder="Enter your current password" />
                                        </div>

                                        <div className="relative">
                                            <PasswordInput label="New Password" name="password" value={formData.password} onChange={handleInputChange} showPassword={showNewPassword} setShowPassword={setShowNewPassword} disabled={!isEditing || isUpdating} placeholder="Enter new password (min 6 characters)" />
                                        </div>

                                        <div className="relative">
                                            <PasswordInput label="Confirm New Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} disabled={!isEditing || isUpdating} placeholder="Confirm your new password" />
                                        </div>

                                        {formData.password && !isPasswordStrong && <Paragraph className="text-red-400 text-sm">Password must be at least 6 characters long</Paragraph>}
                                        {formData.confirmPassword && !passwordsMatch && <Paragraph className="text-red-400 text-sm">Passwords do not match</Paragraph>}
                                        {formData.password && formData.confirmPassword && passwordsMatch && isPasswordStrong && <Paragraph className="text-green-400 text-sm">Passwords match and meet requirements</Paragraph>}
                                    </div>
                                </motion.div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                <div>
                                    <Paragraph className="text-white/60 text-sm mb-1">User ID</Paragraph>
                                    <Paragraph className="text-white font-mono text-sm bg-white/5 p-2 rounded-lg">{userInfo?.id}</Paragraph>
                                </div>
                                <div>
                                    <Paragraph className="text-white/60 text-sm mb-1">Referral Status</Paragraph>
                                    <Paragraph className="text-white bg-white/5 p-2 rounded-lg">{data?.data.user.referredBy ? "Referred User" : "Original User"}</Paragraph>
                                </div>
                            </div>

                            {isEditing && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
                                    <Button type="button" onClick={handleCancel} disabled={isUpdating} className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">Cancel</Button>
                                    <Button type="submit" disabled={!canSubmit || isUpdating} className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isUpdating ? (<><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>Updating...</>) : (<><FiSave size={18} />Save Changes</>)}
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </form>
                </motion.div>

                {isEditing && canSubmit && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        Unsaved changes - {hasPasswordChanges ? "Profile & Password" : "Profile"}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
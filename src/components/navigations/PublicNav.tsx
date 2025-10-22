"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, User, LogOut, ChevronDown, Home, User as UserIcon } from "lucide-react";

import navbarLogo from "../../../public/book-logo.png";
import ThemeSwitcher from "../reusable-components/ThemeSwitcher";
import LanguageSwitcher from "../reusable-components/LanguageSwitcher";
import Button from "../reusable-components/Button";
import LogoutComponent from "../reusable-components/LogOutComponent";
import { removeTokenFromCookie } from "@/utils/helper/tokenHelper";

// ==============================
// Navigation Links
// ==============================
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Books", path: "/books" },
  { name: "Login", path: "/login" },
  { name: "Terms & Condition", path: "/terms-and-condition" },
];

// ==============================
// Animation Variants
// ==============================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const mobileMenuVariants: Variants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

const mobileItemVariants: Variants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 },
};

const dropdownVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};


// ==============================
// Helpers
// ==============================
const isActiveLink = (pathname: string, linkPath: string): boolean => {
  if (linkPath === "/") return pathname === "/";
  if (linkPath === "/projects") {
    return pathname === "/projects" || pathname.startsWith("/projects/project-details/");
  }
  if (linkPath === "/service") {
    return pathname === "/service" || pathname.startsWith("/service/service-details/");
  }
  return pathname.startsWith(linkPath);
};

const getDesktopLinkClasses = (isActive: boolean, isScrolled: boolean, pathname: string): string => {
  const baseClasses = "relative px-4 py-2 font-medium transition-all duration-300";

  const specialPaths = [
    "/terms-and-condition",
    "/contact",
    "/cart",
    "/wishlist",
    "/books",
    "/checkout",
  ];

  const isSpecialPath =
    specialPaths.includes(pathname) || pathname.startsWith("/books/book-details/");

  if (isActive) {
    return `${baseClasses} ${isSpecialPath
        ? "text-black dark:text-white"
        : isScrolled
          ? "text-black dark:text-white"
          : "text-white"
      }`;
  }

  return `${baseClasses} ${isScrolled
      ? "text-gray-700 dark:text-gray-300"
      : `dark:text-white ${isSpecialPath ? "text-black" : "text-white"}`
    }`;
};

const getMobileLinkClasses = (isActive: boolean): string => {
  const baseClasses = "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300";
  return isActive
    ? `${baseClasses} bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 dark:border-blue-400 shadow-sm`
    : `${baseClasses} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400`;
};


// ==============================
// User Profile Dropdown Component
// ==============================
interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  isScrolled: boolean;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ 
  isOpen, 
  onClose, 
  onLogout,
  isScrolled 
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const menuItems = [
    {
      icon: UserIcon,
      label: "My Profile",
      onClick: () => router.push("/user/profile"),
      color: "text-blue-600"
    },
    {
      icon: Home,
      label: "Dashboard",
      onClick: () => router.push("/user/dashboard"),
      color: "text-green-600"
    },
    {
      icon: LogOut,
      label: "Logout",
      onClick: onLogout,
      color: "text-red-600"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          variants={dropdownVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className={`absolute top-full right-0 mt-2 w-64 rounded-2xl shadow-2xl border backdrop-blur-xl z-50 ${
            isScrolled 
              ? "bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-700" 
              : "bg-white/90 dark:bg-gray-900/90 border-white/20 dark:border-gray-700/30"
          }`}
          style={{
            backdropFilter: 'blur(20px)'
          }}
        >

          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={item.onClick}
                className={`w-full hover:cursor-pointer flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  item.label === "Logout" 
                    ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==============================
// Main Component
// ==============================
export default function PublicNav() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Mock authentication state - replace with your actual auth logic

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Check initial scroll position and set up scroll listener
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    // Check initial scroll position on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleLogout = () => {
    removeTokenFromCookie();
    window.location.reload();
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    setIsProfileDropdownOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-[#050117]/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push("/")}
            className="cursor-pointer flex-shrink-0 w-24 md:w-32"
          >
            <Image
              src={navbarLogo}
              alt="Template Logo"
              priority
              className="w-full h-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center space-x-1"
          >
            {navLinks.map((link) => {
              const active = isActiveLink(pathname, link.path);
              return (
                <motion.div key={link.path} variants={itemVariants} className="relative">
                  <Link href={link.path} className={getDesktopLinkClasses(active, isScrolled, pathname)}>
                    {link.name}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                          isScrolled
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500"
                            : "bg-gradient-to-r from-blue-300 to-blue-400 dark:from-blue-300 dark:to-blue-400"
                        }`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Desktop Right Side */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center space-x-4"
          >
            <ThemeSwitcher />
            <LanguageSwitcher />
            
            {(
              // User Profile Dropdown
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex hover:cursor-pointer items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                  <motion.div
                    animate={{ rotate: isProfileDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <UserProfileDropdown
                  isOpen={isProfileDropdownOpen}
                  onClose={() => setIsProfileDropdownOpen(false)}
                  onLogout={openLogoutModal}
                  isScrolled={isScrolled}
                />
              </div>
            )}
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex lg:hidden items-center space-x-3"
          >
            <div className="hidden xs:flex items-center space-x-2">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
            <Button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <X size={24} className="transform transition-transform duration-300 rotate-90" />
              ) : (
                <Menu size={24} className="transform transition-transform duration-300" />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col space-y-3 h-screen">
                <div className="flex xs:hidden items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800 mt-4">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>

                {navLinks.map((link, index) => {
                  const active = isActiveLink(pathname, link.path);
                  return (
                    <motion.div
                      key={link.path}
                      variants={mobileItemVariants}
                      initial="closed"
                      animate="open"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={link.path} className={getMobileLinkClasses(active)}>
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {(
                  <>
                    <motion.div
                      variants={mobileItemVariants}
                      initial="closed"
                      animate="open"
                      transition={{ delay: navLinks.length * 0.1 }}
                    >
                      <Link href="/user/profile" className={getMobileLinkClasses(isActiveLink(pathname, "/user/profile"))}>
                        My Profile
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={mobileItemVariants}
                      initial="closed"
                      animate="open"
                      transition={{ delay: (navLinks.length + 1) * 0.1 }}
                    >
                      <Link href="/user/dashboard" className={getMobileLinkClasses(isActiveLink(pathname, "/user/dashboard"))}>
                        Dashboard
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={mobileItemVariants}
                      initial="closed"
                      animate="open"
                      transition={{ delay: (navLinks.length + 2) * 0.1 }}
                    >
                      <button
                        onClick={openLogoutModal}
                        className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                      >
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Logout Modal */}
      <LogoutComponent
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
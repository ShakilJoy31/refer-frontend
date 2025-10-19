import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SidebarFilters from "./SidebarFilters";
import Button from "../reusable-components/Button";
import Heading from "../reusable-components/Heading";

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCategories: string[];
    setSelectedCategories: (cats: string[]) => void;
    selectedRating: number | null;
    setSelectedRating: (r: number | null) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
}

export default function FilterDrawer({
    isOpen,
    onClose,
    ...filterProps
}: FilterDrawerProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 bg-black/40 flex"
                >
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-700 w-72 max-w-full h-full p-6 shadow-lg overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <Heading className="text-lg font-semibold">Filters</Heading>
                            <Button onClick={onClose}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        <SidebarFilters {...filterProps} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

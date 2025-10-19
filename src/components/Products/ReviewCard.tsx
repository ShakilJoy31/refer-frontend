import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Paragraph from "../reusable-components/Paragraph";


export function ReviewCard({
    name,
    daysAgo,
    rating,
    content,
}: {
    name: string;
    daysAgo?: number;
    rating: number;
    content: string;
}) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-4 rounded-md border border-cyan-300 space-y-2 dark:bg-black dark:text-white"
        >
            <div className="dark:bg-black dark:text-white flex items-center gap-3">
                <div className="dark:bg-black dark:border-cyan-600 dark:text-white w-8 h-8 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {name.charAt(0)}
                </div>
                <div className="dark:bg-black dark:text-white">
                    <div className="font-semibold text-gray-800 dark:bg-black dark:text-white">{name}</div>
                    {daysAgo !== undefined && (
                        <div className="text-xs text-gray-500 dark:bg-black dark:text-white">
                            {daysAgo} days ago
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-1 dark:bg-black dark:text-white">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`${i < rating ? 'text-cyan-400' : 'text-gray-300'}`}
                        size={20}
                        fill={i < rating ? "currentColor" : "none"}
                    />
                ))}
            </div>
            <Paragraph className="text-gray-600 dark:bg-black dark:text-white">{content}</Paragraph>
            <div className="flex gap-4 mt-2 text-sm text-blue-600 font-medium cursor-pointer dark:bg-black dark:text-white">
                <span>Like</span>
                <span>💬 Reply</span>
            </div>
        </motion.div>
    );
}
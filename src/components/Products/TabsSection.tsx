// components/product/TabsSection.tsx (with added animations)
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { FaComments } from "react-icons/fa6";
import Button from "../reusable-components/Button";
import { TextareaField } from "../reusable-components/CustomTextArea";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import { ReviewCard } from "./ReviewCard";

interface Review {
    id?: string;
    name: string;
    daysAgo?: number;
    rating: number;
    content: string;
    createdAt?: string;
}

interface TabsSectionProps {
    specification?: string | null;
    description?: string | null;
    reviews?: Review[] | null;
    rating?: number;
    productName?: string;
    productId: number;
}

const Tabs = [
    "Specifications",
    "Description",
    "Reviews"
];

export default function TabsSection({
    specification,
    description,
    reviews = [],
    productName = "",
}: TabsSectionProps) {
    const [activeTab, setActiveTab] = useState(Tabs[0]);
    const [reviewContent, setReviewContent] = useState("");
    const [reviewRating, setReviewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmitReview = async () => {
        
    };

    const calculateDaysAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };



    // Calculate rating distribution
    const ratingDistribution = [0, 0, 0, 0, 0];

    // Animation variants
    const tabContentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    const averageRating = 4.5;

    return (
        <div className="space-y-6 dark:text-white">
            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="dark:bg-black dark:text-white flex items-center gap-4 justify-between bg-cyan-50 rounded-full p-[5px] h-[56px] "
            >
                {Tabs.map((tab) => (
                    <Button
                        variant={'outline'}
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium w-full hover:cursor-pointer h-full transition-all
              ${activeTab === tab
                                ? "bg-gradient-to-r hover:cursor-pointer from-cyan-600 to-blue-700 text-white shadow-sm dark:bg-orange-500"
                                : "text-gray-700 dark:text-gray-300 hover:text-black"
                            }`}
                    >
                        {tab}
                    </Button>
                ))}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {/* Specifications */}
                {activeTab === Tabs[0] && (
                    <motion.div
                        key="specifications"
                        variants={tabContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-6 text-sm"
                    >
                        <div>
                            <Heading className="text-lg font-semibold text-gray-800 dark:text-white">
                                {productName} Specifications
                            </Heading>
                            <div className="mt-4 text-gray-700 dark:text-white">
                                {specification ? (
                                    <div
                                        className="prose max-w-none dark:prose-invert"
                                        dangerouslySetInnerHTML={{ __html: specification }}
                                    />
                                ) : (
                                    <Paragraph className="text-gray-500 dark:text-white">
                                        No specifications available
                                    </Paragraph>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Description */}
                {activeTab === Tabs[1] && (
                    <motion.div
                        key="description"
                        variants={tabContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-6 text-sm text-gray-700"
                    >
                        <div>
                            <Heading className="text-lg font-semibold text-gray-800 dark:text-white">
                                Product Description
                            </Heading>
                            {description ? (
                                description.includes('<') ? (
                                    <div
                                        className="mt-3 prose max-w-none dark:prose-invert"
                                        dangerouslySetInnerHTML={{ __html: description }}
                                    />
                                ) : (
                                    <div className="mt-3 space-y-2">
                                        {description.split('\n').map((paragraph, index) => (
                                            paragraph.trim() && <Paragraph className="text-sm dark:text-gray-300" key={index}>{paragraph}</Paragraph>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <Paragraph className="mt-3 text-gray-500 dark:text-white">
                                    No description available
                                </Paragraph>
                            )}
                        </div>
                        <div>
                            <Heading className="text-lg font-semibold text-gray-800 dark:text-white">
                                Product Details
                            </Heading>
                            <ul className="mt-3 space-y-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="text-blue-500 mt-1" size={16} />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        Not intended for use as Personal Protective Equipment
                                    </span>
                                </li>
                                <li className="ml-6">
                                    <span className="text-cyan-600 font-semibold cursor-pointer hover:underline">
                                        See More
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}

                {/* Review */}
                {activeTab === Tabs[2] && (
                    <motion.div
                        key="reviews"
                        variants={tabContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-6 text-sm text-gray-700"
                    >
                        <div>
                            <Heading className="text-lg font-semibold text-gray-800 dark:text-white">
                                Customers Feedback
                            </Heading>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 dark:bg-black dark:text-white">
                                <div className="bg-cyan-50 rounded-xl p-6 text-center dark:bg-black dark:text-white dark:border dark:border-white">
                                    <div className="text-4xl font-bold text-cyan-500">{averageRating.toFixed(1)}</div>
                                    <div className="flex justify-center mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`${i < Math.floor(averageRating) ? 'text-cyan-400' : 'text-gray-300'}`}
                                                size={18}
                                                fill={i < averageRating ? "currentColor" : "none"}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 ">
                                        Product Rating
                                    </div>
                                </div>

                                <div className="bg-cyan-50 rounded-xl p-6 dark:bg-black dark:text-white dark:border dark:border-white">
                                    <div className="space-y-2 dark:bg-black dark:text-white">
                                        {[5, 4, 3, 2, 1].map((star,) => {
                                            const count = ratingDistribution[5 - star] || 0;
                                            const totalReviews = 12;
                                            const width = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                                            return (
                                                <div key={star} className="flex items-center gap-2">
                                                    <span className="text-xs w-4">{star}</span>
                                                    <Star className="text-cyan-400" size={20} fill="currentColor" />
                                                    <div className="flex-1 bg-gray-200 rounded h-2">
                                                        <div
                                                            className="bg-orange-400 h-2 rounded"
                                                            style={{ width: `${width}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs w-4">{count}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="space-y-6 dark:text-white">
                            {reviews && reviews.length > 0 ? (
                                <>
                                    {reviews.map((review, index) => (
                                        <ReviewCard
                                            key={review.id || index}
                                            name={review.name}
                                            daysAgo={review.createdAt ? calculateDaysAgo(review.createdAt) : 0}
                                            rating={review.rating}
                                            content={review.content}
                                        />
                                    ))}
                                    <div className="text-right">
                                        <Button variant={'outline'} className="text-cyan-600 hover:cursor-pointer font-semibold hover:underline">
                                            View All Review
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <Paragraph className="text-gray-500 dark:text-white">
                                    No reviews available
                                </Paragraph>
                            )}
                        </div>

                        {/* Write a Review */}
                        <div className="pt-4 dark:text-white">
                            <Heading className="text-base font-semibold text-gray-800 dark:text-white">
                                Write a Review
                            </Heading>
                            <Paragraph className="mt-1 dark:text-white">
                                What is it like to {productName}
                            </Paragraph>
                            <div className="flex gap-1 mt-2 dark:text-white">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`cursor-pointer ${(hoverRating || reviewRating) > i
                                            ? 'text-cyan-400'
                                            : 'text-gray-300'
                                            }`}
                                        size={20}
                                        fill={(hoverRating || reviewRating) > i ? "currentColor" : "none"}
                                        onMouseEnter={() => setHoverRating(i + 1)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setReviewRating(i + 1)}
                                    />
                                ))}
                            </div>

                            <div className="mt-[30px] dark:text-white">
                                <TextareaField
                                    label="Review This Product"
                                    name="review"
                                    placeholder="What's on your mind?"
                                    icon={<FaComments className="h-5 w-5 text-gray-400" />}
                                    className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
                                    value={reviewContent}
                                    onChange={(e) => setReviewContent(e.target.value)}
                                />
                            </div>

                            <Button
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all bg-gradient-to-r hover:cursor-pointer from-cyan-600 to-blue-700 text-white w-[185px] dark:bg-black dark:text-white`}
                                onClick={handleSubmitReview}>Submit
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
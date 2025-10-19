"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import SidebarFilters from "./SidebarFilters";
import FilterDrawer from "./FilterDrawer";
import SearchAndSort from "./SearchAndSort";
import ProductGrid from "./ProductGrid";
import Button from "../reusable-components/Button";
import Paragraph from "../reusable-components/Paragraph";
import { Product } from "@/types/product/productCardTypes";
import Pagination from "../reusable-components/Pagination";

interface NewProductsProps {
  products: Product[];
}

export const ProductListing: React.FC<NewProductsProps> = ({ products }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["View All"]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("New Arrival");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filtering logic
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesCategory =
                selectedCategories.includes("View All") || selectedCategories.includes(p.category);

            const matchesRating = selectedRating ? p.rating >= selectedRating : true;

            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

            return matchesCategory && matchesRating && matchesSearch && matchesPrice;
        });
    }, [products, selectedCategories, selectedRating, searchTerm, priceRange]);

    // Sorting logic
    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            if (sortBy === "Price: Low to High") return a.price - b.price;
            if (sortBy === "Price: High to Low") return b.price - a.price;
            if (sortBy === "Top Rated") return b.rating - a.rating;
            return 0;
        });
    }, [filteredProducts, sortBy]);

    // Pagination logic
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedProducts.slice(startIndex, endIndex);
    }, [sortedProducts, currentPage, pageSize]);

    const totalPages = Math.ceil(sortedProducts.length / pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1); // Reset to first page when page size changes
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 mt-16 py-16 container mx-auto px-4">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
                <Button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex items-center gap-2 border border-cyan-500 rounded px-4 py-2 text-sm font-medium"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                </Button>
            </div>

            {/* Mobile Sidebar Drawer */}
            <FilterDrawer
                isOpen={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
            />

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block border-r pr-4 border-cyan-500">
                <SidebarFilters
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedRating={selectedRating}
                    setSelectedRating={setSelectedRating}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <SearchAndSort
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {/* Products Count */}
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Showing {paginatedProducts.length} of {sortedProducts.length} products
                </div>

                <ProductGrid products={paginatedProducts} />

                {sortedProducts.length === 0 && (
                    <Paragraph className="text-center py-12 text-gray-700 dark:text-gray-300">
                        No products found matching your filters.
                    </Paragraph>
                )}

                {/* Pagination */}
                {sortedProducts.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
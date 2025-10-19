import { Search } from "lucide-react";
import InputField from "../ui/input";

interface SearchAndSortProps {
    searchTerm: string;
    setSearchTerm: (s: string) => void;
    sortBy: string;
    setSortBy: (s: string) => void;
}

export default function SearchAndSort({
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
}: SearchAndSortProps) {
    return (
        <div className="flex flex-wrap items-center justify-between mb-6">
            {/* Search input */}
            <div className="relative w-full sm:w-72">
                <InputField
                    type="text"
                    placeholder="Search Product..."
                    value={searchTerm}
                    icon={<Search className="h-5 w-5 text-gray-400" />}
                    className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Sort dropdown */}
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-3 py-2 border-cyan-500 dark:bg-gray-700 hover:cursor-pointer w-full sm:w-72 mt-4 lg:mt-0"
            >
                <option>New Arrival</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
            </select>
        </div>
    );
}

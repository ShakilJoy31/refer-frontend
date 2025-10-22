import Heading from "../reusable-components/Heading";

const categories = [
    "View All",
    "Fiction",
    "Self-Help",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Memoir",
    "Psychology",
    "History",
    "Young Adult"
];

interface CategoryFilterProps {
    selectedCategories: string[];
    setSelectedCategories: (cats: string[]) => void;
}

export default function CategoryFilter({
    selectedCategories,
    setSelectedCategories,
}: CategoryFilterProps) {
    const handleCategoryChange = (category: string) => {
        if (category === "View All") {
            setSelectedCategories(["View All"]);
        } else {
            const newCategories = selectedCategories.includes("View All")
                ? [category]
                : selectedCategories.includes(category)
                    ? selectedCategories.filter((cat) => cat !== category)
                    : [...selectedCategories, category];

            setSelectedCategories(newCategories.length > 0 ? newCategories : ["View All"]);
        }
    };

    return (
        <div className="mb-6">
            <Heading className="font-semibold text-lg mb-3 ">Categories</Heading>
            <div className="space-y-2">
                {categories.map((cat) => (
                    <label
                        key={cat}
                        className="flex items-center gap-2 cursor-pointer text-sm group"
                    >
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => handleCategoryChange(cat)}
                            className="w-4 h-4 bg-cyan-500 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2 group-hover:border-cyan-500 transition-colors"
                        />
                        <span className="group-hover:text-cyan-600">{cat}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

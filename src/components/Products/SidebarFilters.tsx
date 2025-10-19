
import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RatingFilter";


interface SidebarFiltersProps {
    selectedCategories: string[];
    setSelectedCategories: (cats: string[]) => void;
    selectedRating: number | null;
    setSelectedRating: (r: number | null) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
}

export default function SidebarFilters({
    selectedCategories,
    setSelectedCategories,
    selectedRating,
    setSelectedRating,
    priceRange,
    setPriceRange,
}: SidebarFiltersProps) {
    return (
        <div className="w-full lg:w-64 ">
            <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
            />
            <RatingFilter
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
            />
            <PriceRangeFilter
                priceRange={priceRange}
                setPriceRange={setPriceRange}
            />
        </div>
    );
}

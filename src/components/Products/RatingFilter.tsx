import { Star } from "lucide-react";
import { X } from "lucide-react";
import Button from "../reusable-components/Button";

const ratings = [5, 4, 3, 2, 1];

interface RatingFilterProps {
  selectedRating: number | null;
  setSelectedRating: (r: number | null) => void;
}

export default function RatingFilter({
  selectedRating,
  setSelectedRating,
}: RatingFilterProps) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-3 flex items-center justify-between "><span>Ratings</span> {
        
        selectedRating ? <Button className="hover:cursor-pointer hover:text-red-500" onClick={() => setSelectedRating(null)}>
        <X className="w-5 h-5" />
      </Button> : ''
}</h2>
      <div className="space-y-2">
        {ratings.map((r) => (
          <label
            key={r}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <input
              type="radio"
              checked={selectedRating === r}
              onChange={() => setSelectedRating(selectedRating === r ? null : r)}
            />
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < r ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            & Up
          </label>
        ))}
      </div>
    </div>
  );
}

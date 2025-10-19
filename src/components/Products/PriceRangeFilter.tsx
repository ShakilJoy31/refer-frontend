import { useRef, useState, useEffect } from "react";
import Heading from "../reusable-components/Heading";

interface PriceRangeFilterProps {
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
}

export default function PriceRangeFilter({
    priceRange,
    setPriceRange,
}: PriceRangeFilterProps) {
    const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handlePriceChange = (value: number, isMin = false) => {
        if (isMin) {
            setPriceRange([Math.min(value, priceRange[1] - 10), priceRange[1]]);
        } else {
            setPriceRange([priceRange[0], Math.max(value, priceRange[0] + 10)]);
        }
    };

    // Mouse/touch drag logic
    useEffect(() => {
        if (!sliderRef.current) return;

        const move = (clientX: number) => {
            if (!activeThumb || !sliderRef.current) return;
            const rect = sliderRef.current.getBoundingClientRect();
            const position = Math.min(Math.max(0, clientX - rect.left), rect.width);
            const value = Math.round((position / rect.width) * 300);
            if (activeThumb === "min") handlePriceChange(value, true);
            else handlePriceChange(value, false);
        };

        const handleMouseMove = (e: MouseEvent) => move(e.clientX);
        const handleTouchMove = (e: TouchEvent) => move(e.touches[0].clientX);
        const stop = () => setActiveThumb(null);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", stop);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", stop);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", stop);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", stop);
        };
    }, [activeThumb, priceRange]);

    return (
        <div className="space-y-6">
            <Heading className="font-semibold text-lg mb-3">Price Range</Heading>
            <div
                ref={sliderRef}
                className="relative h-2 bg-gray-200 rounded-lg cursor-pointer"
            >
                <div
                    className="absolute h-full bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg"
                    style={{
                        left: `${(priceRange[0] / 300) * 100}%`,
                        width: `${((priceRange[1] - priceRange[0]) / 300) * 100}%`,
                    }}
                />
                {/* Hidden inputs for accessibility */}
                <input
                    type="range"
                    min={0}
                    max={300}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(Number(e.target.value), true)}
                    className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
                />
                <input
                    type="range"
                    min={0}
                    max={300}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
                />
                {/* Thumbs */}
                <div
                    className="absolute h-4 w-4 bg-white border-2 border-cyan-600 rounded-full cursor-grab shadow-md -top-1 hover:scale-110 transition-transform"
                    style={{ left: `calc(${(priceRange[0] / 300) * 100}% - 8px)` }}
                    onMouseDown={() => setActiveThumb("min")}
                    onTouchStart={() => setActiveThumb("min")}
                />
                <div
                    className="absolute h-4 w-4 bg-white border-2 border-blue-700 rounded-full cursor-grab shadow-md -top-1 hover:scale-110 transition-transform"
                    style={{ left: `calc(${(priceRange[1] / 300) * 100}% - 8px)` }}
                    onMouseDown={() => setActiveThumb("max")}
                    onTouchStart={() => setActiveThumb("max")}
                />
            </div>
            <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>
        </div>
    );
}

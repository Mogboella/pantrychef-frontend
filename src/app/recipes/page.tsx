"use client";
import RecipeCard from "@/components/RecipeCard";
import { Bars3Icon, MagnifyingGlassIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";

interface FilterProps {
    cuisine: string,
    budget: string,
    time: string[]
}

export default function Recipes() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<FilterProps>({
        cuisine: "any",
        budget: "any",
        time: []
    });

    const handleFilterChange = (filterType: string, value: string) => {
        if (filterType === "time") {
            const updatedTime = selectedFilters.time.includes(value)
                ? selectedFilters.time.filter(t => t !== value)
                : [...selectedFilters.time, value];
            setSelectedFilters({ ...selectedFilters, time: updatedTime });
        } else {
            setSelectedFilters({ ...selectedFilters, [filterType]: value });
        }
    };

    return (
        <div className="min-h-screen bg-orange-400 text-black font-sans px-4 sm:px-6 py-6">

            {/* Search Section */}
            <div>
                <motion.h1 initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-luckiest text-center text-white text-3xl mb-4">
                        What's In Your Pantry ?
                </motion.h1>
            </div>
            <motion.div className="bg-white rounded-xl shadow-sm p-6 mb-12 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search ingredients (e.g., rice, chicken, tomatoes)"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap w-full md:w-auto">
                        <PhotoIcon className="w-5 h-5" />
                        Upload Photo
                    </button>
                </div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
                {/* Filters Section */}
                <aside className="lg:w-72 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Filter Recipes</h2>

                        <div className="space-y-6">
                            {/* Cuisine Filter */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Cuisine</label>
                                <select
                                    value={selectedFilters.cuisine}
                                    onChange={(e) => handleFilterChange("cuisine", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="any">Any Cuisine</option>
                                    <option value="italian">Italian</option>
                                    <option value="mexican">Mexican</option>
                                    <option value="asian">Asian</option>
                                    <option value="mediterranean">Mediterranean</option>
                                </select>
                            </div>

                            {/* Budget Filter */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Budget</label>
                                <div className="space-y-2">
                                    {["any", "low", "medium", "high"].map((option) => (
                                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="budget"
                                                checked={selectedFilters.budget === option}
                                                onChange={() => handleFilterChange("budget", option)}
                                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                            />
                                            <span className="text-gray-700 capitalize">
                                                {option === "any" ? "Any" :
                                                    option === "low" ? "Low ($)" :
                                                        option === "medium" ? "Medium ($$)" : "High ($$$)"}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Time Filter */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Cooking Time</label>
                                <div className="space-y-2">
                                    {["30", "30-60", "60"].map((time) => (
                                        <label key={time} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.time.includes(time)}
                                                onChange={() => handleFilterChange("time", time)}
                                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                            />
                                            <span className="text-gray-700">
                                                {time === "30" ? "< 30 mins" :
                                                    time === "30-60" ? "30–60 mins" : "> 1 hr"}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Recipe Grid Section */}
                <section className="flex-1">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-2xl text-white font-bold">Recipes</h2>
                        <p className="text-gray-200">{16} results</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {new Array(16).fill('').map((_, index) => (
                            <RecipeCard
                                key={index}
                                title={["Tomato Basil Pasta", "Chicken Stir Fry", "Vegetable Curry"][index % 3]}
                                image="/pasta.avif"
                                rating={(4.5 + Math.random() * 0.5).toFixed(1)}
                                time={[25, 40, 55][index % 3]}
                                difficulty={["Easy", "Medium", "Hard"][index % 3]}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center">
                        <nav className="flex items-center gap-1">
                            <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
                                Previous
                            </button>
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    className={`px-4 py-2 border rounded-lg ${page === 1 ? 'bg-orange-500 text-white border-orange-500' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
                                Next
                            </button>
                        </nav>
                    </div>
                </section>
            </div>
        </div>
    );
}
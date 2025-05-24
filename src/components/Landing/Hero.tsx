import { motion } from "framer-motion";

export default function Hero() {
    return (
        <div className="relative text-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
            {/* Background Pattern SVG */}
            <div className="absolute inset-0 -z-10 opacity-10">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <image href="/icons/garlic.svg" width="24" height="24" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pattern)" />
                </svg>
            </div>

            <motion.h1
                className="text-6xl md:text-6xl font-luckiest mb-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                PANTRYCHEF
            </motion.h1>

            <motion.p
                className="text-lg md:text-xl max-w-2xl text-white dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                Discover delicious recipes based on what you already have at home.
                Filter by budget, cuisine, or dietary preference — PantryChef’s got you covered.
            </motion.p>

            <motion.div
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <button className="bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition">
                    Add Your Pantry Items
                </button>
                <button className="border border-black text-black py-3 px-6 rounded-full font-medium hover:bg-black hover:text-white transition">
                    Explore Recipes
                </button>
            </motion.div>
        </div>
    );
}

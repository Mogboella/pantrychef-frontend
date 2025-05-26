import Image from "next/image";

export default function RecipeCard(
    {
        title,
        image,
        rating,
        time,
        difficulty
    }: {
        title: string;
        image: string;
        rating: string;
        time?: number;
        difficulty?: string;
    }
) {
    const difficultyColors = {
        Easy: 'bg-green-500',
        Medium: 'bg-yellow-500',
        Hard: 'bg-red-500'
    };

    return (
        <div
            className="rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden 
      dark:border dark:border-white/10 hover:scale-[1.02] group cursor-pointer
      bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
        >
            {/* Image with time badge */}
            <div className="relative">
                <Image
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover group-hover:brightness-90 transition"
                />
                {time && (
                    <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        {time} mins
                    </span>
                )}
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
                    <div className="flex items-center bg-black/10 dark:bg-white/10 px-2 py-1 rounded-full">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm">{rating}</span>
                    </div>
                </div>

                {/* Difficulty and other metadata */}
                <div className="flex items-center justify-between text-sm">
                    {difficulty && (
                        <span className={`${difficultyColors[difficulty as keyof typeof difficultyColors] || 'bg-gray-500'} 
              text-white px-2 py-1 rounded-full text-xs`}>
                            {difficulty}
                        </span>
                    )}

                    <button className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium">
                        View Recipe →
                    </button>
                </div>
            </div>
        </div>
    );
}
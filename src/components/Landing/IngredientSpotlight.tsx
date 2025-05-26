import Image from "next/image";
export default function IngredientSpotlight() {
    return (
        <div className="py-20 px-4">
            <div className="max-w-6xl mx-auto relative">
                {/* Star shape container */}
                <div className="relative bg-yellow-50 p-10 rounded-lg shadow-xl before:absolute before:content-[''] before:w-full before:h-full before:border-4 before:border-yellow-300 before:border-opacity-60 before:rounded-lg before:transform before:rotate-6 before:-z-10 after:absolute after:content-[''] after:w-full after:h-full after:border-4 after:border-yellow-300 after:border-opacity-60 after:rounded-lg after:transform after:-rotate-6 after:-z-10">
                    <div className="grid md:grid-cols-2 gap-10 items-center z-10">

                        <Image
                            src="/oats.jpeg"
                            alt="Oats"
                            width={600}
                            height={400}
                            className="rounded-xl shadow-lg border-4 border-yellow-200"
                            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                        />

                        <div>
                            <h2 className="text-3xl font-bold text-amber-900">Ingredient Spotlight: Oats</h2>
                            <p className="mt-4 text-amber-800">
                                Oats are a versatile whole grain packed with fiber and nutrients. They&apos;re perfect for breakfast, baking, and even savory dishes!
                            </p>
                            <ul className="mt-6 list-disc pl-5 text-amber-700 space-y-2">
                                <li>Rich in soluble fiber (beta-glucan) for heart health</li>
                                <li>Used in 80+ recipes from porridge to granola bars</li>
                                <li>Great for meal prep - stores well for months</li>
                                <li>Naturally gluten-free (look for certified GF oats)</li>
                            </ul>
                        </div>
                    </div>

                    {/* Decorative star elements */}
                    <div className="absolute -top-6 -left-6 text-yellow-400 text-5xl">★</div>
                    <div className="absolute -bottom-6 -right-6 text-yellow-400 text-5xl">★</div>
                    <div className="absolute -top-6 -right-6 text-yellow-400 text-5xl">★</div>
                    <div className="absolute -bottom-6 -left-6 text-yellow-400 text-5xl">★</div>
                </div>
            </div>
        </div>
    );
}
"use client";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function ContactAbout() {
    return (
        <div className="min-h-screen bg-[#6c2930] text-gray-900 dark:text-gray-100">
            {/* Hero Section */}
            <div className="bg-[#6c2930] px-6 py-16 md:py-20 text-center">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold font-luckiest mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    About PantryChef
                </motion.h1>
            </div>

            {/* About Content */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <motion.div
                    className="prose dark:prose-invert text-lg mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="mb-6">
                        PantryChef helps you create delicious meals from ingredients you already have at home.
                        Simply enter what's in your pantry, and we'll suggest recipes that match your available
                        ingredients, dietary preferences, and cooking time.
                    </p>
                    <p>
                        Our goal is to reduce food waste and make meal planning effortless, so you can spend
                        less time worrying about what to cook and more time enjoying homemade meals.
                    </p>
                </motion.div>
            </section>

            {/* Contact Section */}
            <section className="bg-[#6c2930] py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div
                            className="space-y-6"
                          
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-500 p-3 rounded-full text-white">
                                    <EnvelopeIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Email</h3>
                                    <p className="text-gray-600 dark:text-gray-300">hello@pantrychef.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-orange-500 p-3 rounded-full text-white">
                                    <PhoneIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Phone</h3>
                                    <p className="text-gray-600 dark:text-gray-300">(555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-orange-500 p-3 rounded-full text-white">
                                    <MapPinIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Address</h3>
                                    <p className="text-gray-600 dark:text-gray-300">123 Recipe Lane</p>
                                    <p className="text-gray-600 dark:text-gray-300">Foodville, FC 12345</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form
                            className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow"
                        >
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-600"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-600"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-600"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
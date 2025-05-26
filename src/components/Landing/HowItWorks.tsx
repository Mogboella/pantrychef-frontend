'use client';

import { motion } from 'framer-motion';
import Image from "next/image";

const steps = [
    { text: 'Add your Ingredients', image: '/undraw_add-files_d04y.svg' },
    { text: 'Set Your Preferences', image: '/undraw_personal-settings_8xv3.svg' },
    { text: 'Get your Recipes', image: '/undraw_pie-graph_8m6b.svg' },
];

export default function HowItWorks() {
    return (
        <div className="py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-15">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.2 }}
                        className="bg-white p-6 rounded-2xl shadow-lg"
                    >
                        <div className="text-4xl font-bold text-amber-600 mb-4">{i + 1}</div>
                        <p className="text-lg text-black">{step.text}</p>
                        <div className="relative mx-auto mb-4 mt-6" style={{ width: '170px', height: '150px' }}>
                            <Image
                                src={step.image}
                                alt={`Step ${i + 1}`}
                                fill
                                className="object-fit"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

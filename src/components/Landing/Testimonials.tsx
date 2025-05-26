'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperComponent = dynamic(
    () => import('swiper/react').then(mod => ({
        default: mod.Swiper,
        SwiperSlide: mod.SwiperSlide
    })),
    {
        ssr: false,
        loading: () => <div className="flex justify-center items-center h-64">Loading testimonials...</div>
    }
);

import { testimonials } from '@/data/testimonials';
import { SwiperSlide } from 'swiper/react';

export default function Testimonials() {
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isClient) return null;

    return (
        <div className="py-20 px-4">
            <h2 className="text-4xl font-bold text-center mb-12">What People Say</h2>
            {isMobile ? (
                <div className="relative">
                    {/* Swipe hint text */}
                    <div className="text-center text-sm text-gray-500 mb-4 flex items-center justify-center">
                        <span className="animate-bounce-horizontal mr-2">←</span>
                        Swipe to see more
                        <span className="animate-bounce-horizontal ml-2">→</span>
                    </div>

                    <SwiperComponent
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pagination',
                            type: 'bullets',
                        }}
                    >
                        {testimonials.map((t, i) => (
                            <SwiperSlide key={i}>
                                <TestimonialCard {...t} />
                            </SwiperSlide>
                        ))}
                    </SwiperComponent>

                    {/* Custom navigation arrows */}
                    <div className="swiper-button-prev !text-amber-600 after:!text-xl"></div>
                    <div className="swiper-button-next !text-amber-600 after:!text-xl"></div>

                    {/* Custom pagination dots */}
                    <div className="swiper-pagination !relative !mt-6"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </div>
            )}


        </div>
    );
}

function TestimonialCard({ author, quote }: { author: string; quote: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow h-full mx-2">
            <p className="italic text-gray-700">&quot;{quote}&quot;</p>
            <p className="mt-4 font-semibold text-right text-amber-700">— {author}</p>
        </div>
    );
}
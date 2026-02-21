// Banner carousel — auto-rotating hero banners on the home page.
// Supports manual navigation via arrows and dot indicators.

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Hero banner slides with promotional content
const HERO_SLIDES = [
    {
        id: 'sale-live',
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
        title: "Big Saving Days",
        subtitle: "Sale is Live!",
        description: "Get up to 80% off on Electronics & Fashion.",
        buttonText: "Shop Now",
        link: "/products",
    },
    {
        id: 'smartphones',
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=1600&q=80",
        title: "Latest Smartphones",
        subtitle: "Just Launched",
        description: "Starting from ₹9,999. Exchange offers available.",
        buttonText: "View Mobiles",
        link: "/products?category=Mobiles",
    },
    {
        id: 'fashion',
        image: "https://images.unsplash.com/photo-1485230946086-1d99d505c599?w=1600&q=80",
        title: "Fashion for All",
        subtitle: "Trending Styles",
        description: "Men, Women & Kids clothing at unbeatable prices.",
        buttonText: "Explore Fashion",
        link: "/products?category=Fashion",
    },
    {
        id: 'home-furniture',
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
        title: "Home & Furniture",
        subtitle: "Revamp Your Space",
        description: "Premium furniture & decor items for your dream home.",
        buttonText: "Shop Home",
        link: "/products?category=Home",
    },
    {
        id: 'electronics',
        image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=1600&q=80",
        title: "Electronics Sale",
        subtitle: "Best Gadgets",
        description: "Laptops, Headphones, Smartwatches & more.",
        buttonText: "Grab Deals",
        link: "/products?category=Electronics",
    },
];

const AUTOPLAY_INTERVAL = 4000; // 4 seconds between slides
const FALLBACK_BANNER = 'https://placehold.co/1600x300?text=Lumina+Sale';

const BannerCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = HERO_SLIDES.length;

    // Navigate to adjacent slides
    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    }, [totalSlides]);

    // Auto-rotate slides
    useEffect(() => {
        const timer = setInterval(goToNext, AUTOPLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [goToNext]);

    return (
        <section className="relative w-full h-[200px] sm:h-[280px] lg:h-[320px] bg-gray-100 overflow-hidden shadow-sm mb-4 group">
            {/* Slides */}
            {HERO_SLIDES.map((slide, idx) => (
                <div
                    key={slide.id}
                    className={`${idx === activeIndex ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 ease-in-out absolute top-0 left-0 w-full h-full`}
                >
                    {idx === activeIndex && (
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = FALLBACK_BANNER; }}
                            />

                            {/* Text overlay with gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent flex flex-col justify-center px-8 md:px-16 text-white text-left">
                                <span className="text-yellow-400 font-bold uppercase tracking-wider text-xs md:text-sm mb-2 drop-shadow-md animate-fade-in-up">
                                    {slide.subtitle}
                                </span>
                                <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg leading-tight animate-fade-in-up delay-100">
                                    {slide.title}
                                </h2>
                                <p className="text-sm md:text-lg mb-6 max-w-md drop-shadow-md hidden sm:block animate-fade-in-up delay-200">
                                    {slide.description}
                                </p>
                                <Link to={slide.link} className="inline-block bg-white text-primary font-bold py-2 px-6 rounded-sm shadow-md hover:bg-gray-100 transition-colors w-fit animate-fade-in-up delay-300">
                                    {slide.buttonText}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Previous/Next arrows — visible on hover */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 hidden group-hover:block cursor-pointer bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors" onClick={goToPrev}>
                <ArrowBackIos className="text-white text-xl pl-1" />
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 hidden group-hover:block cursor-pointer bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors" onClick={goToNext}>
                <ArrowForwardIos className="text-white text-xl" />
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {HERO_SLIDES.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${idx === activeIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default BannerCarousel;

import React, { useState, useEffect } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SLIDES = [
    {
        id: 1,
        image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/d9290fb51138d286.png?q=20",
        title: "Big Saving Days",
        subtitle: "Sale is Live!",
        description: "Get up to 80% off on Electronics & Fashion.",
        cta: "Shop Now",
        link: "/products"
    },
    {
        id: 2,
        image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/aa1b2376cd97b6bf.jpg?q=20",
        title: "Latest Smartphones",
        subtitle: "Just Launched",
        description: "Starting from ₹9,999. Exchange offers available.",
        cta: "View Mobiles",
        link: "/products?category=Mobiles"
    },
    {
        id: 3,
        image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/352e6f0f8034fab5.jpg?q=20",
        title: "Fashion for All",
        subtitle: "Trending Styles",
        description: "Men, Women & Kids clothing at unbeatable prices.",
        cta: "Explore Fashion",
        link: "/products?category=Fashion"
    },
    {
        id: 4,
        image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/7fd0e4ab26429926.jpg?q=20",
        title: "Home & Furniture",
        subtitle: "Revamp Your Space",
        description: "Premium furniture & decor items for your dream home.",
        cta: "Shop Home",
        link: "/products?category=Home"
    },
    {
        id: 5,
        image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/61e3d6f1df639c4f.jpg?q=20",
        title: "Electronics Sale",
        subtitle: "Best Gadgets",
        description: "Laptops, Headphones, Smartwatches & more.",
        cta: "Grab Deals",
        link: "/products?category=Electronics"
    }
];

const BannerCarousel = () => {
    const [current, setCurrent] = useState(0);
    const length = SLIDES.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    // Auto-play
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [length]);

    if (!Array.isArray(SLIDES) || SLIDES.length <= 0) {
        return null;
    }

    return (
        <section className="relative w-full h-[200px] sm:h-[280px] lg:h-[320px] bg-gray-100 overflow-hidden shadow-sm mb-4 group">
            {SLIDES.map((slide, index) => (
                <div
                    className={`${index === current ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 ease-in-out absolute top-0 left-0 w-full h-full`}
                    key={slide.id}
                >
                    {index === current && (
                        <div className="relative w-full h-full">
                            {/* Image */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/1600x300?text=Flipkart+Sale'; }}
                            />

                            {/* Text Overlay (Gradient) - Optional styling similar to real banners */}
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
                                    {slide.cta}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Controls - Visible on Hover */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 hidden group-hover:block cursor-pointer bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors" onClick={prevSlide}>
                <ArrowBackIos className="text-white text-xl pl-1" />
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 hidden group-hover:block cursor-pointer bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors" onClick={nextSlide}>
                <ArrowForwardIos className="text-white text-xl" />
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {SLIDES.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${index === current ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default BannerCarousel;

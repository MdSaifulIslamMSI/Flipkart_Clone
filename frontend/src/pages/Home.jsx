import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import BannerCarousel from '../components/BannerCarousel';

const DealSection = ({ title, products, link }) => (
    <div className="bg-white p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
            <div>
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-xs text-gray-400">Grab the best offers now!</p>
            </div>
            <Link to={link || "/products"} className="bg-primary text-white text-sm px-4 py-2 rounded-sm font-medium hover:shadow-md">
                View All
            </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {products && products.map((product) => (
                <div key={product._id} className="min-w-[200px] sm:min-w-[250px]">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    </div>
);

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({}));
    }, [dispatch]);

    // Mock filtering for sections
    const electronicDeals = products?.filter(p => p.category === 'Electronics' || p.category === 'Mobiles').slice(0, 4) || [];
    const fashionDeals = products?.filter(p => p.category === 'Fashion').slice(0, 4) || [];

    return (
        <>
            <MetaData title="Flipkart Clone - Home" />
            <div className="bg-[#f1f3f6] min-h-screen pb-8">
                {/* Hero Carousel */}
                <div className="container mx-auto px-4 max-w-[1280px] mt-3">
                    <BannerCarousel />
                </div>

                {/* Bank Offer Banner */}
                <div className="container mx-auto px-4 max-w-[1280px] mt-4">
                    <img
                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80"
                        alt="Bank Offer"
                        className="w-full h-32 object-cover shadow-sm rounded-sm"
                    />
                </div>

                <div id="deals" className="container mx-auto px-4 max-w-[1280px] mt-4">
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <div className="text-red-500 text-center py-10">{error}</div>
                    ) : (
                        <>
                            {/* Top Deals Section - Electronics */}
                            <DealSection title="Top Deals on Electronics" products={electronicDeals} link="/products?category=Electronics" />

                            {/* Promotional Ad Grid (3 Columns) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="relative group overflow-hidden shadow-sm">
                                    <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80" alt="Fashion" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-xl font-bold">New Trends</h3>
                                        <p className="text-sm">Min. 50% Off</p>
                                    </div>
                                </div>
                                <div className="relative group overflow-hidden shadow-sm">
                                    <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&q=80" alt="Gadgets" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-xl font-bold">Smart Gadgets</h3>
                                        <p className="text-sm">Just Launched</p>
                                    </div>
                                </div>
                                <div className="relative group overflow-hidden shadow-sm">
                                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80" alt="Decor" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-xl font-bold">Home Decor</h3>
                                        <p className="text-sm">From ₹299</p>
                                    </div>
                                </div>
                            </div>

                            {/* Fashion Section */}
                            {fashionDeals.length > 0 && (
                                <DealSection title="Best of Fashion" products={fashionDeals} link="/products?category=Fashion" />
                            )}

                            {/* Featured Brands Strip */}
                            <div className="bg-white p-6 shadow-sm mb-4">
                                <h2 className="text-lg font-bold text-gray-800 mb-4 px-2">Featured Brands</h2>
                                <div className="flex flex-wrap justify-between items-center gap-8 px-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                                    <img src="https://logo.clearbit.com/samsung.com" alt="Samsung" className="h-6 object-contain" />
                                    <img src="https://logo.clearbit.com/nike.com" alt="Nike" className="h-6 object-contain" />
                                    <img src="https://logo.clearbit.com/apple.com" alt="Apple" className="h-8 object-contain" />
                                    <img src="https://logo.clearbit.com/sony.com" alt="Sony" className="h-4 object-contain" />
                                    <img src="https://logo.clearbit.com/lenovo.com" alt="Lenovo" className="h-5 object-contain" />
                                    <img src="https://logo.clearbit.com/panasonic.com" alt="Panasonic" className="h-5 object-contain" />
                                </div>
                            </div>

                            {/* More Categories: Home, Toys */}
                            {products && (
                                <>
                                    <DealSection
                                        title="Home & Kitchen Essentials"
                                        products={products.filter(p => p.category === 'Home' || p.category === 'Appliances').slice(0, 5)}
                                        link="/products?category=Home"
                                    />
                                    <DealSection
                                        title="Toys, Beauty & More"
                                        products={products.filter(p => p.category === 'Toys' || p.category === 'Accessories').slice(0, 5)}
                                        link="/products?category=Toys"
                                    />
                                </>
                            )}

                            {/* Recommended Section */}
                            <div className="bg-white p-4 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended For You</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                                    {products && products.slice(0, 8).map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import BannerCarousel from '../components/BannerCarousel';
import { LocalShipping, Security, Support } from '@mui/icons-material';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(loadProducts({}));
    }, [dispatch]);

    // Grouping for new layout
    const featuredProducts = products?.slice(0, 8) || [];

    const categories = [
        { name: "Electronics", image: "https://images.unsplash.com/photo-1498049381929-c56785c7576d?w=400&q=80" },
        { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80" },
        { name: "Home", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&q=80" },
        { name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?w=400&q=80" },
        { name: "Mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80" },
        { name: "Appliances", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80" },
    ];

    return (
        <>
            <MetaData title="Lumina - Elevate Your Lifestyle" />
            <div className="bg-gray-50 min-h-screen font-sans text-gray-800">

                {/* Hero Section - Full Width wrapper for existing carousel */}
                <div className="w-full bg-white shadow-sm mb-8">
                    <BannerCarousel />
                </div>

                <div className="container mx-auto px-4 max-w-7xl">

                    {/* Features / Benefits Strip */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-purple-50 text-primary rounded-full"><LocalShipping /></div>
                            <div>
                                <h3 className="font-bold text-gray-900">Free Shipping</h3>
                                <p className="text-sm text-gray-500">On all orders over ₹499</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-purple-50 text-primary rounded-full"><Security /></div>
                            <div>
                                <h3 className="font-bold text-gray-900">Secure Payment</h3>
                                <p className="text-sm text-gray-500">100% secure transactions</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-purple-50 text-primary rounded-full"><Support /></div>
                            <div>
                                <h3 className="font-bold text-gray-900">24/7 Support</h3>
                                <p className="text-sm text-gray-500">Dedicated support team</p>
                            </div>
                        </div>
                    </div>

                    {/* Shop by Category - Modern Grid */}
                    <div className="mb-16">
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
                            <Link to="/products" className="text-primary font-medium hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {categories.map((cat, index) => (
                                <Link to={`/products?category=${cat.name}`} key={index} className="group text-center">
                                    <div className="overflow-hidden rounded-full aspect-square mb-4 shadow-md border-2 border-white group-hover:border-primary transition-all duration-300">
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Featured Collections (Masonry Style replacement for Banner Ads) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="relative rounded-2xl overflow-hidden h-[300px] group shadow-lg cursor-pointer">
                            <Link to="/products?category=Fashion" className="block w-full h-full">
                                <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80" alt="Fashion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-3xl font-bold mb-2">New Season Fashion</h3>
                                    <p className="mb-4 text-gray-200">Discover the latest trends in clothing and accessories.</p>
                                    <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold w-fit hover:bg-gray-100 transition-colors">Shop Now</span>
                                </div>
                            </Link>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden h-[300px] group shadow-lg cursor-pointer">
                            <Link to="/products?category=Electronics" className="block w-full h-full">
                                <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80" alt="Electronics" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-3xl font-bold mb-2">Latest Tech</h3>
                                    <p className="mb-4 text-gray-200">Upgrade your life with cutting-edge electronics.</p>
                                    <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold w-fit hover:bg-gray-100 transition-colors">Shop Now</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Trending Products (Grid instead of Slider) */}
                    <div className="mb-16">
                        <div className="text-center mb-10">
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">Trending Now</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Best Selling Products</h2>
                        </div>

                        {loading ? <Loader /> : error ? <div className="text-red-500 text-center">{error}</div> : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {featuredProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                        <div className="text-center mt-10">
                            <Link to="/products" className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-all">
                                View All Products
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter / CTA Section */}
                    <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white mb-16 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Join the Lumina Revolution</h2>
                            <p className="text-purple-100 max-w-2xl mx-auto text-lg mb-8">Sign up for our newsletter and get exclusive access to new launches and offers.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <input type="email" placeholder="Enter your email" className="px-6 py-3 rounded-full text-gray-900 focus:outline-none flex-1" />
                                <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">Subscribe</button>
                            </div>
                        </div>
                        {/* Decorative background circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Home;

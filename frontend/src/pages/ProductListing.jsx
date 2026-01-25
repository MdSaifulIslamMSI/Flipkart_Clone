import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { Star, Favorite } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

const ProductListing = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    const category = searchParams.get('category') || '';

    // Local State for Filters
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [selectedRatings, setSelectedRatings] = useState(0);
    const [sortBy, setSortBy] = useState('relevance');

    const { loading, error, products, productsCount } = useSelector((state) => state.products);

    useEffect(() => {
        // Dispatch with filters
        dispatch(fetchProducts({ keyword, category, price: priceRange, ratings: selectedRatings }));
    }, [dispatch, keyword, category, priceRange, selectedRatings]);

    // Client-side sorting logic (since mock API doesn't handle sort)
    const sortedProducts = [...(products || [])].sort((a, b) => {
        if (sortBy === 'priceLow') return a.price - b.price;
        if (sortBy === 'priceHigh') return b.price - a.price;
        if (sortBy === 'rating') return b.ratings - a.ratings;
        return 0;
    });

    return (
        <>
            <MetaData title="Products - Flipkart Clone" />
            <div className="bg-[#f1f3f6] min-h-screen py-3">
                <div className="container mx-auto px-4 max-w-[1280px] flex flex-col md:flex-row gap-4">

                    {/* Sidebar Filters (20%) */}
                    <div className="bg-white p-4 w-full md:w-[22%] h-fit shadow-sm rounded-sm sticky top-20">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h3 className="text-lg font-bold">Filters</h3>
                            <span className="text-xs text-blue-600 font-medium cursor-pointer" onClick={() => { setPriceRange([0, 200000]); setSelectedRatings(0); }}>CLEAR ALL</span>
                        </div>

                        {/* Price Filter */}
                        <div className="mb-6 border-b pb-6">
                            <h4 className="font-medium text-xs text-gray-700 mb-2 uppercase tracking-wide">Price</h4>
                            <div className="px-1">
                                <input
                                    type="range"
                                    min="0" max="200000" step="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                                    className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                                    <span>Min</span>
                                    <span>₹{priceRange[1].toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Customer Ratings Filter */}
                        <div className="mb-2">
                            <h4 className="font-medium text-xs text-gray-700 mb-2 uppercase tracking-wide">Customer Ratings</h4>
                            <div className="flex flex-col gap-2">
                                {[4, 3, 2, 1].map((star) => (
                                    <label key={star} className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input
                                            type="checkbox"
                                            checked={selectedRatings === star}
                                            onChange={() => setSelectedRatings(prev => prev === star ? 0 : star)}
                                            className="accent-primary w-4 h-4 rounded-sm border-gray-300"
                                        />
                                        <span className="flex items-center gap-1">
                                            {star} <Star className="text-[14px] text-gray-900" /> & above
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product List Area (80%) */}
                    <div className="flex-1 bg-white p-4 shadow-sm rounded-sm">
                        {/* Usage Header & Sort */}
                        <div className="border-b border-gray-100 pb-3 mb-4 flex flex-col sm:flex-row justify-between items-center">
                            <h2 className="font-medium text-base text-gray-900">
                                {keyword ? (
                                    <span className="font-bold">Search results for "{keyword}"</span>
                                ) : category ? (
                                    <span className="font-bold">{category}</span>
                                ) : (
                                    <span className="font-bold">All Products</span>
                                )}
                                <span className="text-gray-400 text-xs ml-2">(Showing {sortedProducts.length} items)</span>
                            </h2>
                            <div className="flex items-center gap-4 text-sm mt-2 sm:mt-0">
                                <span className="font-bold text-gray-900">Sort By</span>
                                <div className="flex gap-4 text-sm text-gray-600 font-medium">
                                    <span
                                        className={`cursor-pointer pb-0.5 border-b-2 transition-colors ${sortBy === 'relevance' ? 'text-primary border-primary' : 'border-transparent hover:text-gray-900'}`}
                                        onClick={() => setSortBy('relevance')}
                                    >
                                        Relevance
                                    </span>
                                    <span
                                        className={`cursor-pointer pb-0.5 border-b-2 transition-colors ${sortBy === 'priceLow' ? 'text-primary border-primary' : 'border-transparent hover:text-gray-900'}`}
                                        onClick={() => setSortBy('priceLow')}
                                    >
                                        Price -- Low to High
                                    </span>
                                    <span
                                        className={`cursor-pointer pb-0.5 border-b-2 transition-colors ${sortBy === 'priceHigh' ? 'text-primary border-primary' : 'border-transparent hover:text-gray-900'}`}
                                        onClick={() => setSortBy('priceHigh')}
                                    >
                                        Price -- High to Low
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <div className="text-red-500 text-center">{error}</div>
                        ) : sortedProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="No Results" className="w-48 mb-6" />
                                <h3 className="text-xl font-bold text-gray-800">Sorry, no results found!</h3>
                                <p className="text-gray-500 mt-2">Please check the spelling or try searching for something else.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {sortedProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductListing;

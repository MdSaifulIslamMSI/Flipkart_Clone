import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { Star, FilterList, Sort } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

const ProductListing = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    const category = searchParams.get('category') || '';
    const sortParam = searchParams.get('sort') || '';
    const ratingsParam = searchParams.get('ratings[gte]') || 0;

    // Local State
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [selectedRatings, setSelectedRatings] = useState(Number(ratingsParam));
    const [sortBy, setSortBy] = useState(sortParam || 'relevance');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(loadProducts({ keyword, category, priceRange, ratings: selectedRatings, sort: sortBy }));
    }, [dispatch, keyword, category, priceRange, selectedRatings, sortBy]);

    const sortedProducts = products || [];

    return (
        <>
            <MetaData title="Shop Details - Lumina" />
            <div className="bg-gray-50 min-h-screen font-sans">

                {/* Header Banner for Category */}
                <div className="bg-primary text-white py-12 mb-8">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <h1 className="text-4xl font-bold mb-2">{category || keyword || "All Products"}</h1>
                        <p className="opacity-80">Explore our premium collection of top-rated items.</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row gap-8 pb-12">

                    {/* Mobile Filter & Sort Bar */}
                    <div className="lg:hidden flex items-center justify-between mb-4 gap-4 sticky top-16 z-30 bg-gray-50 py-2">
                        <button onClick={() => setIsMobileFilterOpen(true)} className="flex-1 flex items-center justify-center gap-2 font-bold text-gray-800 bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100">
                            <FilterList /> Filters
                        </button>
                        <div className="flex-1 relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100 text-sm font-bold appearance-none pl-10"
                            >
                                <option value="relevance">Relevance</option>
                                <option value="newest">Newest</option>
                                <option value="lowest">Price: Low</option>
                                <option value="highest">Price: High</option>
                            </select>
                            <Sort className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        </div>
                    </div>

                    {/* Filter Overlay (Mobile) & Sidebar (Desktop) */}
                    <>
                        {/* Mobile Overlay Backdrop */}
                        {isMobileFilterOpen && (
                            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
                        )}

                        {/* Filter Container */}
                        <aside className={`
                            fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:transform-none lg:static lg:w-1/4 lg:h-fit lg:shadow-md lg:rounded-2xl lg:block
                            ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                        `}>
                            <div className="p-6 h-full overflow-y-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                                    <div className="flex items-center gap-4">
                                        <button className="text-xs text-primary font-bold hover:underline" onClick={() => { setPriceRange([0, 200000]); setSelectedRatings(0); }}>RESET</button>
                                        <button onClick={() => setIsMobileFilterOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
                                            <FilterList className="rotate-180" /> {/* Using Icon as Close for now or just X */}
                                        </button>
                                    </div>
                                </div>

                                {/* Price Filter */}
                                <div className="mb-8">
                                    <h4 className="font-bold text-sm text-gray-800 mb-4">Price Range</h4>
                                    <input
                                        type="range"
                                        min="0" max="200000" step="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                                        className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
                                    />
                                    <div className="flex justify-between text-sm font-medium text-gray-600">
                                        <span>₹0</span>
                                        <span>₹{priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Ratings Filter */}
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800 mb-4">Minimum Rating</h4>
                                    <div className="space-y-3">
                                        {[4, 3, 2, 1].map((star) => (
                                            <label key={star} className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedRatings === star ? 'bg-primary border-primary text-white' : 'border-gray-300 group-hover:border-primary'}`}>
                                                    {selectedRatings === star && <span className="text-xs">✓</span>}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRatings === star}
                                                    onChange={() => setSelectedRatings(prev => prev === star ? 0 : star)}
                                                    className="hidden"
                                                />
                                                <div className="flex items-center gap-1 text-gray-600 group-hover:text-primary transition-colors">
                                                    <div className="flex text-yellow-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`text-[16px] ${i < star ? 'fill-current' : 'text-gray-200'}`} />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm font-medium">& Up</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Apply Button */}
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-full mt-8 bg-primary text-white font-bold py-3 rounded-xl shadow-lg lg:hidden"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </aside>
                    </>

                    {/* Product Grid */}
                    <main className="flex-1">
                        {/* Desktop Sort Bar */}
                        <div className="hidden lg:flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
                            <p className="text-gray-500 text-sm">Showing <span className="font-bold text-gray-900">{sortedProducts.length}</span> Results</p>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-500">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-gray-50 border-none rounded-lg text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary py-2 pl-3 pr-8 cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    <option value="relevance">Relevance</option>
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="lowest">Price: Low to High</option>
                                    <option value="highest">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20"><Loader /></div>
                        ) : error ? (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">{error}</div>
                        ) : sortedProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm p-8">
                                <FilterList className="text-6xl text-gray-200 mb-4" />
                                <h3 className="text-xl font-bold text-gray-800">No products found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                                <button onClick={() => { setPriceRange([0, 200000]); setSelectedRatings(0); }} className="mt-4 text-primary font-bold hover:underline">Clear Filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {sortedProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default ProductListing;

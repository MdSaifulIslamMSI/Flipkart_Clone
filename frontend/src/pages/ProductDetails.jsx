import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/Loader';
import MetaData from '../components/MetaData';
import { ShoppingCart, FlashOn, LocalOffer, VerifiedUser } from '@mui/icons-material';

import PaymentModal from '../components/PaymentModal';
import AIChatSupport from '../components/AIChatSupport';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { productDetails: product, loading, error } = useSelector((state) => state.products);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);

    const addToCartHandler = () => {
        dispatch(addToCart({
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
            stock: product.stock,
            quantity: 1,
        }));
        alert("Item Added to Cart");
    };

    if (loading) return <Loader />;
    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
    if (!product || !product.name) return null;

    // Static Mock Data for UI Polish
    const offers = [
        "Bank Offer 5% Cashback on Flipkart Axis Bank Card",
        "Special Price Get extra 10% off (price inclusive of discount)",
        "No Cost EMI available on selected cards"
    ];

    const highlights = [
        "1 Year Warranty",
        "7 Days Replacement Policy",
        "Cash on Delivery available",
        product.category === 'Mobiles' ? "4 GB RAM | 64 GB ROM | Expandable Upto 256 GB" : "Top quality material",
        "Plus Member exclusive benefits"
    ];

    return (
        <>
            <MetaData title={`${product.name} - Flipkart Clone`} />
            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                amount={product.price}
            />
            {/* AI Chat Support Demo */}
            <AIChatSupport product={product} />

            <div className="bg-[#f1f3f6] min-h-screen py-4">
                <div className="container mx-auto px-4 max-w-[1280px] flex flex-col md:flex-row bg-white shadow-sm rounded-sm overflow-hidden">

                    {/* Left Column: Image & Buttons */}
                    <div className="w-full md:w-[40%] p-4 flex flex-col relative border-r border-gray-100">
                        {/* Wishlist Icon (decorative) */}
                        <div className="absolute top-4 right-4 text-gray-300 cursor-pointer hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>

                        <div className="flex-1 flex items-center justify-center p-8 h-[400px] relative">
                            {(!product.images || !product.images[0] || !product.images[0].url) ? (
                                <div className="flex flex-col items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg w-full h-full">
                                    <svg className="w-16 h-16 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <span className="text-sm font-medium">No Image Available</span>
                                </div>
                            ) : (
                                <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/400?text=Product+Image+Not+Found';
                                        e.target.classList.add('opacity-50', 'grayscale');
                                    }}
                                />
                            )}
                        </div>

                        <div className="flex gap-2 mt-4 px-2">
                            <button onClick={addToCartHandler} className="flex-1 bg-[#ff9f00] text-white py-3.5 font-bold rounded-[2px] shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2 text-sm md:text-base">
                                <ShoppingCart className="text-white" /> ADD TO CART
                            </button>
                            <button
                                onClick={() => setShowPayment(true)}
                                className="flex-1 bg-[#fb641b] text-white py-3.5 font-bold rounded-[2px] shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                <FlashOn className="text-white" /> BUY NOW
                            </button>
                        </div>
                    </div>

                    {/* Right Column: details */}
                    <div className="w-full md:w-[60%] p-6 pl-8">
                        {/* Breadcrumbs (Mock) */}
                        <p className="text-xs text-gray-500 mb-2 hover:text-primary cursor-pointer">
                            Home &gt; {product.category} &gt; {product.brand?.name || product.brand || 'Generic'} &gt; {product.name}
                        </p>

                        <h1 className="text-xl font-medium text-gray-800 mb-2">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-green-700 text-white text-xs px-2 py-0.5 rounded-[3px] flex items-center gap-1 font-bold">
                                {product.ratings} <span className="text-[10px]">★</span>
                            </span>
                            <span className="text-gray-500 font-medium text-sm">{product.numOfReviews} Ratings & {Math.floor(product.numOfReviews * 0.2)} Reviews</span>
                            {product.assured && (
                                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-5" />
                            )}
                        </div>

                        {/* ... */}

                        <div className="grid grid-cols-12 p-3 text-sm">
                            <div className="col-span-4 text-gray-500">Brand</div>
                            <div className="col-span-8 text-gray-900 font-medium">{product.brand?.name || product.brand || 'Generic'}</div>
                        </div>

                        <div className="flex items-end gap-3 mb-4">
                            <h2 className="text-3xl font-bold text-gray-900">₹{product.price?.toLocaleString()}</h2>
                            <span className="text-gray-500 line-through text-sm">₹{(product.price * 1.2).toLocaleString()}</span>
                            <span className="text-green-600 font-bold text-sm">20% off</span>
                        </div>

                        {/* Offers */}
                        <div className="mb-6">
                            <h3 className="font-bold text-sm text-gray-800 mb-2">Available offers</h3>
                            <ul className="space-y-2">
                                {offers.map((offer, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                        <LocalOffer className="text-green-600 text-base mt-0.5" />
                                        <span><span className="font-medium text-gray-800">{offer.split(' ')[0]} {offer.split(' ')[1]}</span> {offer.substring(offer.indexOf(' ') + offer.split(' ')[1].length + 1)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Highlights & Description Grid relative */}
                        <div className="flex flex-col md:flex-row gap-8 mb-6">
                            {/* Highlights */}
                            <div className="flex-1">
                                <div className="flex gap-16">
                                    <span className="text-gray-500 text-sm font-medium w-24">Highlights</span>
                                    <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700 flex-1">
                                        {highlights.map((h, i) => <li key={i}>{h}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Seller Info */}
                        <div className="flex items-start gap-16 mb-8">
                            <span className="text-gray-500 text-sm font-medium w-24">Seller</span>
                            <div className="flex flex-col">
                                <span className="text-primary font-medium text-sm flex items-center gap-1">
                                    SuperComNet <span className="bg-blue-600 text-white text-[10px] px-1 rounded-full">4.9 ★</span>
                                </span>
                                <ul className="list-disc pl-4 text-xs text-gray-500 mt-1">
                                    <li>7 Days Replacement Policy?</li>
                                    <li>GST invoice available</li>
                                </ul>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="border bg-white rounded-sm mt-4">
                            <div className="p-4 border-b">
                                <h3 className="text-xl font-medium text-gray-800">Product Description</h3>
                            </div>
                            <div className="p-4 text-sm text-gray-700 leading-relaxed">
                                {product.description}
                            </div>
                        </div>

                        {/* Specifications Table (Mock) */}
                        <div className="border bg-white rounded-sm mt-4">
                            <div className="p-4 border-b">
                                <h3 className="text-xl font-medium text-gray-800">Specifications</h3>
                            </div>
                            <div className="p-4">
                                <div className="border border-gray-200">
                                    <div className="p-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">General</div>
                                    <div className="divide-y divide-gray-200">
                                        <div className="grid grid-cols-12 p-3 text-sm">
                                            <div className="col-span-4 text-gray-500">Brand</div>
                                            <div className="col-span-8 text-gray-900 font-medium">{product.brand?.name || product.brand || 'Generic'}</div>
                                        </div>
                                        <div className="grid grid-cols-12 p-3 text-sm">
                                            <div className="col-span-4 text-gray-500">Model Name</div>
                                            <div className="col-span-8 text-gray-900 font-medium">{product.name}</div>
                                        </div>
                                        <div className="grid grid-cols-12 p-3 text-sm">
                                            <div className="col-span-4 text-gray-500">Category</div>
                                            <div className="col-span-8 text-gray-900 font-medium">{product.category}</div>
                                        </div>
                                        <div className="grid grid-cols-12 p-3 text-sm">
                                            <div className="col-span-4 text-gray-500">Stock</div>
                                            <div className="col-span-8 text-gray-900 font-medium">{product.stock > 0 ? "In Stock" : "Out of Stock"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;

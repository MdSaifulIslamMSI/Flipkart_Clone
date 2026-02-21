import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSingleProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/Loader';
import MetaData from '../components/MetaData';
import { ShoppingCart, FlashOn, LocalOffer, Star, Verified, LocalShipping, Cached, Security } from '@mui/icons-material';
import PaymentModal from '../components/PaymentModal';
import AIChatSupport from '../components/AIChatSupport';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.products);
    const [showPayment, setShowPayment] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        dispatch(loadSingleProduct(id));
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
        "5% Cashback on Lumina Bank Card",
        "Get extra 10% off (price inclusive of discount)",
        "No Cost EMI available on selected cards"
    ];

    return (
        <>
            <MetaData title={`${product.name} - Lumina`} />
            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                amount={product.price}
            />
            {/* AI Chat Support Demo */}
            <AIChatSupport product={product} />

            <div className="bg-gray-50 min-h-screen py-8 font-sans">
                <div className="container mx-auto px-4 max-w-7xl">

                    {/* Breadcrumbs */}
                    <div className="text-sm text-gray-500 mb-6">
                        Home <span className="mx-2">/</span> {product.category} <span className="mx-2">/</span> <span className="text-gray-900 font-medium">{product.name}</span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">

                        {/* Left Column: Image Gallery */}
                        <div className="p-8 bg-white flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 relative">
                            <div className="w-full h-[400px] lg:h-[500px] flex items-center justify-center mb-6 relative group">
                                {product.images && product.images[selectedImage] ? (
                                    <img
                                        src={product.images[selectedImage].url}
                                        alt={product.name}
                                        className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/500x500?text=No+Image';
                                        }}
                                    />
                                ) : (
                                    <div className="text-gray-300 flex flex-col items-center">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full mb-2"></div>
                                        <span>No Image</span>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4">
                                    <button className="p-2 rounded-full bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    </button>
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-4 overflow-x-auto py-2 px-1 w-full justify-center">
                                {product.images && product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-20 h-20 border-2 rounded-lg cursor-pointer p-1 flex items-center justify-center transition-all ${selectedImage === index ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <img src={img.url} alt="" className="max-h-full max-w-full object-contain" />
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons (Mobile: Fixed Bottom, Desktop: Inline) */}
                            <div className="flex gap-4 w-full mt-8">
                                <button
                                    onClick={addToCartHandler}
                                    className="flex-1 py-4 rounded-xl font-bold text-gray-900 border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart /> ADD TO CART
                                </button>
                                <button
                                    onClick={() => setShowPayment(true)}
                                    className="flex-1 py-4 rounded-xl font-bold text-white bg-primary hover:bg-purple-700 shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <FlashOn /> BUY NOW
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="p-8 lg:p-10 bg-white flex flex-col h-full overflow-y-auto custom-scrollbar">
                            <div className="mb-1">
                                <span className="text-primary font-bold tracking-wider text-xs uppercase">{product.category}</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight font-['Poppins']">{product.name}</h1>

                            {/* Ratings & Brand */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                                    <span>{product.ratings}</span> <Star fontSize="small" />
                                </div>
                                <span className="text-gray-500 text-sm font-medium">{product.numOfReviews} Ratings</span>
                                {product.assured && (
                                    <span className="flex items-center gap-1 text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                                        <Verified fontSize="inherit" /> Lumina Verified
                                    </span>
                                )}
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <div className="flex items-end gap-3 mb-2">
                                    <h2 className="text-4xl font-bold text-gray-900">₹{product.price?.toLocaleString()}</h2>
                                    <span className="text-xl text-gray-400 line-through">₹{(product.price * 1.2).toLocaleString()}</span>
                                    <span className="text-green-600 font-bold text-lg bg-green-50 px-2 rounded">20% OFF</span>
                                </div>
                                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                            </div>

                            {/* Offers Grid */}
                            <div className="grid gap-3 mb-8">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2"><LocalOffer className="text-primary" /> Available Offers</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {offers.map((offer, i) => (
                                        <div key={i} className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-sm text-gray-700 flex items-start gap-2">
                                            <span className="text-primary font-bold">•</span>
                                            {offer}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {product.description}
                                </p>
                            </div>

                            {/* Specifications */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Specifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase font-semibold">Brand</span>
                                        <span className="font-medium text-gray-900">{product.brand?.name || product.brand || 'Generic'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase font-semibold">Model</span>
                                        <span className="font-medium text-gray-900">{product.name}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase font-semibold">Stock Status</span>
                                        <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase font-semibold">Warranty</span>
                                        <span className="font-medium text-gray-900">1 Year Manufacturer Warranty</span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 border-t pt-6 mt-auto">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                                        <Security />
                                    </div>
                                    <span className="text-xs font-medium text-gray-500">1 Year Warranty</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                                        <Cached />
                                    </div>
                                    <span className="text-xs font-medium text-gray-500">7 Day Replacement</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                                        <LocalShipping />
                                    </div>
                                    <span className="text-xs font-medium text-gray-500">Fast Delivery</span>
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

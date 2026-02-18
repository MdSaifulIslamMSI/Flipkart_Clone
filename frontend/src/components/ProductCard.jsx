import React from 'react';
import { Link } from 'react-router-dom';
import { Star, FavoriteBorder, ShoppingCartOutlined } from '@mui/icons-material';

const ProductCard = ({ product }) => {
    return (
        <Link
            to={`/product/${product._id}`}
            className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-purple-100 transition-all duration-300 relative"
        >
            {/* Image Container */}
            <div className="relative h-64 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
                {(!product.images || !product.images[0] || !product.images[0].url) ? (
                    <div className="text-gray-300 flex flex-col items-center">
                        <span className="text-xs">No Image</span>
                    </div>
                ) : (
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/200x200?text=Lumina';
                        }}
                    />
                )}

                {/* Floating Action Buttons (Mock) */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                    <button className="bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors">
                        <FavoriteBorder fontSize="small" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-primary transition-colors">
                        <ShoppingCartOutlined fontSize="small" />
                    </button>
                </div>

                {/* Badges */}
                {product.ratings >= 4 && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-md text-primary shadow-sm">
                        Top Rated
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Brand / Category (Optional) */}
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">{product.category}</p>

                <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>

                {/* Rating - Modern Style */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-500">
                        <Star fontSize="inherit" className="text-[16px]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{product.ratings}</span>
                    <span className="text-xs text-gray-400 mx-1">•</span>
                    <span className="text-xs text-gray-400">{product.numOfReviews} reviews</span>
                </div>

                <div className="flex items-center justify-between mt-4 border-t border-dashed border-gray-100 pt-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through">₹{Math.round(product.price * 1.2).toLocaleString()}</span>
                        <span className="font-bold text-xl text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="bg-purple-50 text-primary text-xs font-bold px-2 py-1 rounded-lg">
                        -20%
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default React.memo(ProductCard);

import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link className="flex flex-col bg-white rounded-sm border border-gray-100 p-4 w-full h-full text-inherit no-underline hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative" to={`/product/${product._id}`}>
            <div className="h-48 w-full flex justify-center items-center mb-4 relative overflow-hidden bg-white">
                {(!product.images || !product.images[0] || !product.images[0].url) ? (
                    <div className="flex flex-col items-center justify-center text-gray-400 w-full h-full bg-gray-50">
                        <svg className="w-12 h-12 mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span className="text-[10px] font-medium">No Image</span>
                    </div>
                ) : (
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/200?text=No+Image';
                            e.target.classList.add('opacity-50', 'grayscale');
                        }}
                    />
                )}
            </div>

            <div className="flex flex-col gap-1.5 flex-grow">
                <h3 className="font-medium text-gray-800 text-sm line-clamp-2 h-10 group-hover:text-primary transition-colors leading-tight" title={product.name}>{product.name}</h3>

                <div className="flex items-center gap-2">
                    <div className="bg-green-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        {product.ratings} <span>★</span>
                    </div>
                    <span className="text-gray-500 text-xs font-medium">({product.numOfReviews.toLocaleString()})</span>
                </div>

                <div className="flex items-center gap-3 mt-1">
                    <span className="font-bold text-lg text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    {/* Mock Discount visual */}
                    <span className="text-xs text-gray-500 line-through">₹{(product.price * 1.2).toFixed(0)}</span>
                    <span className="text-xs text-green-600 font-bold">20% off</span>
                </div>
            </div>
        </Link>
    );
};

export default React.memo(ProductCard);

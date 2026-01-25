import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import MetaData from '../components/MetaData';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.user);

    const removeItemHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if (isAuthenticated) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=shipping');
        }
    };

    return (
        <>
            <MetaData title="Shopping Cart - Flipkart" />
            <div className="min-h-screen bg-[#f1f3f6] py-8">
                <div className="container mx-auto px-4 max-w-[1280px]">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Cart Items (Approx 70%) */}
                        <div className="flex-1 w-full md:w-[70%] bg-white shadow-sm rounded-sm">
                            <div className="p-4 border-b border-gray-100">
                                <h2 className="font-medium text-lg">My Cart ({cartItems.length})</h2>
                            </div>

                            {cartItems.length === 0 ? (
                                <div className="p-8 text-center flex flex-col items-center">
                                    <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="w-48 mb-4 opacity-80" />
                                    <p className="text-lg font-medium text-gray-800">Your cart is empty!</p>
                                    <p className="text-sm text-gray-500 mb-4">Add items to it now.</p>
                                    <Link to="/" className="bg-[#2874f0] text-white font-medium py-2 px-10 rounded-sm shadow-md hover:shadow-lg transition-shadow">Shop Now</Link>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.product} className="p-6 border-b border-gray-100 flex gap-6">
                                        <div className="w-24 h-24 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 mt-4 ml-1">
                                                <button
                                                    className={`w-7 h-7 rounded-full border flex items-center justify-center font-medium ${item.quantity <= 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-800 hover:bg-gray-50'}`}
                                                    onClick={() => {
                                                        const newQty = item.quantity - 1;
                                                        if (item.quantity > 1) {
                                                            dispatch({ type: 'cart/addToCart', payload: { ...item, quantity: newQty } });
                                                        }
                                                    }}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <div className="w-10 h-7 flex items-center justify-center border border-gray-200 text-sm font-medium bg-white">
                                                    {item.quantity}
                                                </div>
                                                <button
                                                    className="w-7 h-7 rounded-full border border-gray-300 text-gray-800 flex items-center justify-center font-medium hover:bg-gray-50"
                                                    onClick={() => {
                                                        const newQty = item.quantity + 1;
                                                        if (item.stock && newQty > item.stock) return; // Simple stock check if available
                                                        dispatch({ type: 'cart/addToCart', payload: { ...item, quantity: newQty } });
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex-1 ml-4">
                                            <Link to={`/product/${item.product}`} className="font-medium hover:text-primary mb-1 block line-clamp-1 text-base">{item.name}</Link>
                                            <span className="text-xs text-gray-500 block mb-3">Seller: RetailNet</span>
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-gray-500 line-through text-sm">₹{Math.round(item.price * 1.2 * item.quantity).toLocaleString('en-IN')}</span>
                                                <span className="font-bold text-lg text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                                <span className="text-green-600 text-sm font-bold">20% Off</span>
                                            </div>
                                            <button
                                                onClick={() => removeItemHandler(item.product)}
                                                className="font-bold text-gray-800 hover:text-primary text-sm uppercase transition-colors"
                                            >
                                                REMOVE
                                            </button>
                                            <div className="mt-2 text-xs text-gray-400">
                                                {item.stock > 0 ? `In Stock` : 'Out of Stock'}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            {cartItems.length > 0 && (
                                <div className="p-4 flex justify-end sticky bottom-0 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10">
                                    <button onClick={checkoutHandler} className="bg-[#fb641b] text-white py-3.5 px-16 font-bold rounded-sm uppercase shadow-sm hover:shadow-lg transition-all">
                                        Place Order
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Price Details Sidebar (Approx 30%) */}
                        {cartItems.length > 0 && (
                            <div className="w-full md:w-[30%] h-fit bg-white shadow-sm rounded-sm sticky top-20">
                                <div className="p-4 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-500 uppercase text-sm">Price Details</h3>
                                </div>
                                <div className="p-4 flex flex-col gap-5 text-sm">
                                    <div className="flex justify-between">
                                        <span>Price ({cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} items)</span>
                                        <span>₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Discount</span>
                                        <span className="text-green-600">− ₹{(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0) * 0.2).toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Charges</span>
                                        <span className="text-green-600">FREE</span>
                                    </div>
                                    <div className="border-t border-dashed border-gray-200 my-1"></div>
                                    <div className="flex justify-between font-bold text-lg text-gray-900">
                                        <span>Total Amount</span>
                                        <span>₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="border-t border-dashed border-gray-200 my-1"></div>
                                    <p className="text-green-600 font-bold text-sm">You will save ₹0 on this order</p>
                                </div>
                                <div className="p-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    Safe and Secure Payments. 100% Authentic products.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;

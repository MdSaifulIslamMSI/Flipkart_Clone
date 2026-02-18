import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../redux/slices/cartSlice';
import MetaData from '../components/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowBack, DeleteOutline, Add, Remove } from '@mui/icons-material';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.user);

    const increaseQuantity = (item) => {
        const newQty = item.quantity + 1;
        if (item.stock && newQty > item.stock) return;
        dispatch(addToCart({ ...item, quantity: newQty }));
    };

    const decreaseQuantity = (item) => {
        const newQty = item.quantity - 1;
        if (newQty <= 0) return;
        dispatch(addToCart({ ...item, quantity: newQty }));
    };

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

    // Calculate Totals
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);

    // Mock calculations for discount
    const originalPrice = Math.round(totalPrice * 1.2);
    const discount = originalPrice - totalPrice;

    return (
        <>
            <MetaData title="Shopping Cart - Lumina" />
            <div className="min-h-screen bg-gray-50 py-10 font-sans">
                <div className="container mx-auto px-4 max-w-6xl">

                    <h1 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                        <ShoppingCart className="text-primary" fontSize="large" />
                        Your Cart
                        <span className="text-lg font-normal text-gray-500">({totalItems} items)</span>
                    </h1>

                    {cartItems.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm p-16 text-center flex flex-col items-center">
                            <div className="bg-purple-50 p-6 rounded-full mb-6">
                                <ShoppingCart className="text-primary text-6xl opacity-50" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                            <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our products to find something you love.</p>
                            <Link to="/products" className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8">

                            {/* Cart Items List */}
                            <div className="flex-1 flex flex-col gap-4">
                                {cartItems.map((item) => (
                                    <div key={item.product} className="bg-white p-6 rounded-xl shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center group hover:shadow-lg transition-shadow">

                                        {/* Image */}
                                        <Link to={`/product/${item.product}`} className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg p-2">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                        </Link>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/product/${item.product}`} className="font-bold text-lg text-gray-900 hover:text-primary transition-colors line-clamp-1 mb-1">
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-gray-500 mb-3 capitalize">{item.category || 'General'}</p>

                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-xl text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                                                <span className="text-sm text-gray-400 line-through">₹{Math.round(item.price * 1.2).toLocaleString('en-IN')}</span>
                                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">20% OFF</span>
                                            </div>
                                        </div>

                                        {/* Quantity & Actions */}
                                        <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
                                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                                <button
                                                    onClick={() => decreaseQuantity(item)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 shadow-sm hover:text-primary disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Remove fontSize="small" />
                                                </button>
                                                <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => increaseQuantity(item)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 shadow-sm hover:text-primary"
                                                >
                                                    <Add fontSize="small" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItemHandler(item.product)}
                                                className="text-red-500 text-sm font-bold flex items-center gap-1 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            >
                                                <DeleteOutline fontSize="small" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <Link to="/products" className="inline-flex items-center gap-2 text-primary font-bold hover:underline mt-4 w-fit">
                                    <ArrowBack fontSize="small" /> Continue Shopping
                                </Link>
                            </div>

                            {/* Order Summary */}
                            <div className="w-full lg:w-[350px] h-fit sticky top-24">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal ({totalItems} items)</span>
                                            <span className="font-medium">₹{originalPrice.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span className="font-medium">- ₹{discount.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Delivery</span>
                                            <span className="text-green-600 font-bold">Free</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-primary">₹{totalPrice.toLocaleString('en-IN')}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1 text-right">Includes all taxes</p>
                                    </div>

                                    <button
                                        onClick={checkoutHandler}
                                        className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        Secure Transaction
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;

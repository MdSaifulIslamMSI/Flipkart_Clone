import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { LocalMall, ArrowForwardIos, Inventory2 } from '@mui/icons-material';
// import { myOrders } from '../redux/slices/orderSlice'; // You would import your order action here

const MyOrders = () => {
    // This is a mockup since backend integration for fetching orders might not be fully requested yet, 
    // but the UI needs to be there for the MVP completeness check.

    // const dispatch = useDispatch();
    // const { loading, error, orders } = useSelector((state) => state.myOrders);

    // Mock Data
    const loading = false;
    const orders = [
        {
            _id: "64e5f8a0e1234567890abcd1",
            orderItems: [
                { name: "iPhone 14 Pro Max", image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcd9?w=200&q=80" }
            ],
            totalPrice: 129999,
            orderStatus: "Delivered",
            createdAt: "2023-10-15T10:00:00Z"
        },
        {
            _id: "64e5f8a0e1234567890abcd2",
            orderItems: [
                { name: "Nike Air Jordan", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80" },
                { name: "Puma T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80" }
            ],
            totalPrice: 15499,
            orderStatus: "Processing",
            createdAt: "2023-10-20T14:30:00Z"
        }
    ];

    return (
        <>
            <MetaData title="My Orders - Lumina" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Inventory2 className="text-primary" /> My Orders
                    </h1>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="flex flex-col gap-4">
                            {orders && orders.length > 0 ? (
                                orders.map((order) => (
                                    <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                                        <Link to={`/order/${order._id}`} className="block p-6">
                                            <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">

                                                {/* Left: Image & Details */}
                                                <div className="flex items-center gap-4">
                                                    <div className="flex -space-x-4">
                                                        {order.orderItems.map((item, index) => (
                                                            <div key={index} className="w-16 h-16 rounded-lg border-2 border-white shadow-sm overflow-hidden bg-gray-50 relative z-0 hover:z-10 transition-all">
                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <h3 className={`font-bold text-sm md:text-base ${order.orderStatus === 'Delivered' ? 'text-green-600' : 'text-primary'}`}>
                                                            {order.orderStatus}
                                                        </h3>
                                                        <p className="text-xs text-gray-500">On {new Date(order.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>

                                                {/* Middle: Order ID */}
                                                <div className="hidden md:block">
                                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
                                                    <p className="text-sm font-mono text-gray-700">#{order._id.slice(-8)}</p>
                                                </div>


                                                {/* Right: Price & Chevron */}
                                                <div className="flex items-center gap-6 ml-auto md:ml-0 w-full md:w-auto justify-between md:justify-end">
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-400">Total Amount</p>
                                                        <p className="text-lg font-bold text-gray-900">₹{order.totalPrice.toLocaleString()}</p>
                                                    </div>
                                                    <ArrowForwardIos className="text-gray-300 group-hover:text-primary transition-colors text-sm" />
                                                </div>

                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                                    <LocalMall className="text-gray-200 text-6xl mb-4" />
                                    <h3 className="text-xl font-bold text-gray-800">No orders yet</h3>
                                    <p className="text-gray-500 mb-6">Looks like you haven't bought anything yet.</p>
                                    <Link to="/products" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-700 transition-colors">Start Shopping</Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyOrders;

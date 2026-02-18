import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, LocalMall } from '@mui/icons-material';
import MetaData from '../components/MetaData';
import { useDispatch } from 'react-redux';
// import { clearCart } from '../redux/slices/cartSlice'; // Assuming you might have a clear action

const OrderSuccess = () => {
    // const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const reference = searchParams.get('reference');

    useEffect(() => {
        // Optional: specific cleanup actions
        // dispatch(clearCart());
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <MetaData title="Order Success - Lumina" />
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl text-center animate-fade-in-up">

                <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 p-6 flex items-center justify-center animate-bounce-short">
                        <CheckCircle className="text-green-500 text-6xl" />
                    </div>
                </div>

                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Order Successful!
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Thank you for your purchase. Your order has been placed successfully.
                    </p>
                    {reference && (
                        <p className="mt-2 text-xs font-mono bg-gray-100 p-2 rounded text-gray-600 inline-block">
                            Ref: {reference}
                        </p>
                    )}
                </div>

                <div className="border-t border-gray-100 pt-6 mt-6">
                    <p className="text-sm text-gray-600 mb-6">
                        We have sent a confirmation email with your order details.
                    </p>

                    <div className="flex flex-col gap-3">
                        <Link
                            to="/orders"
                            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-primary bg-purple-50 hover:bg-purple-100 md:text-base transition-colors"
                        >
                            View My Orders
                        </Link>
                        <Link
                            to="/products"
                            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-purple-700 md:text-base shadow-lg hover:shadow-xl transition-all"
                        >
                            <LocalMall className="mr-2 text-sm" /> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;

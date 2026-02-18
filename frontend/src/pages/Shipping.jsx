import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../components/MetaData';
import PaymentModal from '../components/PaymentModal';
import { LocalShipping, LocationOn } from '@mui/icons-material';

const Shipping = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const [showPayment, setShowPayment] = useState(false);

    // Mock state for address
    const [address, setAddress] = useState({
        address: '123, Demo Street',
        city: 'Mumbai',
        pincode: '400001',
        phone: '9876543210',
        state: 'Maharashtra'
    });

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

    const submitHandler = (e) => {
        e.preventDefault();
        // Just open payment modal for demo
        setShowPayment(true);
    };

    return (
        <>
            <MetaData title="Shipping - Lumina" />
            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                amount={totalAmount}
            />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <LocalShipping className="text-primary" /> Shipping Details
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Left Side (Form) */}
                        <div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="bg-purple-100 p-2 rounded-full text-primary">
                                    <LocationOn />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Delivery Address</h2>
                            </div>

                            <form onSubmit={submitHandler} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-gray-600">Full Name</label>
                                        <input
                                            type="text"
                                            value={user?.name || ''}
                                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-primary focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-gray-600">Phone Number</label>
                                        <input
                                            type="text"
                                            placeholder="10-digit mobile number"
                                            value={address.phone}
                                            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-primary focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-600">Address (Area and Street)</label>
                                    <textarea
                                        rows="3"
                                        placeholder="Enter your full address"
                                        value={address.address}
                                        onChange={(e) => setAddress({ ...address, address: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-primary focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                                        required
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-gray-600">City</label>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={address.city}
                                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-primary focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-gray-600">Pincode</label>
                                        <input
                                            type="text"
                                            placeholder="Pincode"
                                            value={address.pincode}
                                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-primary focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-gray-600">State</label>
                                        <input
                                            type="text"
                                            placeholder="State"
                                            value={address.state}
                                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-primary focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-primary/30 hover:bg-purple-700 transition-all uppercase w-full mt-2"
                                >
                                    Proceed to Payment
                                </button>
                            </form>
                        </div>

                        {/* Right Side (Order Summary) */}
                        <div className="w-full lg:w-[350px] h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-gray-800 text-lg mb-6 pb-4 border-b border-gray-100">Order Summary</h3>

                            <div className="flex flex-col gap-4 text-sm text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Price ({cartItems.length} items)</span>
                                    <span className="font-medium text-gray-900">₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600 font-bold">FREE</span>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-gray-200 my-4 pt-4">
                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total Payable</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-right">Inclusive of all taxes</p>
                            </div>

                            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-xs font-bold text-center border border-green-100">
                                You will save ₹{(totalAmount * 0.1).toLocaleString()} on this order
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Shipping;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../components/MetaData';
import PaymentModal from '../components/PaymentModal';

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
            <MetaData title="Shipping - Flipkart Clone" />
            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                amount={totalAmount}
            />

            <div className="min-h-screen bg-[#f1f3f6] py-8">
                <div className="container mx-auto px-4 max-w-[1280px]">

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Left Side (70%) */}
                        <div className="flex-1 w-full md:w-[70%]">

                            {/* Stepper (Mock) - Aligned with the form */}
                            <div className="flex justify-between items-center bg-white p-4 shadow-sm rounded-sm mb-4 text-sm font-medium text-gray-500">
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="bg-primary text-white w-6 h-6 flex items-center justify-center rounded-xs text-xs">1</span>
                                    Login
                                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="bg-primary text-white w-6 h-6 flex items-center justify-center rounded-xs text-xs">2</span>
                                    Shipping
                                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-gray-200 text-gray-600 w-6 h-6 flex items-center justify-center rounded-xs text-xs">3</span>
                                    Payment
                                </div>
                            </div>

                            {/* Address Form */}
                            <div className="bg-white p-6 shadow-sm rounded-sm">
                                <h2 className="bg-primary text-white p-4 font-medium text-sm mb-6 uppercase tracking-wide">Delivery Address</h2>

                                <form onSubmit={submitHandler} className="flex flex-col gap-4 px-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={user?.name || ''}
                                                className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:border-primary focus:outline-none focus:shadow-sm transition-all"
                                                readOnly
                                            />
                                            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">Name</label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="10-digit mobile number"
                                                value={address.phone}
                                                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                                                className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:border-primary focus:outline-none focus:shadow-sm transition-all"
                                                required
                                            />
                                            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">Phone</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Pincode"
                                                value={address.pincode}
                                                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                                className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:border-primary focus:outline-none focus:shadow-sm transition-all"
                                                required
                                            />
                                            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">Pincode</label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Locality"
                                                className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:border-primary focus:outline-none focus:shadow-sm transition-all"
                                                defaultValue="Hyde Park"
                                            />
                                            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">Locality</label>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            rows="3"
                                            placeholder="Address (Area and Street)"
                                            value={address.address}
                                            onChange={(e) => setAddress({ ...address, address: e.target.value })}
                                            className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:border-primary focus:outline-none focus:shadow-sm transition-all"
                                            required
                                        ></textarea>
                                        <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">Address (Area and Street)</label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="City/District/Town"
                                                value={address.city}
                                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                                className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:border-primary focus:outline-none focus:shadow-sm transition-all"
                                                required
                                            />
                                            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">City/District/Town</label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="State"
                                                value={address.state}
                                                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                                className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:border-primary focus:outline-none focus:shadow-sm transition-all"
                                                required
                                            />
                                            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">State</label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-[#fb641b] text-white font-bold py-4 px-8 rounded-sm shadow-sm hover:shadow-md transition-shadow uppercase w-full sm:w-1/2 mt-4"
                                    >
                                        Save and Deliver Here
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Side (30%) - Price Details */}
                        <div className="w-full md:w-[30%] h-fit bg-white shadow-sm rounded-sm sticky top-20">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-500 uppercase text-sm">Price Details</h3>
                            </div>
                            <div className="p-4 flex flex-col gap-5 text-sm border-b border-gray-100">
                                <div className="flex justify-between">
                                    <span>Price ({cartItems.length} items)</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="border-t border-dashed border-gray-200 my-1"></div>
                                <div className="flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total Payable</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="p-4 flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Shipping;

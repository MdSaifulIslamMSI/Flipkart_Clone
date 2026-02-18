import React, { useState, useEffect } from 'react';
import { Close, CheckCircle, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PaymentModal = ({ isOpen, onClose, amount }) => {
    const [step, setStep] = useState('initial'); // initial, processing, success
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setStep('initial');
        }
    }, [isOpen]);

    const handlePay = () => {
        setStep('processing');

        // Simulate processing delay
        setTimeout(() => {
            setStep('success');
        }, 3000);
    };

    const handleClose = () => {
        onClose();
        if (step === 'success') {
            navigate('/order/success?reference=' + Math.floor(Math.random() * 10000000));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl overflow-hidden animate-fade-in-up relative">

                {/* Header (GPay style) */}
                <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-1 rounded-sm">
                            <span className="font-bold text-blue-600 text-xs">GPay</span>
                        </div>
                        <h3 className="text-white font-medium">Google Pay</h3>
                    </div>
                    <button onClick={handleClose} className="text-white/80 hover:text-white">
                        <Close />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">

                    {step === 'initial' && (
                        <>
                            <div className="bg-gray-100 p-4 rounded-full mb-4">
                                <img src="https://cdn-icons-png.flaticon.com/512/2175/2175193.png" alt="Merchant" className="w-12 h-12 opacity-80" />
                            </div>

                            <h4 className="text-gray-500 font-medium mb-1">Paying to</h4>
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Lumina Merchant</h2>

                            <h1 className="text-4xl font-bold text-gray-900 mb-8">₹{amount?.toLocaleString()}</h1>

                            <div className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xs">
                                    SBI
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500">State Bank of India **** 8890</p>
                                </div>
                                <Lock className="text-gray-400 text-xs" />
                            </div>

                            <button
                                onClick={handlePay}
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 shadow-lg transition-transform active:scale-95"
                            >
                                Pay Now
                            </button>
                        </>
                    )}

                    {step === 'processing' && (
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                            <h3 className="text-lg font-bold text-gray-800 animate-pulse">Processing Payment...</h3>
                            <p className="text-sm text-gray-500 mt-2">Please do not close this window</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="flex flex-col items-center animate-scale-in">
                            <CheckCircle className="text-green-500 text-6xl mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                            <p className="text-gray-500 text-sm mb-6">Transaction ID: TXN{Math.floor(Math.random() * 10000000)}</p>

                            <button
                                onClick={handleClose}
                                className="bg-gray-800 text-white px-8 py-2 rounded-full font-medium hover:bg-gray-900"
                            >
                                Go to Home
                            </button>
                        </div>
                    )}

                </div>

                {/* Footer Disclaimer */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                        <Lock className="inline-block w-3 h-3 mr-1" />
                        This is a secure demo simulation
                    </p>
                </div>

            </div>
        </div>
    );
};

export default PaymentModal;

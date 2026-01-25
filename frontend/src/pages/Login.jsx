import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../redux/slices/userSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector((state) => state.user);

    // Get redirect path (e.g., from query string)
    // Example: /login?redirect=/shipping
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (error) {
            // In a real app, show a toast here
            // dispatch(clearErrors()); // Clear after showing
        }

        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, isAuthenticated, navigate, redirect]);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <>
            <MetaData title="Login - Flipkart" />
            <div className="bg-[#f1f3f6] min-h-screen flex items-center justify-center py-10">
                <div className="bg-white flex flex-col md:flex-row w-full max-w-4xl h-[500px] shadow-lg rounded-sm overflow-hidden animate-fade-in-up">

                    {/* Left Side Info */}
                    <div className="bg-primary text-white p-10 w-full md:w-2/5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-medium mb-4">Login</h2>
                            <p className="text-gray-200 text-lg leading-relaxed">Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="mt-10">
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="login-img" className="w-full" />
                        </div>
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full md:w-3/5 p-10 flex flex-col justify-center relative">

                        {/* Demo Label */}
                        <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded border border-yellow-200">
                            DEMO MODE: Do not use real passwords
                        </div>

                        <form onSubmit={loginSubmit} className="flex flex-col gap-6">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter Email/Mobile number"
                                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-primary text-sm transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-primary text-sm transition-colors"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <p className="text-gray-500 text-xs">By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>

                            {error && <span className="text-red-500 text-xs text-center">{error}</span>}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`bg-[#fb641b] text-white font-medium py-3 rounded-sm shadow-md hover:shadow-lg transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="text-center mt-4">
                                <Link to="/register" className="text-primary font-medium text-sm hover:underline">New to Flipkart? Create an account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

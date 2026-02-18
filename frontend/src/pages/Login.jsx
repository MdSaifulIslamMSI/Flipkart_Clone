import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../redux/slices/userSlice';
import MetaData from '../components/MetaData';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector((state) => state.user);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
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
            <MetaData title="Login - Lumina" />
            <div className="bg-[#f1f3f6] min-h-screen flex items-center justify-center py-10 px-4">
                <div className="bg-white w-full max-w-md shadow-xl rounded-xl overflow-hidden animate-fade-in-up">

                    {/* Header */}
                    <div className="bg-primary p-8 text-center text-white">
                        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                        <p className="opacity-90">Login to access your account</p>
                    </div>

                    <div className="p-8">
                        {/* Demo Warning */}
                        <div className="bg-yellow-50 text-yellow-800 text-xs font-bold px-3 py-2 rounded border border-yellow-200 mb-6 text-center">
                            DEMO MODE: Do not use real passwords
                        </div>

                        <form onSubmit={loginSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center border border-red-100">{error}</div>}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`bg-primary text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="text-center mt-4 text-sm text-gray-600">
                                New to Lumina? <Link to="/register" className="text-primary font-bold hover:underline">Create an account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

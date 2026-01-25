import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../components/MetaData';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated && user?.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (isAuthenticated && user?.role !== 'admin') {
            // If logged in as normal user, maybe redirect or show error
            alert("Access Denied: You are not an admin");
            // Optional: logout logic or redirect home
            navigate('/');
        }
    }, [dispatch, isAuthenticated, user, navigate]);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <>
            <MetaData title="Admin Login - Flipkart" />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">

                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-widest mb-1">Admin Panel</h1>
                        <p className="text-xs text-gray-500">Restricted Access</p>
                    </div>

                    <form onSubmit={loginSubmit} className="flex flex-col gap-6">
                        <div className="relative">
                            <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Username / Email</label>
                            <input
                                type="text"
                                placeholder="demo_admin"
                                className="w-full border border-gray-300 p-3 rounded-sm focus:border-blue-500 focus:outline-none text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full border border-gray-300 p-3 rounded-sm focus:border-blue-500 focus:outline-none text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center border border-red-200">{error}</div>}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-gray-800 text-white font-bold py-3 rounded hover:bg-gray-900 transition-colors uppercase tracking-wide text-sm ${loading ? 'opacity-70' : ''}`}
                        >
                            {loading ? 'Authenticating...' : 'Explore Admin'}
                        </button>

                        <div className="text-center mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100">
                            <strong>Demo Credentials:</strong><br />
                            Email: admin@flipkart.com<br />
                            Password: admin123
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;

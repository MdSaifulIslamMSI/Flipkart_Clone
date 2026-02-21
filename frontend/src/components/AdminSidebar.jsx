// Admin sidebar — shared navigation component used across all
// admin pages (Dashboard, Products, Orders, Users).

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { Dashboard, ShoppingBag, People, ListAlt, ExitToApp } from '@mui/icons-material';

const NavItem = ({ to, icon, label, isActive }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${isActive
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
    >
        {icon}
        {label}
    </Link>
);

const AdminSidebar = ({ activePage = 'dashboard' }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSignOut = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    return (
        <div className="w-64 bg-white shadow-md fixed h-full hidden md:flex flex-col z-10">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                    LUMINA <span className="text-purple-600">ADMIN</span>
                </h1>
            </div>

            <nav className="flex-1 py-4">
                <NavItem to="/admin/dashboard" icon={<Dashboard />} label="Dashboard" isActive={activePage === 'dashboard'} />
                <NavItem to="/admin/products" icon={<ShoppingBag />} label="Products" isActive={activePage === 'products'} />
                <NavItem to="/admin/orders" icon={<ListAlt />} label="Orders" isActive={activePage === 'orders'} />
                <NavItem to="/admin/users" icon={<People />} label="Users" isActive={activePage === 'users'} />
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={onSignOut}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full rounded transition-colors font-medium"
                >
                    <ExitToApp /> Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;

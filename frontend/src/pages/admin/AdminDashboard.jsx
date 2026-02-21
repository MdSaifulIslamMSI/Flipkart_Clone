// Admin dashboard — overview page showing key metrics,
// recent orders, and navigation to other admin sections.

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../../components/MetaData';
import AdminSidebar from '../../components/AdminSidebar';
import { ShoppingBag, People, ListAlt, Home } from '@mui/icons-material';

// Summary card for a single metric (products, orders, users)
const MetricCard = ({ label, count, accentColor, icon }) => (
    <div className={`bg-white p-6 rounded shadow-sm border-l-4 ${accentColor} flex items-center justify-between`}>
        <div>
            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">{label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
        </div>
        <div className="p-3 rounded-full bg-gray-50">
            {icon}
        </div>
    </div>
);

// Placeholder recent orders for the demo
const SAMPLE_ORDERS = [
    { id: '#OD1234567890', customer: 'John Doe', total: 12999, status: 'Delivered', date: 'Oct 12, 2023' },
    { id: '#OD1234567891', customer: 'Jane Smith', total: 499, status: 'Shipped', date: 'Oct 14, 2023' },
    { id: '#OD1234567892', customer: 'Mike Ross', total: 54000, status: 'Processing', date: 'Oct 15, 2023' },
    { id: '#OD1234567893', customer: 'Rachel Green', total: 2499, status: 'Delivered', date: 'Oct 10, 2023' },
];

// Maps order status to badge styling
const statusStyles = {
    Delivered: 'bg-green-100 text-green-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Processing: 'bg-yellow-100 text-yellow-700',
};

const AdminDashboard = () => {
    const { user } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.products);

    return (
        <>
            <MetaData title="Dashboard - Admin Panel" />
            <div className="flex min-h-screen bg-gray-100">
                {/* Shared sidebar navigation */}
                <AdminSidebar activePage="dashboard" />

                {/* Main content area */}
                <div className="flex-1 md:ml-64 p-8">
                    {/* Page header with greeting */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}</h2>
                            <p className="text-gray-500 text-sm">Here's what's happening today.</p>
                        </div>
                        <Link to="/" className="flex items-center gap-2 bg-white px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-gray-50 text-gray-700">
                            <Home className="text-blue-500 text-sm" /> View Shop
                        </Link>
                    </div>

                    {/* Key metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <MetricCard label="Total Products" count={products?.length || 20} accentColor="border-blue-500" icon={<ShoppingBag className="text-blue-500" />} />
                        <MetricCard label="Total Orders" count="1,254" accentColor="border-green-500" icon={<ListAlt className="text-green-500" />} />
                        <MetricCard label="Total Users" count="8,432" accentColor="border-orange-500" icon={<People className="text-orange-500" />} />
                    </div>

                    {/* Recent orders table */}
                    <div className="bg-white rounded shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Recent Orders</h3>
                            <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                                        <th className="p-4 font-medium">Order ID</th>
                                        <th className="p-4 font-medium">Customer</th>
                                        <th className="p-4 font-medium">Date</th>
                                        <th className="p-4 font-medium">Amount</th>
                                        <th className="p-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {SAMPLE_ORDERS.map((order) => (
                                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-blue-600">{order.id}</td>
                                            <td className="p-4 text-gray-700">{order.customer}</td>
                                            <td className="p-4 text-gray-500">{order.date}</td>
                                            <td className="p-4 font-medium">₹{order.total.toLocaleString()}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusStyles[order.status] || ''}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../../components/MetaData';
import { logout } from '../../redux/slices/userSlice';
import { Dashboard, ShoppingBag, People, ListAlt, ExitToApp, Home } from '@mui/icons-material';

const SidebarLink = ({ to, icon, text, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${active ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
    >
        {icon}
        {text}
    </Link>
);

const StatCard = ({ title, value, color, icon }) => (
    <div className={`bg-white p-6 rounded shadow-sm border-l-4 ${color} flex items-center justify-between`}>
        <div>
            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-full bg-opacity-10 ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
            {React.cloneElement(icon, { className: userColorMap[color] || "text-gray-600" })}
        </div>
    </div>
);

const userColorMap = {
    'border-blue-500': 'text-blue-500',
    'border-green-500': 'text-green-500',
    'border-orange-500': 'text-orange-500',
};

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const { products } = useSelector(state => state.products); // assuming products are loaded in state from Home

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    // Mock recent orders
    const recentOrders = [
        { id: '#OD1234567890', user: 'John Doe', amount: 12999, status: 'Delivered', date: 'Oct 12, 2023' },
        { id: '#OD1234567891', user: 'Jane Smith', amount: 499, status: 'Shipped', date: 'Oct 14, 2023' },
        { id: '#OD1234567892', user: 'Mike Ross', amount: 54000, status: 'Processing', date: 'Oct 15, 2023' },
        { id: '#OD1234567893', user: 'Rachel Green', amount: 2499, status: 'Delivered', date: 'Oct 10, 2023' },
    ];

    return (
        <>
            <MetaData title="Dashboard - Admin Panel" />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-md fixed h-full hidden md:flex flex-col z-10">
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-xl font-bold text-gray-800 tracking-wide">LUMINA <span className="text-purple-600">ADMIN</span></h1>
                    </div>

                    <nav className="flex-1 py-4">
                        <SidebarLink to="/admin/dashboard" icon={<Dashboard />} text="Dashboard" active />
                        <SidebarLink to="/admin/products" icon={<ShoppingBag />} text="Products" />
                        <SidebarLink to="/admin/orders" icon={<ListAlt />} text="Orders" />
                        <SidebarLink to="/admin/users" icon={<People />} text="Users" />
                    </nav>

                    <div className="p-4 border-t border-gray-100">
                        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full rounded transition-colors font-medium">
                            <ExitToApp /> Logout
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 md:ml-64 p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}</h2>
                            <p className="text-gray-500 text-sm">Here's what's happening today.</p>
                        </div>
                        <Link to="/" className="flex items-center gap-2 bg-white px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-gray-50 text-gray-700">
                            <Home className="text-blue-500 text-sm" /> View Shop
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            title="Total Products"
                            value={products?.length || 20}
                            color="border-blue-500"
                            icon={<ShoppingBag />}
                        />
                        <StatCard
                            title="Total Orders"
                            value="1,254"
                            color="border-green-500"
                            icon={<ListAlt />}
                        />
                        <StatCard
                            title="Total Users"
                            value="8,432"
                            color="border-orange-500"
                            icon={<People />}
                        />
                    </div>

                    {/* Recent Orders Mock */}
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
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-blue-600">{order.id}</td>
                                            <td className="p-4 text-gray-700">{order.user}</td>
                                            <td className="p-4 text-gray-500">{order.date}</td>
                                            <td className="p-4 font-medium">₹{order.amount.toLocaleString()}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
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

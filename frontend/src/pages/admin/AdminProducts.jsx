import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../../components/MetaData';
import { logout } from '../../redux/slices/userSlice';
// Ideally, we'd have a deleteProduct action
// import { deleteProduct } from '../../redux/slices/productSlice'; 
import { Dashboard, ShoppingBag, People, ListAlt, ExitToApp, Edit, Delete } from '@mui/icons-material';

const SidebarLink = ({ to, icon, text, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${active ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
    >
        {icon}
        {text}
    </Link>
);

const AdminProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector(state => state.products);

    // Local state to simulate deletion since we don't have a real backend delete yet for mock data
    const [localProducts, setLocalProducts] = useState(products || []);

    useEffect(() => {
        setLocalProducts(products);
    }, [products]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product? (Demo Action)')) {
            setLocalProducts(localProducts.filter(p => p._id !== id));
            // In real app: dispatch(deleteProduct(id));
        }
    };

    return (
        <>
            <MetaData title="All Products - Admin Panel" />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar (Duplicate for now, best to extract to Layout component in future refactor) */}
                <div className="w-64 bg-white shadow-md fixed h-full hidden md:flex flex-col z-10">
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-xl font-bold text-gray-800 tracking-wide">FLIPKART <span className="text-blue-600">ADMIN</span></h1>
                    </div>

                    <nav className="flex-1 py-4">
                        <SidebarLink to="/admin/dashboard" icon={<Dashboard />} text="Dashboard" />
                        <SidebarLink to="/admin/products" icon={<ShoppingBag />} text="Products" active />
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
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm font-medium">
                            + Create Product
                        </button>
                    </div>

                    <div className="bg-white rounded shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                                        <th className="p-4 font-medium border-b w-20">Image</th>
                                        <th className="p-4 font-medium border-b">Name</th>
                                        <th className="p-4 font-medium border-b">Category</th>
                                        <th className="p-4 font-medium border-b">Stock</th>
                                        <th className="p-4 font-medium border-b">Price</th>
                                        <th className="p-4 font-medium border-b text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {localProducts && localProducts.map((product) => (
                                        <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="p-3">
                                                <img src={product.images[0].url} alt={product.name} className="w-10 h-10 object-contain" />
                                            </td>
                                            <td className="p-3 font-medium text-gray-800 max-w-xs truncate" title={product.name}>{product.name}</td>
                                            <td className="p-3 text-gray-600">{product.category}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="p-3 font-medium">₹{product.price.toLocaleString()}</td>
                                            <td className="p-3 text-right">
                                                <button className="text-blue-500 hover:bg-blue-50 p-2 rounded mr-1">
                                                    <Edit fontSize="small" />
                                                </button>
                                                <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                                    <Delete fontSize="small" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!localProducts || localProducts.length === 0) && (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center text-gray-500">
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProducts;

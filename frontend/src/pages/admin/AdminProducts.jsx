// Admin products page — lists all products in a table with
// options to edit or remove items (demo-only actions).

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../../components/MetaData';
import AdminSidebar from '../../components/AdminSidebar';
import { Edit, Delete } from '@mui/icons-material';

const AdminProducts = () => {
    const { products } = useSelector((state) => state.products);

    // Local copy so demo deletions don't affect the real store
    const [displayedProducts, setDisplayedProducts] = useState(products || []);

    // Keep in sync when the store updates (navigation, refresh)
    useEffect(() => {
        setDisplayedProducts(products);
    }, [products]);

    const confirmAndRemove = (productId) => {
        if (window.confirm('Are you sure you want to delete this product? (Demo Action)')) {
            setDisplayedProducts((prev) => prev.filter((p) => p._id !== productId));
        }
    };

    return (
        <>
            <MetaData title="All Products - Admin Panel" />
            <div className="flex min-h-screen bg-gray-100">
                {/* Shared sidebar */}
                <AdminSidebar activePage="products" />

                {/* Main content */}
                <div className="flex-1 md:ml-64 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm font-medium">
                            + Create Product
                        </button>
                    </div>

                    {/* Product table */}
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
                                    {displayedProducts?.map((item) => (
                                        <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="p-3">
                                                <img src={item.images[0].url} alt={item.name} className="w-10 h-10 object-contain" />
                                            </td>
                                            <td className="p-3 font-medium text-gray-800 max-w-xs truncate" title={item.name}>{item.name}</td>
                                            <td className="p-3 text-gray-600">{item.category}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${item.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {item.stock}
                                                </span>
                                            </td>
                                            <td className="p-3 font-medium">₹{item.price.toLocaleString()}</td>
                                            <td className="p-3 text-right">
                                                <button className="text-blue-500 hover:bg-blue-50 p-2 rounded mr-1">
                                                    <Edit fontSize="small" />
                                                </button>
                                                <button onClick={() => confirmAndRemove(item._id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                                    <Delete fontSize="small" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!displayedProducts || displayedProducts.length === 0) && (
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

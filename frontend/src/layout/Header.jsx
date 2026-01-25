import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Search, AccountCircle, ExpandMore } from '@mui/icons-material';
import { logout } from '../redux/slices/userSlice';

const CATEGORIES = [
    { name: 'Mobiles', path: '/products?category=Mobiles' },
    { name: 'Electronics', path: '/products?category=Electronics' },
    { name: 'Fashion', path: '/products?category=Fashion' },
    { name: 'Home', path: '/products?category=Home' },
    { name: 'Appliances', path: '/products?category=Appliances' },
    { name: 'Toys', path: '/products?category=Toys' },
    { name: 'Laptops', path: '/products?category=Laptops' },
    { name: 'Headphones', path: '/products?category=Headphones' },
    { name: 'Smartwatches', path: '/products?category=Smartwatches' },
    { name: 'Accessories', path: '/products?category=Accessories' },
];

const SUGGESTIONS = ['iPhone 14', 'Samsung S23', 'Nike Shoes', 'Sony Headphones', 'MacBook Air', 'Canon Camera'];

const Header = () => {
    const [keyword, setKeyword] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        setShowSuggestions(false);
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate('/products');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setKeyword(suggestion);
        setShowSuggestions(false);
        navigate(`/products/${suggestion}`);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <>
            <header className="bg-primary sticky top-0 z-50 shadow-md h-16 flex items-center">
                <div className="container mx-auto px-4 max-w-[1280px] flex items-center justify-between gap-4 h-full">
                    {/* Logo */}
                    <Link to="/" className="flex flex-col flex-shrink-0 group">
                        <span className="italic font-bold text-white text-xl tracking-wide">Flipkart</span>
                        <span className="text-[10px] italic text-gray-200 font-medium flex items-center hover:underline">
                            Explore <span className="text-yellow-400 font-bold ml-0.5">Plus</span>
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="plus" className="w-2.5 ml-0.5" />
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative hidden md:block">
                        <form className="flex relative w-full shadow-sm" onSubmit={searchSubmitHandler}>
                            <input
                                type="text"
                                placeholder="Search for products, brands and more"
                                className="w-full py-2.5 px-4 rounded-sm text-sm focus:outline-none text-gray-700"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            />
                            <button type="submit" className="absolute right-0 top-0 h-full px-3 text-primary">
                                <Search />
                            </button>
                        </form>

                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && (
                            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-sm border-t border-gray-100 overflow-hidden z-20">
                                <ul>
                                    {SUGGESTIONS.filter(s => s.toLowerCase().includes(keyword.toLowerCase())).map((s, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm flex items-center gap-2 text-gray-700"
                                            onMouseDown={() => handleSuggestionClick(s)}
                                        >
                                            <Search className="text-gray-400 text-xs" /> {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Action Links */}
                    <nav className="flex items-center gap-8 font-medium text-white h-full">
                        {isAuthenticated ? (
                            <div className="group relative cursor-pointer flex items-center gap-1 h-full px-2">
                                <span>{user?.name.split(' ')[0]}</span>
                                <ExpandMore className="text-sm transition-transform group-hover:rotate-180" />

                                {/* Dropdown */}
                                <div className="absolute top-full right-0 w-56 bg-white rounded-sm shadow-xl text-gray-800 hidden group-hover:block animate-fade-in border border-gray-100 overflow-hidden">
                                    <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-100"></div>
                                    <ul className="flex flex-col">
                                        <li className="px-4 py-3 hover:bg-gray-50 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/account')}>
                                            <AccountCircle className="text-primary text-sm" /> My Profile
                                        </li>
                                        <li className="px-4 py-3 hover:bg-gray-50 border-t border-gray-100 cursor-pointer flex items-center gap-3" onClick={handleLogout}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-white text-primary px-10 py-1 font-semibold rounded-sm hover:bg-gray-100 transition-colors">
                                Login
                            </Link>
                        )}


                        <Link to="/cart" className="flex items-center gap-2 font-medium hover:text-gray-100 transition-colors">
                            <div className="relative">
                                <ShoppingCart />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-[#ff6161] text-[10px] min-w-[16px] h-4 flex items-center justify-center rounded-full border border-white font-bold">
                                        {cartItems.length}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:inline">Cart</span>
                        </Link>
                    </nav>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden px-2 pb-2 w-full absolute top-[64px] left-0 bg-primary shadow-md">
                    <form className="flex bg-white rounded-sm mx-2 mb-2" onSubmit={searchSubmitHandler}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full py-2 px-3 text-sm focus:outline-none rounded-l-sm"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit" className="px-3 text-primary">
                            <Search />
                        </button>
                    </form>
                </div>
            </header>

            {/* Category Navigation Bar */}
            <div className="bg-white shadow-sm border-b border-gray-200 hidden md:block">
                <div className="container mx-auto px-4 max-w-[1280px] py-3 flex items-center justify-center gap-9">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.name} className="group relative cursor-pointer" onClick={() => navigate(cat.path)}>
                            <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex items-center gap-1">
                                {cat.name}
                                <ExpandMore className="text-xs text-gray-400 group-hover:text-primary transition-transform group-hover:rotate-180" />
                            </span>
                            {/* Mock Hover Dropdown */}
                            <div className="absolute top-full left-0 mt-3 w-40 bg-white shadow-lg rounded-sm border border-gray-100 hidden group-hover:block z-40">
                                <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-100"></div>
                                <ul className="py-2 text-sm text-gray-600">
                                    <li className="px-4 py-2 hover:bg-gray-50 hover:text-black">Top Brands</li>
                                    <li className="px-4 py-2 hover:bg-gray-50 hover:text-black">New Arrivals</li>
                                    <li className="px-4 py-2 hover:bg-gray-50 hover:text-black">Best Sellers</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Header;

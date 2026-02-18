import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Search, AccountCircle, ExpandMore, Menu, Close, Home, Category, LocalOffer } from '@mui/icons-material';
import { logout } from '../redux/slices/userSlice';

const CATEGORIES = [
    { name: 'Mobiles', path: '/products?category=Mobiles', icon: <Category fontSize="small" /> },
    { name: 'Electronics', path: '/products?category=Electronics', icon: <Category fontSize="small" /> },
    { name: 'Fashion', path: '/products?category=Fashion', icon: <Category fontSize="small" /> },
    { name: 'Home', path: '/products?category=Home', icon: <Home fontSize="small" /> },
    { name: 'Appliances', path: '/products?category=Appliances', icon: <Category fontSize="small" /> },
    { name: 'Toys', path: '/products?category=Toys', icon: <Category fontSize="small" /> },
    { name: 'Laptops', path: '/products?category=Laptops', icon: <Category fontSize="small" /> },
    { name: 'Headphones', path: '/products?category=Headphones', icon: <Category fontSize="small" /> },
    { name: 'Smartwatches', path: '/products?category=Smartwatches', icon: <Category fontSize="small" /> },
    { name: 'Accessories', path: '/products?category=Accessories', icon: <LocalOffer fontSize="small" /> },
];

const SUGGESTIONS = ['iPhone 14', 'Samsung S23', 'Nike Shoes', 'Sony Headphones', 'MacBook Air', 'Canon Camera'];

const Header = () => {
    const [keyword, setKeyword] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        setIsMobileMenuOpen(false);
    }

    return (
        <>
            <header className="bg-primary sticky top-0 z-50 shadow-md h-16 flex items-center">
                <div className="container mx-auto px-4 max-w-[1280px] flex items-center justify-between gap-4 h-full">

                    {/* Mobile Menu Button - Left */}
                    <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu fontSize="medium" />
                    </button>

                    {/* Logo - Center on Mobile, Left on Desktop */}
                    <Link to="/" className="flex items-center gap-2 group text-white hover:text-gray-100 transition-colors">
                        <span className="font-extrabold text-2xl tracking-tighter" style={{ fontFamily: "'Poppins', sans-serif" }}>Lumina.</span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="flex-1 max-w-2xl relative hidden md:block">
                        <form className="flex relative w-full" onSubmit={searchSubmitHandler}>
                            <input
                                type="text"
                                placeholder="Search for products, brands and more..."
                                className="w-full py-2.5 px-5 rounded-full text-sm focus:outline-none text-gray-700 bg-gray-50 border border-transparent focus:border-white/20 focus:bg-white focus:shadow-lg transition-all duration-300"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                                <Search className="text-sm" />
                            </button>
                        </form>

                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && (
                            <div className="absolute top-12 left-0 w-full bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden z-20">
                                <ul>
                                    {SUGGESTIONS.filter(s => s.toLowerCase().includes(keyword.toLowerCase())).map((s, index) => (
                                        <li
                                            key={index}
                                            className="px-5 py-3 hover:bg-purple-50 cursor-pointer text-sm flex items-center gap-3 text-gray-700 transition-colors"
                                            onMouseDown={() => handleSuggestionClick(s)}
                                        >
                                            <Search className="text-gray-400 text-xs" /> {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Action Links - Right */}
                    <nav className="flex items-center gap-4 md:gap-6 font-medium text-white h-full">

                        {/* Mobile Search Icon */}
                        {/* <button className="md:hidden text-white">
                            <Search />
                        </button> */}

                        {isAuthenticated ? (
                            <div className="group relative cursor-pointer flex items-center gap-2 h-full px-2 hover:bg-white/10 rounded-md transition-colors hidden md:flex">
                                <AccountCircle className="text-xl" />
                                <span className="text-sm font-semibold">{user?.name.split(' ')[0]}</span>
                                <ExpandMore className="text-sm transition-transform group-hover:rotate-180" />

                                {/* Dropdown */}
                                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl text-gray-800 hidden group-hover:block animate-fade-in border border-gray-100 overflow-hidden">
                                    <ul className="flex flex-col py-1">
                                        <li className="px-4 py-3 hover:bg-purple-50 flex items-center gap-3 cursor-pointer transition-colors" onClick={() => navigate('/account')}>
                                            <AccountCircle className="text-primary text-lg" /> My Profile
                                        </li>
                                        <li className="px-4 py-3 hover:bg-purple-50 border-t border-gray-50 cursor-pointer flex items-center gap-3 transition-colors text-red-500 hover:text-red-600" onClick={handleLogout}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-white text-primary px-6 py-2 font-bold rounded-full hover:bg-gray-100 transition-all shadow-sm hover:shadow-md text-sm hidden md:block">
                                Login
                            </Link>
                        )}


                        <Link to="/cart" className="flex items-center gap-2 font-medium hover:text-purple-200 transition-colors relative group">
                            <div className="relative p-1">
                                <ShoppingCart className="text-2xl" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary font-bold shadow-sm">
                                        {cartItems.length}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:inline font-semibold">Cart</span>
                        </Link>
                    </nav>
                </div>

                {/* Mobile Search Bar - Below Header */}
                <div className="md:hidden px-4 pb-3 w-full absolute top-[64px] left-0 bg-primary shadow-md">
                    <form className="flex bg-white rounded-full overflow-hidden" onSubmit={searchSubmitHandler}>
                        <button type="submit" className="px-3 text-gray-400">
                            <Search fontSize="small" />
                        </button>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full py-2 pr-4 text-sm focus:outline-none"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </form>
                </div>
            </header>

            {/* Mobile Hamburger Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] flex">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>

                    {/* Sidebar */}
                    <div className="bg-white w-[80%] max-w-sm h-full shadow-2xl relative z-10 flex flex-col animate-slide-in-left">

                        {/* Sidebar Header */}
                        <div className="bg-primary p-6 flex items-center justify-between text-white">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-3">
                                    <AccountCircle fontSize="large" />
                                    <div>
                                        <p className="text-xs opacity-80">Welcome,</p>
                                        <p className="font-bold text-lg">{user?.name}</p>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="font-bold text-lg hover:underline" onClick={() => setIsMobileMenuOpen(false)}>
                                    Login & Signup
                                </Link>
                            )}
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <Close />
                            </button>
                        </div>

                        {/* Sidebar Links */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 px-2">Shop By Category</h3>
                            <div className="grid grid-cols-1 gap-1">
                                {CATEGORIES.map((cat) => (
                                    <div
                                        key={cat.name}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-700 transition-colors"
                                        onClick={() => {
                                            navigate(cat.path);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        <span className="text-gray-400">{cat.icon}</span>
                                        <span className="font-medium text-sm">{cat.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 my-4"></div>

                            {isAuthenticated && (
                                <div className="grid grid-cols-1 gap-1">
                                    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-700 transition-colors" onClick={() => { navigate('/account'); setIsMobileMenuOpen(false); }}>
                                        <AccountCircle fontSize="small" className="text-gray-400" />
                                        <span className="font-medium text-sm">My Account</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg cursor-pointer text-red-500 transition-colors" onClick={handleLogout}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                        <span className="font-medium text-sm">Logout</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Category Navigation Bar */}
            <div className="bg-white shadow-sm border-b border-gray-200 hidden md:block">
                <div className="container mx-auto px-4 max-w-[1280px] py-3 flex items-center justify-center gap-9">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.name} className="group relative cursor-pointer" onClick={() => navigate(cat.path)}>
                            <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex items-center gap-1">
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Header;

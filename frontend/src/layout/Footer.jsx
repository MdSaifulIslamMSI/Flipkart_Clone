import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-auto border-t border-gray-800">
            <div className="container mx-auto px-4 max-w-[1280px] grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div>
                    <h3 className="text-xl font-bold mb-4 font-['Poppins']">Lumina.</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Experience the new era of online shopping with Lumina.
                        Premium products, lightning-fast delivery, and exceptional customer service.
                    </p>
                </div>
                <div>
                    <h4 className="text-gray-400 mb-4 uppercase text-xs font-semibold tracking-wider">About</h4>
                    <ul className="flex flex-col gap-3 text-gray-300">
                        <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                        <li><Link to="/stories" className="hover:text-primary transition-colors">Lumina Stories</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-gray-400 mb-4 uppercase text-xs font-semibold tracking-wider">Help</h4>
                    <ul className="flex flex-col gap-3 text-gray-300">
                        <li><Link to="/payments" className="hover:text-primary transition-colors">Payments</Link></li>
                        <li><Link to="/shipping-info" className="hover:text-primary transition-colors">Shipping</Link></li>
                        <li><Link to="/cancellation-returns" className="hover:text-primary transition-colors">Cancellation & Returns</Link></li>
                        <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-gray-400 mb-4 uppercase text-xs font-semibold tracking-wider">Policy</h4>
                    <ul className="flex flex-col gap-3 text-gray-300">
                        <li><Link to="/return-policy" className="hover:text-primary transition-colors">Return Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-primary transition-colors">Terms Of Use</Link></li>
                        <li><Link to="/security" className="hover:text-primary transition-colors">Security</Link></li>
                        <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                <span>© {new Date().getFullYear()} Lumina. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;

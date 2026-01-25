import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#172337] text-white py-10 mt-auto">
            <div className="container mx-auto px-4 max-w-[1280px] grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div>
                    <h4 className="text-gray-400 mb-4 uppercase text-xs">About</h4>
                    <ul className="flex flex-col gap-2">
                        <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                        <li><Link to="/about" className="hover:underline">About Us</Link></li>
                        <li><Link to="/careers" className="hover:underline">Careers</Link></li>
                        <li><Link to="/stories" className="hover:underline">Flipkart Stories</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-gray-400 mb-4 uppercase text-xs">Help</h4>
                    <ul className="flex flex-col gap-2">
                        <li><Link to="/payments" className="hover:underline">Payments</Link></li>
                        <li><Link to="/shipping-info" className="hover:underline">Shipping</Link></li>
                        <li><Link to="/cancellation-returns" className="hover:underline">Cancellation & Returns</Link></li>
                        <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-gray-400 mb-4 uppercase text-xs">Policy</h4>
                    <ul className="flex flex-col gap-2">
                        <li><Link to="/return-policy" className="hover:underline">Return Policy</Link></li>
                        <li><Link to="/terms" className="hover:underline">Terms Of Use</Link></li>
                        <li><Link to="/security" className="hover:underline">Security</Link></li>
                        <li><Link to="/privacy" className="hover:underline">Privacy</Link></li>
                    </ul>
                </div>
                <div className="border-l border-gray-600 pl-0 md:pl-8">
                    <h4 className="text-gray-400 mb-4 uppercase text-xs">Mail Us:</h4>
                    <p className="leading-6 text-xs">
                        Flipkart Internet Private Limited,<br />
                        Buildings Alyssa, Begonia &<br />
                        Clove Embassy Tech Village,<br />
                        Outer Ring Road, Devarabeesanahalli Village,<br />
                        Bengaluru, 560103,<br />
                        Karnataka, India
                    </p>
                </div>
            </div>
            <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm font-light">
                <span>© 2007-2026 Flipkart.com</span>
            </div>
        </footer>
    );
};

export default Footer;

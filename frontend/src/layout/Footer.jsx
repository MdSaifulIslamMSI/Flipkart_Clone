// Site footer — displays company info, quick links, and copyright.

import React from 'react';
import { Link } from 'react-router-dom';

// Link groups for the footer columns
const FOOTER_SECTIONS = [
    {
        heading: 'About',
        links: [
            { label: 'Contact Us', path: '/contact' },
            { label: 'About Us', path: '/about' },
            { label: 'Careers', path: '/careers' },
            { label: 'Lumina Stories', path: '/stories' },
        ],
    },
    {
        heading: 'Help',
        links: [
            { label: 'Payments', path: '/payments' },
            { label: 'Shipping', path: '/shipping-info' },
            { label: 'Cancellation & Returns', path: '/cancellation-returns' },
            { label: 'FAQ', path: '/faq' },
        ],
    },
    {
        heading: 'Policy',
        links: [
            { label: 'Return Policy', path: '/return-policy' },
            { label: 'Terms Of Use', path: '/terms' },
            { label: 'Security', path: '/security' },
            { label: 'Privacy', path: '/privacy' },
        ],
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-12 mt-auto border-t border-gray-800">
            <div className="container mx-auto px-4 max-w-[1280px] grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                {/* Brand column */}
                <div>
                    <h3 className="text-xl font-bold mb-4 font-['Poppins']">Lumina.</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Experience the new era of online shopping with Lumina.
                        Premium products, lightning-fast delivery, and exceptional customer service.
                    </p>
                </div>

                {/* Dynamic link columns */}
                {FOOTER_SECTIONS.map((section) => (
                    <div key={section.heading}>
                        <h4 className="text-gray-400 mb-4 uppercase text-xs font-semibold tracking-wider">{section.heading}</h4>
                        <ul className="flex flex-col gap-3 text-gray-300">
                            {section.links.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                <span>© {currentYear} Lumina. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;

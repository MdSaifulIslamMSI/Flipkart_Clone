import React from 'react';
import MetaData from '../components/MetaData';
import { Link } from 'react-router-dom';

const InfoPage = ({ title }) => {
    return (
        <>
            <MetaData title={`${title} - Lumina`} />
            <div className="bg-[#f1f3f6] min-h-screen py-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white p-8 shadow-sm rounded-sm">
                        <div className="mb-6">
                            <h1 className="text-2xl font-medium text-gray-800 mb-2">{title}</h1>
                            <div className="h-1 w-16 bg-primary rounded-full"></div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-8 text-sm">
                            <strong>Note:</strong> This is a demo page for academic use. The content below is a placeholder.
                        </div>

                        <div className="text-gray-600 space-y-4 leading-relaxed text-sm">
                            <p>
                                Welcome to the <strong>{title}</strong> page of our Lumina project.
                                This section is traditionally used to display legal information, company details, or help resources.
                            </p>
                            <p>
                                In a real production application, this page would contain detailed policies,
                                interactive forms, or comprehensive documentation relevant to '{title}'.
                            </p>
                            <p>
                                For the purpose of this academic demonstration, we have implemented the routing and
                                structure to show how static information pages are integrated into a React SPA (Single Page Application).
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <Link to="/" className="text-primary font-medium hover:underline text-sm">
                                &larr; Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoPage;

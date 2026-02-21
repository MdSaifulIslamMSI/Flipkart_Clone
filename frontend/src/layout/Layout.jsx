// Site layout wrapper — renders the Header and Footer around
// whichever page is currently active via React Router's Outlet.

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const SiteLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default SiteLayout;

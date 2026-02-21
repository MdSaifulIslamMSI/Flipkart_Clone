// Application root — sets up routing, lazy-loaded pages,
// and session restoration on first mount.

import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/slices/userSlice';

// Layout wrapper provides the Header + Footer shell
import SiteLayout from './layout/Layout';
import Loader from './components/Loader';
import ProtectedRoute from './Routes/ProtectedRoute';

// ── Lazy-loaded pages (code-split for performance) ─────
const HomePage = lazy(() => import('./pages/Home'));
const ProductListingPage = lazy(() => import('./pages/ProductListing'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetails'));
const CartPage = lazy(() => import('./pages/Cart'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const ShippingPage = lazy(() => import('./pages/Shipping'));
const MyOrdersPage = lazy(() => import('./pages/MyOrders'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccess'));
const InfoPage = lazy(() => import('./pages/InfoPage'));

// Admin pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProducts'));

function App() {
  const dispatch = useDispatch();

  // Try to restore user session from the auth cookie on mount
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ── Public Routes (with Header/Footer) ───── */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:keyword" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/order/success" element={<OrderSuccessPage />} />

            {/* Info pages (about, contact, policies) */}
            <Route path="/about" element={<InfoPage title="About Us" />} />
            <Route path="/contact" element={<InfoPage title="Contact Us" />} />
            <Route path="/faq" element={<InfoPage title="FAQ" />} />

            {/* ── Protected Routes (logged-in users only) ── */}
            <Route element={<ProtectedRoute />}>
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/orders" element={<MyOrdersPage />} />
            </Route>
          </Route>

          {/* ── Admin Routes (no Header/Footer) ──────── */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

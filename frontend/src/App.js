import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/slices/userSlice';
import Layout from './layout/Layout';
// import Loader from './components/Loader'; // Ensure Loader exists if you want to use it
import ProtectedRoute from './Routes/ProtectedRoute';
import './index.css';

// Lazy Load Pages for Performance
const Home = lazy(() => import('./pages/Home'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const ProductListing = lazy(() => import('./pages/ProductListing'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Shipping = lazy(() => import('./pages/Shipping'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));

// Simple Loader for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:keyword" element={<ProductListing />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/success" element={<OrderSuccess />} />
            <Route path="/orders" element={<MyOrders />} />
            {/* Footer Static Pages */}
            <Route path="/contact" element={<InfoPage title="Contact Us" />} />
            <Route path="/about" element={<InfoPage title="About Us" />} />
            <Route path="/careers" element={<InfoPage title="Careers" />} />
            <Route path="/stories" element={<InfoPage title="Lumina Stories" />} />
            <Route path="/payments" element={<InfoPage title="Payments" />} />
            <Route path="/shipping-info" element={<InfoPage title="Shipping" />} />
            <Route path="/cancellation-returns" element={<InfoPage title="Cancellation & Returns" />} />
            <Route path="/faq" element={<InfoPage title="FAQ" />} />
            <Route path="/return-policy" element={<InfoPage title="Return Policy" />} />
            <Route path="/terms" element={<InfoPage title="Terms Of Use" />} />
            <Route path="/security" element={<InfoPage title="Security" />} />
            <Route path="/privacy" element={<InfoPage title="Privacy" />} />
            <Route path="*" element={<Home />} />
          </Route>

          {/* Admin Routes (Separate Layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute isAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute isAdmin={true}>
              <AdminProducts />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

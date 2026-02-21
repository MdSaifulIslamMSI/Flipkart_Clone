// API service layer — centralizes all HTTP requests to the backend.
// Uses Axios with a base URL configured for the environment.

import axios from 'axios';

// Base URL switches between local dev and production
const BASE_URL = process.env.REACT_APP_API_URL || '';

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

// ── Product APIs ───────────────────────────────────────

export const fetchProductsAPI = (params = {}) => {
    const { keyword = '', page = 1, category, priceRange, ratings, sort } = params;

    let queryString = `/api/v1/products?keyword=${keyword}&page=${page}`;
    if (category) queryString += `&category=${category}`;
    if (priceRange) queryString += `&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`;
    if (ratings) queryString += `&ratings[gte]=${ratings}`;
    if (sort) queryString += `&sort=${sort}`;

    return api.get(queryString);
};

export const fetchProductDetailsAPI = (productId) =>
    api.get(`/api/v1/product/${productId}`);

// ── Auth APIs ──────────────────────────────────────────

export const loginAPI = (credentials) =>
    api.post('/api/v1/login', credentials);

export const registerAPI = (formData) =>
    api.post('/api/v1/register', formData);

export const fetchProfileAPI = () =>
    api.get('/api/v1/me');

export const logoutAPI = () =>
    api.get('/api/v1/logout');

// ── Order APIs ─────────────────────────────────────────

export const placeOrderAPI = (orderData) =>
    api.post('/api/v1/order/new', orderData);

export const fetchMyOrdersAPI = () =>
    api.get('/api/v1/orders/me');

export const fetchOrderDetailsAPI = (orderId) =>
    api.get(`/api/v1/order/${orderId}`);

// ── Payment APIs ───────────────────────────────────────

export const initiatePaymentAPI = (paymentData) =>
    api.post('/api/v1/payment/process', paymentData);

export const checkPaymentStatusAPI = (paymentId) =>
    api.get(`/api/v1/payment/status/${paymentId}`);

// ── Admin APIs ─────────────────────────────────────────

export const fetchAdminProductsAPI = () =>
    api.get('/api/v1/admin/products');

export const fetchAdminOrdersAPI = () =>
    api.get('/api/v1/admin/orders');

export const fetchAdminUsersAPI = () =>
    api.get('/api/v1/admin/users');

export default api;

import axios from 'axios';

// Toggle this to switch between mock and real data
// Ideally, this should come from process.env.REACT_APP_USE_MOCK
// Toggle this to switch between mock and real data
// Ideally, this should come from process.env.REACT_APP_USE_MOCK
// const USE_MOCK_DATA = false;

// Use relative path in production (Vercel), localhost in dev
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/v1'
    : 'http://localhost:4000/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});



export const getProducts = async (keyword = '', currentPage = 1, price = [0, 500000], category, ratings = 0) => {
    // Real API Call
    let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    if (category) {
        link = `/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    return api.get(link);
};

export const getProductDetails = async (id) => {
    return api.get(`/product/${id}`);
};

export const loginUser = async (email, password) => {
    return api.post(`/login`, { email, password });
};

export const registerUser = async (userData) => {
    return api.post(`/register`, userData);
};

export const loadUser = async () => {
    return api.get(`/me`);
};

export default api;

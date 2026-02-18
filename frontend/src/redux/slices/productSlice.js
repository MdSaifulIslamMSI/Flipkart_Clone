import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

// Async Thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async ({ keyword = '', currentPage = 1, price = [0, 200000], category, ratings = 0, sort = '' }, { rejectWithValue }) => {
        try {
            const response = await api.getProducts(keyword, currentPage, price, category, ratings, sort);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const fetchProductDetails = createAsyncThunk(
    'products/fetchDetails',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.getProductDetails(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error fetching details');
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productDetails: {},
        productsCount: 0,
        resultPerPage: 0,
        filteredProductsCount: 0,
        loading: false,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.products = [];
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.productsCount = action.payload.productsCount;
                state.resultPerPage = action.payload.resultPerPage;
                state.filteredProductsCount = action.payload.filteredProductsCount;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Product Details
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetails = action.payload.product;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;

// Product slice — manages the product catalog state including
// product listings, individual item details, and loading/error states.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsAPI, fetchProductDetailsAPI } from '../../services/api';

// ── Async Actions ──────────────────────────────────────

// Load the product listing (with optional search/filter/sort params)
export const loadProducts = createAsyncThunk(
    'catalog/loadAll',
    async (queryParams = {}, { rejectWithValue }) => {
        try {
            const response = await fetchProductsAPI(queryParams);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to load products');
        }
    }
);

// Load details for a single product by its ID
export const loadSingleProduct = createAsyncThunk(
    'catalog/loadOne',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await fetchProductDetailsAPI(productId);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to load product details');
        }
    }
);

// ── Slice Definition ───────────────────────────────────

const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        products: [],
        product: null,
        productsCount: 0,
        filteredCount: 0,
        resultPerPage: 8,
        loading: false,
        error: null,
    },
    reducers: {
        dismissError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ── Load All Products ──────────────────────
            .addCase(loadProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.productsCount = action.payload.productsCount;
                state.filteredCount = action.payload.filteredProductsCount;
                state.resultPerPage = action.payload.resultPerPage;
            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ── Load Single Product ────────────────────
            .addCase(loadSingleProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product;
            })
            .addCase(loadSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { dismissError } = catalogSlice.actions;
export default catalogSlice.reducer;

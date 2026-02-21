// User slice — manages authentication state including login,
// registration, session loading, and logout operations.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, fetchProfileAPI, logoutAPI } from '../../services/api';

// ── Async Actions ──────────────────────────────────────

// Sign in with email and password
export const login = createAsyncThunk(
    'account/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await loginAPI(credentials);
            // Persist the token locally so we can restore the session on refresh
            localStorage.setItem('authToken', response.data.token);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

// Create a new account
export const register = createAsyncThunk(
    'account/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await registerAPI(formData);
            localStorage.setItem('authToken', response.data.token);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

// Restore the user session on page load (if a token exists)
export const loadUser = createAsyncThunk(
    'account/loadUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchProfileAPI();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Session expired');
        }
    }
);

// Sign out — clears the cookie and local token
export const logout = createAsyncThunk(
    'account/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logoutAPI();
            localStorage.removeItem('authToken');
            return null;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Logout failed');
        }
    }
);

// ── Slice Definition ───────────────────────────────────

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        user: null,
        isAuthenticated: false,
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
            // ── Login ──────────────────────────────────
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ── Register ──────────────────────────────
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ── Load User (session restore) ───────────
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(loadUser.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })

            // ── Logout ────────────────────────────────
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export const { dismissError } = accountSlice.actions;
export default accountSlice.reducer;

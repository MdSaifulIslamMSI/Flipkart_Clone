import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await api.loginUser(email, password);
            localStorage.setItem('token', response.data.token);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const loadUser = createAsyncThunk(
    'user/load',
    async (_, { rejectWithValue }) => {
        try {
            // In a real app we would check localStorage first or let the API handle the session check
            const response = await api.loadUser();
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Not authenticated');
        }
    }
);

// Basic logout - just clears state
export const logout = createAsyncThunk('user/logout', async () => {
    localStorage.removeItem('token');
    // api.logout() if needed
    return null;
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
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
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                // Don't set error for loadUser failure as it just means "guest"
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
    },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;

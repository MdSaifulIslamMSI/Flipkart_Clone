// Redux store configuration — combines all state slices into
// a single store that powers the entire application.

import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './slices/productSlice';
import accountReducer from './slices/userSlice';
import basketReducer from './slices/cartSlice';

const appStore = configureStore({
    reducer: {
        // Product catalog data (listings, details, loading states)
        products: catalogReducer,
        // User authentication and profile
        user: accountReducer,
        // Shopping cart items and shipping info
        cart: basketReducer,
    },
});

export default appStore;

// Cart slice — manages shopping basket items and shipping details.
// Cart data is persisted in localStorage so it survives page refreshes.

import { createSlice } from '@reduxjs/toolkit';

// Read initial cart state from localStorage (if available)
const savedCartItems = JSON.parse(localStorage.getItem('basketItems')) || [];
const savedShippingInfo = JSON.parse(localStorage.getItem('deliveryInfo')) || {};

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        cartItems: savedCartItems,
        shippingInfo: savedShippingInfo,
    },
    reducers: {
        // Add a new item or update quantity if it's already in the cart
        addToCart: (state, action) => {
            const incomingItem = action.payload;
            const existingIndex = state.cartItems.findIndex(
                (item) => item.product === incomingItem.product
            );

            if (existingIndex >= 0) {
                // Update existing item's quantity
                state.cartItems[existingIndex] = incomingItem;
            } else {
                // Add new item to cart
                state.cartItems.push(incomingItem);
            }

            // Sync to localStorage
            localStorage.setItem('basketItems', JSON.stringify(state.cartItems));
        },

        // Remove an item from the cart by its product ID
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.product !== action.payload
            );
            localStorage.setItem('basketItems', JSON.stringify(state.cartItems));
        },

        // Save/update the shipping address
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
            localStorage.setItem('deliveryInfo', JSON.stringify(action.payload));
        },

        // Empty the cart (used after successful order placement)
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('basketItems');
        },
    },
});

export const { addToCart, removeFromCart, saveShippingInfo, clearCart } = basketSlice.actions;
export default basketSlice.reducer;

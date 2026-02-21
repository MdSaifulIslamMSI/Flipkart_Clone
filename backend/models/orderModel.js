// Order schema — captures shipping info, items purchased,
// payment details, pricing breakdown, and fulfillment status.

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    // ── Shipping Address ───────────────────────────────
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: Number, required: true },
        phoneNo: { type: Number, required: true },
    },

    // ── Items in this order ────────────────────────────
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],

    // ── Who placed this order ──────────────────────────
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    // ── Payment details ────────────────────────────────
    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true },
    },
    paidAt: { type: Date, required: true },

    // ── Pricing breakdown ──────────────────────────────
    itemsPrice: { type: Number, default: 0 },
    taxPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },

    // ── Fulfillment status ─────────────────────────────
    orderStatus: {
        type: String,
        default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);
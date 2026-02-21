// Payment schema — records transaction details from the Paytm gateway
// so we have a permanent log of every payment attempt.

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    // Links this payment to the order and buyer
    orderId: { type: String, required: true },
    txnId: { type: String, required: true },
    bankTxnId: String,

    // Payment outcome
    resultCode: String,
    resultMessage: String,
    txnStatus: { type: String, required: true },

    // Amount and method
    txnAmount: { type: String, required: true },
    currency: { type: String, default: "INR" },
    paymentMode: String,
    gatewayName: String,
    bankName: String,

    // Timestamps from the gateway
    txnDate: String,
    checksumHash: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Payment", paymentSchema);
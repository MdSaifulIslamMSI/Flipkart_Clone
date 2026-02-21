// Payment routes — Paytm integration for processing transactions.

const express = require("express");
const router = express.Router();
const { verifyLogin } = require("../middlewares/auth");

const {
    initiatePayment,
    handlePaytmCallback,
    checkPaymentStatus,
} = require("../controllers/paymentController");

// Start a payment (requires auth)
router.route("/payment/process").post(verifyLogin, initiatePayment);

// Paytm sends the user back here after payment (no auth — redirect flow)
router.route("/callback").post(handlePaytmCallback);

// Check payment status
router.route("/payment/status/:id").get(verifyLogin, checkPaymentStatus);

module.exports = router;
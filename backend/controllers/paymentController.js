// Payment controller — handles Paytm payment integration
// including initiating transactions and processing callbacks.

const catchAsync = require("../middlewares/asyncErrorHandler");
const Payment = require("../models/paymentModel");
const https = require("https");

// Paytm checksum library for secure transaction signing
const PaytmChecksum = require("paytmchecksum");

// ── Payment Flow ───────────────────────────────────────

// POST /payment/process — initiate a Paytm transaction
exports.initiatePayment = catchAsync(async (req, res) => {
    const { amount, email, phone } = req.body;

    // Build the payload Paytm expects
    const transactionParams = {
        body: {
            requestType: "Payment",
            mid: process.env.PAYTM_MID,
            websiteName: process.env.PAYTM_WEBSITE,
            orderId: `ORDER_${Date.now()}`,
            callbackUrl: `${process.env.PAYTM_CALLBACK_URL || "https://securegw-stage.paytm.in/theia/paytmCallback"}?ORDER_ID=ORDER_${Date.now()}`,
            txnAmount: {
                value: amount,
                currency: "INR",
            },
            userInfo: {
                custId: email,
                mobile: phone,
            },
        },
    };

    // Generate the checksum for transaction security
    const checksum = await PaytmChecksum.generateSignature(
        JSON.stringify(transactionParams.body),
        process.env.PAYTM_MERCHANT_KEY
    );
    transactionParams.head = { signature: checksum };

    // Forward the request to Paytm's API
    const paytmResponse = await makePaytmRequest(transactionParams);

    res.status(200).json(paytmResponse);
});

// POST /callback — Paytm sends the payment result here after user pays
exports.handlePaytmCallback = catchAsync(async (req, res) => {
    const callbackData = req.body;

    // Verify the checksum to ensure the response wasn't tampered with
    const isValidChecksum = PaytmChecksum.verifySignature(
        callbackData,
        process.env.PAYTM_MERCHANT_KEY,
        callbackData.CHECKSUMHASH
    );

    if (isValidChecksum) {
        // Save the transaction details to our database
        await Payment.create({
            orderId: callbackData.ORDERID,
            txnId: callbackData.TXNID,
            bankTxnId: callbackData.BANKTXNID,
            txnAmount: callbackData.TXNAMOUNT,
            currency: callbackData.CURRENCY,
            txnStatus: callbackData.STATUS,
            resultCode: callbackData.RESPCODE,
            resultMessage: callbackData.RESPMSG,
            paymentMode: callbackData.PAYMENTMODE,
            gatewayName: callbackData.GATEWAYNAME,
            bankName: callbackData.BANKNAME,
            txnDate: callbackData.TXNDATE,
            checksumHash: callbackData.CHECKSUMHASH,
        });

        res.redirect(`${process.env.FRONTEND_URL}/order/success?reference=${callbackData.TXNID}`);
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
    }
});

// GET /payment/status/:id — check the status of a payment
exports.checkPaymentStatus = catchAsync(async (req, res) => {
    const payment = await Payment.findOne({ orderId: req.params.id });

    if (!payment) {
        return res.status(200).json({
            success: false,
            message: "Payment not found",
        });
    }

    res.status(200).json({
        success: true,
        payment: {
            status: payment.txnStatus,
            amount: payment.txnAmount,
            method: payment.paymentMode,
        },
    });
});

// ── Helper: Make HTTPS request to Paytm API ───────────
function makePaytmRequest(requestBody) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(requestBody);

        const options = {
            hostname: "securegw-stage.paytm.in",
            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${requestBody.body.orderId}`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": postData.length,
            },
        };

        const request = https.request(options, (response) => {
            let data = "";
            response.on("data", (chunk) => (data += chunk));
            response.on("end", () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error("Failed to parse Paytm response"));
                }
            });
        });

        request.on("error", reject);
        request.write(postData);
        request.end();
    });
}

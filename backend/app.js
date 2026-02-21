// Express application setup — middleware chain and API route mounting.

const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// Import route handlers
const itemRoutes = require("./routes/productRoute");
const accountRoutes = require("./routes/userRoute");
const purchaseRoutes = require("./routes/orderRoute");
const transactionRoutes = require("./routes/paymentRoute");

// Central error handler (must be registered last)
const handleErrors = require("./middlewares/error");

const app = express();

// ── Middleware Stack ────────────────────────────────────
// Parse incoming JSON payloads (up to 50mb for image uploads)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Parse cookies so we can read auth tokens from them
app.use(cookieParser());

// Handle multipart file uploads with a 50mb ceiling
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 }, useTempFiles: false }));

// Allow cross-origin requests from the frontend dev server
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));

// ── API Routes ─────────────────────────────────────────
app.use("/api/v1", itemRoutes);
app.use("/api/v1", accountRoutes);
app.use("/api/v1", purchaseRoutes);
app.use("/api/v1", transactionRoutes);

// ── Error Handling ─────────────────────────────────────
// This must come after all routes so it catches any unhandled errors
app.use(handleErrors);

module.exports = app;
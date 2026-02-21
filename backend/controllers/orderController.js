// Order controller — handles creating, viewing, updating, and
// deleting orders; also updates product stock on delivery.

const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsync = require("../middlewares/asyncErrorHandler");
const AppError = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");

// Helper: decrements stock for each item in a delivered order
const decrementStock = async (productId, soldQuantity) => {
    const product = await Product.findById(productId);
    if (product) {
        product.stock = Math.max(0, product.stock - soldQuantity);
        await product.save({ validateBeforeSave: false });
    }
};

// POST /order/new — place a new order
exports.placeOrder = catchAsync(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // Check if this transaction was already used for another order
    const existingOrder = await Order.findOne({ "paymentInfo.id": paymentInfo.id });
    if (existingOrder) {
        return res.status(200).json({ success: true, order: existingOrder });
    }

    const newOrder = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    // Send order confirmation email
    try {
        await sendEmail({
            email: req.user.email,
            templateId: process.env.SENDGRID_ORDER_TEMPLATEID,
            data: {
                username: req.user.name,
                shippingInfo,
                orderItems,
                totalPrice,
                orderId: newOrder._id,
            },
        });
    } catch (_emailErr) {
        // Don't fail the order if the email doesn't send
        console.error("Order confirmation email failed to send");
    }

    res.status(201).json({ success: true, order: newOrder });
});

// GET /order/:id — view a specific order's details
exports.fetchOrderDetails = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new AppError("Order not found", 404));
    }

    res.status(200).json({ success: true, order });
});

// GET /orders/me — list all orders for the logged-in user
exports.fetchMyOrders = catchAsync(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({ success: true, orders });
});

// ── Admin Routes ───────────────────────────────────────

// GET /admin/orders — list every order in the system
exports.fetchAllOrders = catchAsync(async (_req, res) => {
    const orders = await Order.find();

    // Calculate total revenue across all orders
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    res.status(200).json({ success: true, totalAmount: totalRevenue, orders });
});

// PUT /admin/order/:id — update order status (e.g. Processing → Shipped → Delivered)
exports.changeOrderStatus = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new AppError("Order not found", 404));

    if (order.orderStatus === "Delivered") {
        return next(new AppError("This order has already been delivered", 400));
    }

    // When marking as delivered, reduce stock for each product
    if (req.body.status === "Delivered") {
        for (const item of order.orderItems) {
            await decrementStock(item.product, item.quantity);
        }
        order.deliveredAt = Date.now();
    }

    order.orderStatus = req.body.status;
    await order.save({ validateBeforeSave: false });

    res.status(200).json({ success: true });
});

// DELETE /admin/order/:id — remove an order
exports.removeOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new AppError("Order not found", 404));

    await order.remove();
    res.status(200).json({ success: true });
});
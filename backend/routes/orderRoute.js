// Order routes — placing orders, viewing history, and admin management.

const express = require("express");
const router = express.Router();
const { verifyLogin, restrictToRoles } = require("../middlewares/auth");

const {
    placeOrder,
    fetchOrderDetails,
    fetchMyOrders,
    fetchAllOrders,
    changeOrderStatus,
    removeOrder,
} = require("../controllers/orderController");

// Authenticated user routes
router.route("/order/new").post(verifyLogin, placeOrder);
router.route("/order/:id").get(verifyLogin, fetchOrderDetails);
router.route("/orders/me").get(verifyLogin, fetchMyOrders);

// Admin-only routes
router.route("/admin/orders").get(verifyLogin, restrictToRoles("admin"), fetchAllOrders);
router.route("/admin/order/:id")
    .put(verifyLogin, restrictToRoles("admin"), changeOrderStatus)
    .delete(verifyLogin, restrictToRoles("admin"), removeOrder);

module.exports = router;
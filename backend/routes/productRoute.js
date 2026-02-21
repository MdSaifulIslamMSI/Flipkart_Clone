// Product routes — maps HTTP endpoints to product controller functions.

const express = require("express");
const router = express.Router();
const { verifyLogin, restrictToRoles } = require("../middlewares/auth");

const {
    fetchAllItems,
    fetchItemDetails,
    fetchAdminItems,
    addNewProduct,
    modifyProduct,
    removeProduct,
    submitReview,
    fetchReviews,
    removeReview,
} = require("../controllers/productController");

// Public routes — anyone can browse products
router.route("/products").get(fetchAllItems);
router.route("/product/:id").get(fetchItemDetails);

// Authenticated user routes — must be logged in to leave reviews
router.route("/review").put(verifyLogin, submitReview);
router.route("/reviews").get(fetchReviews).delete(verifyLogin, removeReview);

// Admin-only routes — full CRUD access
router.route("/admin/products").get(verifyLogin, restrictToRoles("admin"), fetchAdminItems);
router.route("/admin/product/new").post(verifyLogin, restrictToRoles("admin"), addNewProduct);
router.route("/admin/product/:id")
    .put(verifyLogin, restrictToRoles("admin"), modifyProduct)
    .delete(verifyLogin, restrictToRoles("admin"), removeProduct);

module.exports = router;
// User routes — authentication, profile management, and admin user ops.

const express = require("express");
const router = express.Router();
const { verifyLogin, restrictToRoles } = require("../middlewares/auth");

const {
    signUpNewUser,
    authenticateUser,
    signOutUser,
    fetchMyProfile,
    updateMyProfile,
    changePassword,
    requestPasswordReset,
    resetPassword,
    fetchAllUsers,
    fetchSingleUser,
    modifyUserRole,
    removeUser,
} = require("../controllers/userController");

// Public auth routes
router.route("/register").post(signUpNewUser);
router.route("/login").post(authenticateUser);
router.route("/logout").get(signOutUser);

// Password reset (no auth needed — user is locked out)
router.route("/password/forgot").post(requestPasswordReset);
router.route("/password/reset/:token").put(resetPassword);

// Authenticated user routes — must be logged in
router.route("/me").get(verifyLogin, fetchMyProfile);
router.route("/me/update").put(verifyLogin, updateMyProfile);
router.route("/password/update").put(verifyLogin, changePassword);

// Admin-only user management
router.route("/admin/users").get(verifyLogin, restrictToRoles("admin"), fetchAllUsers);
router.route("/admin/user/:id")
    .get(verifyLogin, restrictToRoles("admin"), fetchSingleUser)
    .put(verifyLogin, restrictToRoles("admin"), modifyUserRole)
    .delete(verifyLogin, restrictToRoles("admin"), removeUser);

module.exports = router;
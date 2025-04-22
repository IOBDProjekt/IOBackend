const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate.js");
const {
    validateLogin,
    validateRegister,
    validatePassword,
} = require("../middleware/validate.js");
const {
    register,
    login,
    me,
    forgotPassword,
    resetPassword,
} = require("../controllers/authController.js");

router
    .post("/register", validateRegister, register)
    .post("/login", validateLogin, login)
    .get("/me", authenticate, me)
    .post("/forgot-password", forgotPassword)
    .post("/reset-password", validatePassword, resetPassword);

module.exports = router;

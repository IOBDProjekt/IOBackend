const express = require("express");
const router = express.Router();

const {
    authenticate,
    authorizeRole,
} = require("../middleware/authenticate.js");
const { validate } = require("../middleware/validate.js");
const {
    register,
    login,
    me,
    forgotPassword,
    resetPassword,
    registerShelterAccount,
} = require("../controllers/authController.js");

router
    .post("/register", validate("register"), register)
    .post(
        "/register-shelter",
        authenticate,
        authorizeRole("admin"),
        validate("register"),
        registerShelterAccount
    )
    .post("/login", validate("login"), login)
    .get("/me", authenticate, me)
    .post("/forgot-password", validate("email"), forgotPassword)
    .post("/reset-password", validate("password"), resetPassword);

module.exports = router;

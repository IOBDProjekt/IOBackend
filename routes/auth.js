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
    emailCheck,
    decodeEmail,
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
    .post("/email-verification", validate("email"), emailCheck)
    .post("/email", decodeEmail)
    .post("/reset-password", validate("password"), resetPassword);

module.exports = router;

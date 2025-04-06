const db = require("../db.js");

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const authenticate = require("../middleware/authenticate.js");
const {
    register,
    login,
    me,
    forgotPassword,
    resetPassword,
} = require("../controllers/authController.js");

router
    .post("/register", register)
    .post("/login", login)
    .get("/me", authenticate, me)
    .post("/forgot-password", forgotPassword)
    .post("/reset-password", resetPassword);

module.exports = router;

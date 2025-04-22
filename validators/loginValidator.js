const { body } = require("express-validator");

module.exports = [
    body("password").trim().notEmpty().withMessage("Empty password provided"),
    body("username").trim().notEmpty().withMessage("Empty username provided"),
];

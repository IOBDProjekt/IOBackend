const { body } = require("express-validator");

module.exports = [
    body("password").trim().notEmpty().withMessage("Empty password provided"),
    body("email").trim().isEmail().withMessage("Invalid email provided"),
];

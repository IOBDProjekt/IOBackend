const { body } = require("express-validator");

module.exports = [
    body("password").trim().notEmpty().withMessage("Empty password provided"),
    body("login").trim().notEmpty().withMessage("Empty username provided"),
    body("name").trim().isLength({ min: 5 }).withMessage("Name is too short"),
];

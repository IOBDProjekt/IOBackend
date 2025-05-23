const { body } = require("express-validator");

module.exports = [
    body("email").isEmail().withMessage("Invalid email provided"),
    body("password").notEmpty().withMessage("Empty password provided"),
    body("city").notEmpty().withMessage("Empty address provided"),
    body("firstname").notEmpty().withMessage("Empty firstname provided"),
    body("lastname").notEmpty().withMessage("Empty lastname provided"),
];

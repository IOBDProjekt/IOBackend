const { body } = require("express-validator");

module.exports = [
    body("email")
        .trim()
        .isEmail()
        .notEmpty()
        .withMessage("Invalid email provided"),
];

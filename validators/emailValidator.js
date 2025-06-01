const { body } = require("express-validator");

module.exports = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Wprowadzono nieprawidłowy adres email"),
];

const { body } = require("express-validator");

module.exports = [
    body("password").trim().notEmpty().withMessage("Hasło jest wymagane"),
    body("email").trim().isEmail().withMessage("Podano błędny email"),
];

const { body } = require("express-validator");

module.exports = [
    body("email").isEmail().withMessage("Niepoprawny adres email"),
    body("password").notEmpty().withMessage("Hasło nie może być puste"),
    body("city").notEmpty().withMessage("Miasto nie może być puste"),
    body("firstname").notEmpty().withMessage("Imię nie może być puste"),
    body("lastname").notEmpty().withMessage("Nazwisko nie może być puste"),
];

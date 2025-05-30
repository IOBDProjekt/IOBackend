const { body } = require("express-validator");

module.exports = [
    body("name").trim().notEmpty().withMessage("Podano pustą nazwę schroniska"),
    body("city").trim().notEmpty().withMessage("Podano pusty adres schroniska"),
    body("email").trim().isEmail().withMessage("Podano nieprawidłowy adres email schroniska"),
];

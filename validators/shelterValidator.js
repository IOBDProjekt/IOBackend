const { body } = require("express-validator");

module.exports = [
    body("name").trim().notEmpty().withMessage("Empty shelter name provided"),
    body("city")
        .trim()
        .notEmpty()
        .withMessage("Empty shelter address provided"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Invalid shelter email provided"),
];

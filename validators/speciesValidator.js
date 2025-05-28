const { body } = require("express-validator");

module.exports = [
    body("name").trim().notEmpty().withMessage("Empty species name provided"),
];

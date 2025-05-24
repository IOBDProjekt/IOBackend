const { body } = require("express-validator");

module.exports = [
    body("name").trim().notEmpty().withMessage("Empty breed name provided"),
    body("id_species").trim().isNumeric("Invalid species ID provided"),
];

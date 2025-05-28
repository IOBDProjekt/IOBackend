const { body } = require("express-validator");

module.exports = [
    body("character").notEmpty().withMessage("No character provided"),
];

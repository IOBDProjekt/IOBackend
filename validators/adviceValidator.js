const { body } = require("express-validator");

module.exports = [
    body("title").notEmpty().withMessage("No title provided"),
    body("content").notEmpty().withMessage("No content provided"),
    body("type").notEmpty().withMessage("No type provided"),
];

const { body } = require("express-validator");

module.exports = [
    body("title").notEmpty().withMessage("Tytuł jest wymagany"),
    body("content").notEmpty().withMessage("Treść jest wymagana"),
    body("type").notEmpty().withMessage("Nie wybrano typu porady"),
];

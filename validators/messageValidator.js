const { body } = require("express-validator");

module.exports = [
    body("content").notEmpty().withMessage("Treść jest wymagana"),
];

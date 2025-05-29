const { body } = require("express-validator");

module.exports = [
    body("name").trim().notEmpty().withMessage("Rasa zwierzęcia jest wymagana"),
    body("id_species").trim().isNumeric().withMessage("Błędne ID rasy"),
];

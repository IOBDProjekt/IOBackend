const { body } = require("express-validator");

module.exports = [
    body("name")
        .optional()
        .isLength({ max: 50 })
        .withMessage("Imię zwierzaka nie może przekraczać 50 znaków."),

    body("id_species")
        .notEmpty()
        .withMessage("id_species jest wymagane.")
        .isInt({ min: 1 })
        .withMessage("id_species musi być liczbą całkowitą większą od 0."),

    body("id_breed")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage("id_breed musi być liczbą całkowitą większą od 0."),

    body("age")
        .optional()
        .isLength({ max: 10 })
        .withMessage("Wiek nie może przekraczać 10 znaków."),

    body("sex")
        .optional()
        .isLength({ max: 10 })
        .withMessage("Płeć nie może przekraczać 10 znaków."),

    body("condition")
        .optional()
        .isLength({ max: 30 })
        .withMessage("Stan zdrowia nie może przekraczać 30 znaków."),

    body("status")
        .notEmpty()
        .withMessage("Status jest wymagany.")
        .isLength({ max: 30 })
        .withMessage("Status nie może przekraczać 30 znaków."),

    body("id_shelter")
        .notEmpty()
        .withMessage("id_shelter jest wymagane.")
        .isInt({ min: 1 })
        .withMessage("id_shelter musi być liczbą całkowitą większą od 0."),

    body("id_image")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage("id_image musi być liczbą całkowitą większą od 0."),

    body("id_tag")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage("id_tag musi być liczbą całkowitą większą od 0."),
];

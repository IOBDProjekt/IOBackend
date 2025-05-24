const express = require("express");
const router = express.Router();

const {
    authenticate,
    authorizeRole,
} = require("../middleware/authenticate.js");
const { validate } = require("../middleware/validate.js");
const {
    addNewSpecies,
    changeSpeciesName,
    allSpecies,
} = require("../controllers/speciesController.js");

router
    .post(
        "/",
        authenticate,
        authorizeRole("admin"),
        validate("species"),
        addNewSpecies
    )
    .put(
        "/:id",
        authenticate,
        authorizeRole("admin"),
        validate("species"),
        changeSpeciesName
    )
    .get("/", allSpecies);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
    authenticate,
    authorizeRole,
} = require("../middleware/authenticate.js");
const { validate } = require("../middleware/validate.js");
const {
    addNewBreed,
    allBreeds,
    changeBreedName,
} = require("../controllers/breedController.js");

router
    .post(
        "/",
        authenticate,
        authorizeRole("admin"),
        validate("breed"),
        addNewBreed
    )
    .put(
        "/:id",
        authenticate,
        authorizeRole("admin"),
        validate("species"),
        changeBreedName
    )
    .get("/", allBreeds);

module.exports = router;

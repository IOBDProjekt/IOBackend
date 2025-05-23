const express = require("express");
const router = express.Router();

const {
    authenticate,
    authorizeRole,
} = require("../middleware/authenticate.js");
const { validate } = require("../middleware/validate.js");
const {
    allFavourite,
    newFavourite,
    removeFavourite,
} = require("../controllers/favouriteController.js");

router
    .get("/", authenticate, allFavourite)
    .delete("/:id", authenticate, removeFavourite)
    .post("/", authenticate, newFavourite);

module.exports = router;

const express = require("express");
const router = express.Router();

const { authenticate, authorizeRole } = require("../middleware/authenticate.js");
const { validate } = require("../middleware/validate.js");
const {
    allFavourite,
    newFavourite,
    removeFavourite,
    checkFavourite,
} = require("../controllers/favouriteController.js");

router
    .get("/", authenticate, allFavourite)
    .delete("/:id", authenticate, removeFavourite)
    .post("/", authenticate, newFavourite)
    .post("/check", authenticate, checkFavourite);

module.exports = router;

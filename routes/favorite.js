// routes/favoriteRoute.js
const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authenticate.js");
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/favoriteController.js");

router.post("/", authenticate, addFavorite);

router.get("/", authenticate, getFavorites);

// Zmieniono :animalId na :petId
router.delete("/:petId", authenticate, removeFavorite);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
	authenticate,
	authorizeRole,
} = require("../middleware/authenticate.js");
const { validate } = require("../middleware/validate.js");
const {
	addPet,
	allPets,
	changePetData,
} = require("../controllers/petController.js");

router
	.post("/", authenticate, validate("pet"), addPet)
	.get("/", allPets)
	.put("/:id", authenticate, changePetData);

module.exports = router;

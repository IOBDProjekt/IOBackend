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
	.post("/", authenticate, authorizeRole("shelter"), validate("Pet"), addPet)
	.get("/", allPets)
	.put("/:id", authenticate, authorizeRole("shelter"), changePetData);

module.exports = router;

const express = require("express");
const router = express.Router();

const { authenticate, authorizeRole } = require("../middleware/authenticate.js");
const { validate } = require("../middleware/validate.js");
const { addShelter, updateShelter, allShelters, assignUserToShelter } = require("../controllers/shelterController.js");

router
    .post("/", authenticate, authorizeRole("admin"), validate("shelter"), addShelter)
    .put("/:id", authenticate, authorizeRole("admin"), validate("shelter"), updateShelter)
    .get("/", allShelters)
    .post("/assign", authenticate, authorizeRole("admin"), assignUserToShelter);

module.exports = router;

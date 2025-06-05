const express = require("express");
const router = express.Router();

const { authenticate, authorizeRole } = require("../middleware/authenticate.js");
const { addAdoptionForm, getAllAdoptionForms } = require("../controllers/adoptionFormController.js");

router.post("/request", addAdoptionForm).get("/", authenticate, getAllAdoptionForms);

module.exports = router;

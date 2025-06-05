const express = require("express");
const router = express.Router();

const { addAdvice, updateAdvice, getAdvice, getAllAdvices, getShelterAdvices } = require("../controllers/adviceController");
const { authenticate, authorizeRole } = require("../middleware/authenticate");
const { validate } = require("../middleware/validate.js");

router
    .get("/all", authenticate, getAllAdvices)
    .get("/shelter", authenticate, authorizeRole("shelter"), getShelterAdvices)
    .get("/:id", authenticate, authorizeRole("shelter"), getAdvice)
    .post("/", authenticate, authorizeRole("shelter"),  validate("advice"),  addAdvice)
    .put("/:id", authenticate, authorizeRole("shelter"), updateAdvice)

module.exports = router;

const express = require("express");
const router = express.Router();

const { addAdvice, updateAdvice } = require("../controllers/adviceController");
const { authenticate, authorizeRole } = require("../middleware/authenticate");
const { validate } = require("../middleware/validate.js");

router
    .get("/", authenticate, authorizeRole("shelter"), getAdvices)
    .get("/:id", authenticate, authorizeRole("shelter"), getAdvice)
    .post("/", authenticate, authorizeRole("shelter"),  validate("advice"),  addAdvice)
    .put("/:id", authenticate, authorizeRole("shelter"), updateAdvice)

module.exports = router;

const express = require("express");
const router = express.Router();

const { addAdvice } = require("../controllers/adviceController");

router
    .post("/add",  addAdvice)

module.exports = router;

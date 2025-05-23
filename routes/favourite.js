const express = require("express");
const router = express.Router();

const {
    authenticate,
    authorizeRole,
} = require("../middleware/authenticate.js");
const { validateLogin, validateShelter } = require("../middleware/validate.js");
const {
    login,
    info,
    createShelter,
} = require("../controllers/adminController.js");

router
    .post("/login", validateLogin, login)
    .post(
        "/shelter",
        authenticate,
        authorizeRole("admin"),
        validateShelter,
        createShelter
    )
    .get("/info", authenticate, info);

module.exports = router;

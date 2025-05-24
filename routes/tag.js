const express = require("express");
const router = express.Router();

const {
    authenticate,
    authorizeRole,
} = require("../middleware/authenticate.js");
const { validate } = require("../middleware/validate.js");
const {
    addTag,
    updateTag
} = require("../controllers/tagController.js");

router
    .post("/", authenticate, authorizeRole("admin"),  validate("tag"), addTag)
    .put(
        "/:id",
        authenticate,
        authorizeRole("admin"),
        validate("tag"),
        updateTag
    )

module.exports = router;

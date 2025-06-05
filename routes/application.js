const express = require("express");
const router = express.Router();

const { acceptApplication, createApplication, getAllApplications, getPendingApplications, rejectApplication } = require("../controllers/applicationController.js");
const { authenticate, authorizeRole } = require("../middleware/authenticate");
const { validate } = require("../middleware/validate.js");

router
    .post("/", createApplication)
    .get("/", authenticate, authorizeRole("admin"), getAllApplications)
    .get("/pending", authenticate, authorizeRole("admin"), getPendingApplications)
    .post("/:id/accept", authenticate, authorizeRole("admin"), acceptApplication)
    .post("/:id/reject", authenticate, authorizeRole("admin"),  rejectApplication)

module.exports = router;

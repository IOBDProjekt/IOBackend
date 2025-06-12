// routes/adoptionForm.js
const express = require("express");
const router = express.Router();
const {
  authenticate,
  authorizeRole,
} = require("../middleware/authenticate.js");
const {
  addAdoptionForm,
  getAllAdoptionForms,
  rejectAdoptionForm,
  acceptAdoptionForm,
} = require("../controllers/adoptionFormController.js");

// tworzenie wniosku
router.post("/request", addAdoptionForm);

// pobranie wszystkich (tylko dla zalogowanego shelter)
router.get("/", authenticate, getAllAdoptionForms);

// odrzucenie wniosku
router.post(
  "/:id/reject",
  authenticate,
  authorizeRole("shelter"),
  rejectAdoptionForm
);

// akceptacja wniosku
router.post(
  "/:id/accept",
  authenticate,
  authorizeRole("shelter"),
  acceptAdoptionForm
);

module.exports = router;

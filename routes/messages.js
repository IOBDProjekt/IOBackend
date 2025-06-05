const express = require("express");
const router = express.Router();

const { addMessage, getMessagesTogether, getMessagesUser } = require("../controllers/messageControler.js");
const { authenticate, authorizeRole } = require("../middleware/authenticate");
const { validate } = require("../middleware/validate.js");

router
    .get("/thread", authenticate, getMessagesTogether)
    .get("/me", authenticate, getMessagesUser)
    .post("/", authenticate, validate("messages"), addMessage)
module.exports = router;
 
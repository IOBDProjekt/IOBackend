const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
	addNewImage,
	changeImageData,
	getImageByID,
} = require("../controllers/imageController.js");

const upload = multer({ storage: multer.memoryStorage() });

router
	.post("", upload.single("image"), addNewImage)
	.get("/:id", getImageByID)
	.put("/:id", upload.single("image"), changeImageData);

module.exports = router;

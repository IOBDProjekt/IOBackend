const db = require("../db.js");

const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/sendImage", upload.single("image"), async (req, res) => {
	if (!req.file) res.statusMessage(400).send("No file uploaded.");

	const { originalname, encoding, mimetype, size, buffer } = req.file;

	try {
		await db.query(
			`
            INSERT INTO images (Name, Encoding, Mimetype, Size, ImageData)
            VALUES (?, ?, ?, ?, ?)
            `,
			[originalname, encoding, mimetype, size, buffer],
		);

		return res.status(201).json({
			message: "Image uploaded successfully",
		});
	} catch (error) {
		return res.status(500).json(error);
	}
});

router.get("/getImage/:fileName", async (req, res) => {
	const { fileName } = req.params;

	try {
		const [rows] = await db.query(
			`
            SELECT * FROM images WHERE images.name = ?
            `,
			[fileName],
		);

		const file = rows[0];
		console.log(file);

		res.setHeader("Content-Type", file.Mimetype);
		res.setHeader("Content-Disposition", 'inline; filename="${file.Name}"');
		return res.status(201).send(file.ImageData);
	} catch (error) {
		return res.status(500).json(error);
	}
});
module.exports = router;

const db = require("../db.js");

const express = require("express");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("", upload.single("image"), async (req, res) => {
	if (!req.file) res.status(StatusCodes.BAD_REQUEST).send("No file uploaded.");

	const { originalname, encoding, mimetype, size, buffer } = req.file;

	try {
		const result = await db.execute(
			`
            INSERT INTO images (name, encoding, mimetype, size, data)
            VALUES (?, ?, ?, ?, ?)
            `,
			[originalname, encoding, mimetype, size, buffer],
		);

		console.log(result);
		return res.status(StatusCodes.CREATED).json({
			message: "Image uploaded successfully",
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const [rows] = await db.execute(
			`
            SELECT name,encoding, mimetype,size, data FROM images WHERE images.id_image = ?
            `,
			[id],
		);

		const file = rows[0];
		console.log(file);

		res.setHeader("Content-Type", file.mimetype);
		res.setHeader("Content-Disposition", 'inline; filename="${file.name}"');
		return res.status(StatusCodes.CREATED).send(file.data);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
});
module.exports = router;

const db = require("../db.js");

const express = require("express");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/sendImage", upload.single("image"), async (req, res) => {
    if (!req.file)
        res.statusMessage(StatusCodes.BAD_REQUEST).send("No file uploaded.");

    const { originalname, encoding, mimetype, size, buffer } = req.file;

    try {
        await db.execute(
            `
            INSERT INTO images (Name, Encoding, Mimetype, Size, ImageData)
            VALUES (?, ?, ?, ?, ?)
            `,
            [originalname, encoding, mimetype, size, buffer]
        );

        return res.status(StatusCodes.CREATED).json({
            message: "Image uploaded successfully",
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});

router.get("/getImage/:fileName", async (req, res) => {
    const { fileName } = req.params;

    try {
        const [rows] = await db.execute(
            `
            SELECT * FROM images WHERE images.name = ?
            `,
            [fileName]
        );

        const file = rows[0];
        console.log(file);

        res.setHeader("Content-Type", file.Mimetype);
        res.setHeader("Content-Disposition", 'inline; filename="${file.Name}"');
        return res.status(StatusCodes.CREATED).send(file.ImageData);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});
module.exports = router;

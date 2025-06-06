const { StatusCodes } = require("http-status-codes");
const ImageService = require("../services/imageService.js");

const addNewImage = async (req, res) => {
	if (!req.file) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "No file uploaded." }); 
	}

	const imageData = {
		name: req.file.originalname,
		encoding: req.file.encoding,
		mimetype: req.file.mimetype,
		size: req.file.size,
		data: req.file.buffer,
	};

	try {
		const savedImage = await ImageService.createImage(imageData);

		return res.status(StatusCodes.CREATED).json({
			id_image: savedImage.id_image,
			message: "Image uploaded successfully",
		});
	} catch (error) {
		console.error("Błąd przy tworzeniu obrazka:", error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: error.message || "Server error while creating image",
		});
	}
};

const changeImageData = async (req, res) => {
	if (!req.file) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "No file uploaded." });
	}

	const imageData = {
		name: req.file.originalname,
		encoding: req.file.encoding,
		mimetype: req.file.mimetype,
		size: req.file.size,
		data: req.file.buffer,
	};

	const imageID = req.params.id;

	try {
		await ImageService.changeImageData(imageID, imageData);

		return res.status(StatusCodes.OK).json({
			id_image: imageID,
			message: "Image data updated successfully",
		});
	} catch (error) {
		console.error("Błąd przy aktualizacji obrazka:", error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: error.message || "Server error while updating image",
		});
	}
};

const getImageByID = async (req, res) => {
	const { id } = req.params;

	try {
		const image = await ImageService.getImageByID(id);

		if (!image) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "Image not found" });
		}

		res.setHeader("Content-Type", image.mimetype);
		res.setHeader("Content-Disposition", `inline; filename="${image.name}"`);

		return res.status(StatusCodes.OK).send(image.data);
	} catch (error) {
		console.error("Błąd przy pobieraniu obrazka:", error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: error.message || "Server error while retrieving image",
		});
	}
};

module.exports = {
	addNewImage,
	changeImageData,
	getImageByID,
};

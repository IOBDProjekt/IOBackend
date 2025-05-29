const { StatusCodes } = require("http-status-codes");
const ImageService = require("../services/imageService.js");

const addNewImage = async (req, res) => {
	if (!req.file) res.status(StatusCodes.BAD_REQUEST).send("No file uploaded.");

	const imageData = {
		name: req.file.originalname,
		encoding: req.file.encoding,
		mimetype: req.file.mimetype,
		size: req.file.size,
		data: req.file.buffer,
	};

	try {
		await ImageService.createImage(imageData);
		return res.status(StatusCodes.CREATED).json({
			message: "Image uploaded successfully",
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

const changeImageData = async (req, res) => {
	if (!req.file) res.status(StatusCodes.BAD_REQUEST).send("No file uploaded.");

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

		return res.status(StatusCodes.CREATED).json({
			message: "Image data updated successfully",
		});
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message });
	}
};

const getImageByID = async (req, res) => {
	const { id } = req.params;

	try {
		const image = await ImageService.getImageByID(id);
		if (image === null)
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "Image not found" });

		res.setHeader("Content-Type", image.mimetype);
		res.setHeader("Content-Disposition", 'inline; filename="${image.name}"');
		return res.status(StatusCodes.CREATED).send(image.data);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

module.exports = {
	addNewImage,
	changeImageData,
	getImageByID,
};

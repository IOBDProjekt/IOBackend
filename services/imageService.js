const { Image } = require("../models");

const createImage = async (imageData) => {
	const breed = await Image.create(imageData);
	return breed.toJSON();
};

const changeImageData = async (imageID, imageData) => {
	await Image.update(imageData, { where: { id_image: imageID } });
};

const getImageByID = async (imageID) => {
	return Image.findOne({ where: { id_image: imageID } });
};

module.exports = { createImage, changeImageData, getImageByID };

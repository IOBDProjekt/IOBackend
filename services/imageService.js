const Image = require("../models/Image")

async function createImage({ name, encoding, mimetype, size, data }) {
    const image = await Image.create({name, encoding, mimetype, size, data });
    return { id_image: image.id_image };
}

async function changeImageData(id_image, { name, encoding, mimetype, size, data }) { 

    const [updatedRows] = await Image.update(
        {name, encoding, mimetype, size, data, created_at: new Date() },
        {where: { id_image }}
    );

    if (updatedRows === 0) {
        throw new Error("Image not found")
    }
}

async function getImageByID(id_image) {

    const image = await Image.findByPk(id_image, {
        attributes: ['name', 'mimetype', 'data'],
    });

    if (!image) return null;

    return {
        name: image.name,
        mimetype: image.mimetype,
        data: image.data
    }
}

module.exports = {
    createImage,
    changeImageData,
    getImageByID,
};

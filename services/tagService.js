const Tag = require("../models/Tag");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const createTag = async (tagData) => {
    const existingTag = await Tag.findOne({
        where: {
            character: tagData.character,
        },
    });

    if (existingTag) {
        throw new Error("Tag already in database");
    }

    const tag = await Tag.create(tagData);

    return tag.toJSON();
};

const updateTag = async (tagID, newName) => {
    const tagToUpdate = await Tag.findByPk(tagID);
    if (!tagToUpdate) {
        throw new Error("Original tag not found");
    }

    const existingTag = await Tag.findOne({
        where: {
            character: newName,
        },
    });

    if (existingTag) throw new Error("Tag exist");

    await Tag.update({ character: newName }, { where: { id_tag: tagID } });
};

const getAllTags = async () => {
    const tags = await Tag.findAll();

    return tags;
};

module.exports = {
    createTag,
    updateTag,
    getAllTags,
};

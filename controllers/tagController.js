const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

const { StatusCodes } = require("http-status-codes");

const resend = new Resend(process.env.RESEND_API_KEY);

const TagService = require("../services/tagService.js");

const addTag = async (req, res) => {
    const tagData = {
        character: req.body.character,
    };

    try {
        const newTag = await TagService.createTag(tagData);

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "Tag created successfully", tag: newTag });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const updateTag = async (req, res) => {
    const tagData = {
        id_tag: req.params.id,
        character: req.body.character
    };

    try {
        const newTag = await TagService.updateTag(tagData.id_tag, tagData.character);

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "Tag updated successfully", tag: newTag });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

module.exports = {
    addTag,
    updateTag
};

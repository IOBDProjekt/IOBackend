const { StatusCodes } = require("http-status-codes");

const TagService = require("../services/tagService.js");

const addTag = async (req, res) => {
    const tagData = {
        character: req.body.character,
    };

    try {
        const newTag = await TagService.createTag(tagData);

        return res.status(StatusCodes.CREATED).json({ message: "Tag created successfully", tag: newTag });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const updateTag = async (req, res) => {
    const tagData = {
        id_tag: req.params.id,
        character: req.body.character,
    };

    try {
        const newTag = await TagService.updateTag(tagData.id_tag, tagData.character);

        return res.status(StatusCodes.CREATED).json({ message: "Tag updated successfully", tag: newTag });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const getTags = async (req, res) => {
    try {
        const tags = await TagService.getAllTags();
        return res.json({ tags: tags });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

module.exports = {
    addTag,
    updateTag,
    getTags,
};

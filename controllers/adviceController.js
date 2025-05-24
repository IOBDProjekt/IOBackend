const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const AdviceService = require("../services/adviceService.js");

const { StatusCodes } = require("http-status-codes");

const addAdvice = async (req, res) => {
    const adviceData = {
        title: req.body.title,
        content: req.body.content,
        type: req.body.type
    };



    try {
        const newAdvice = await AdviceService.createAdvice(adviceData);

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "Advice added successfully", newAdvice });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const updateAdvice = async (req, res) => {
    const adviceData = {
        title: req.body.title,
        content: req.body.content,
    };

    const newTag = await TagService.updateTag(tagData.id_tag, tagData.character);

    if (adviceData.content) {
        
    }
    if (adviceData.title){

    }

}

module.exports = {
    addAdvice,
    updateAdvice,
};

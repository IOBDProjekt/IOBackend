const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const AdviceService = require("../services/adviceService.js");
const ShelterService = require("../services/shelterService.js")

const { StatusCodes } = require("http-status-codes");

const addAdvice = async (req, res) => {
    const adviceData = {
        title: req.body.title,
        content: req.body.content,
        type: req.body.type
    };

    try {
        const shelterID = await ShelterService.getShelterIdByUserID(req.authData["id_user"]);

        adviceData["id_shelter"] = shelterID;

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
        id_advice: req.params.id
    };

    console.log(req.params.id);

    try {
        const shelterID = await ShelterService.getShelterIdByUserID(req.authData["id_user"]);
        adviceData["id_shelter"] = shelterID;

        let updatedAdvice;

        if (adviceData.content) {
            updatedAdvice = await AdviceService.updateAdviceContent(adviceData);
        }
        if (adviceData.title){
            updatedAdvice = await AdviceService.updateAdviceTitle(adviceData);
        }

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "Advice updated successfully", updatedAdvice });
    }
    catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }

}

const getAdvices = async (req, res) => {
    try {
        const shelterID = await ShelterService.getShelterIdByUserID(req.authData.id_user);
        const advices = await AdviceService.getAllAdvices(shelterID);
        return res
            .status(StatusCodes.OK)
            .json({ advices });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const getAdvice = async (req, res) => {
    try {
        const shelterID = await ShelterService.getShelterIdByUserID(req.authData.id_user);
        const advice = await AdviceService.getAdviceById(req.params.id, shelterID);
        return res
            .status(StatusCodes.OK)
            .json({ advice });
    } catch (error) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: error.message });
    }
};

module.exports = {
    addAdvice,
    updateAdvice,
    getAdvices,  
    getAdvice, 
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const ShelterService = require("../services/shelterService.js");

const { StatusCodes } = require("http-status-codes");

const addShelter = async (req, res) => {
    const shelterData = {
        name: req.body.name,
        city: req.body.city,
        number: req.body.number,
        email: req.body.email,
    };

    try {
        const newShelter = await ShelterService.createShelter(shelterData);

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "Shelter added successfully", newShelter });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

module.exports = {
    addShelter,
};

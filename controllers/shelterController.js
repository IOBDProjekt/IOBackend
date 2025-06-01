const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

        return res.status(StatusCodes.CREATED).json({ message: "Pomyślnie dodano schronisko", newShelter });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const updateShelter = async (req, res) => {
    const shelterData = {
        name: req.body.name,
        city: req.body.city,
        number: req.body.number,
        email: req.body.email,
    };

    const shelterID = req.params.id;

    try {
        const newShelter = await ShelterService.updateShelter(shelterID, shelterData);

        return res.status(StatusCodes.CREATED).json({ message: "Pomyślnie zapisano zmiany", newShelter });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const allShelters = async (req, res) => {
    try {
        const shelters = await ShelterService.getAllShelters();

        return res.json({ shelters: shelters });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const assignUserToShelter = async (req, res) => {
    const userID = req.body["id_user"];
    const shelterID = req.body["id_shelter"];

    try {
        await ShelterService.assignUserToShelter(userID, shelterID);
        return res.json({ message: "Pomyślnie przypisano konto do schroniska" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

module.exports = {
    addShelter,
    updateShelter,
    allShelters,
    assignUserToShelter,
};

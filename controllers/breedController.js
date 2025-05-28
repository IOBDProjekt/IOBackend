const { StatusCodes } = require("http-status-codes");
const BreedService = require("../services/breedService");

const addNewBreed = async (req, res) => {
    const breedName = req.body.name;
    const speciesID = req.body["id_species"];

    try {
        const breed = await BreedService.createBreed(breedName, speciesID);

        return res.status(StatusCodes.CREATED).json({
            message: "New breed created successfully",
            breed: breed,
        });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const changeBreedName = async (req, res) => {
    const breedName = req.body.name;
    const breedID = req.params.id;

    try {
        const breed = await BreedService.renameBreed(breedID, breedName);

        return res.status(StatusCodes.CREATED).json({
            message: "Breed renamed successfully",
        });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const allBreeds = async (req, res) => {
    try {
        const breeds = await BreedService.getAllBreeds();

        return res.json({ breeds: breeds });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

module.exports = {
    addNewBreed,
    changeBreedName,
    allBreeds,
};

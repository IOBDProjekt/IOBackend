const { StatusCodes } = require("http-status-codes");
const SpeciesService = require("../services/speciesService");

const addNewSpecies = async (req, res) => {
    const speciesName = req.body.name;

    try {
        const species = await SpeciesService.createSpecies(speciesName);

        return res.status(StatusCodes.CREATED).json({
            message: "New species created successfully",
            species: species,
        });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const changeSpeciesName = async (req, res) => {
    const speciesName = req.body.name;
    const speciesID = req.params.id;

    try {
        const species = await SpeciesService.renameSpecies(
            speciesID,
            speciesName
        );

        return res.status(StatusCodes.CREATED).json({
            message: "Species renamed successfully",
        });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const allSpecies = async (req, res) => {
    try {
        const species = await SpeciesService.getAllSpecies();

        return res.json({ species: species });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

module.exports = {
    addNewSpecies,
    changeSpeciesName,
    allSpecies,
};

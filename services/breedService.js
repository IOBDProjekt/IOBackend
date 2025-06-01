const { Breed } = require("../models");

const createBreed = async (name, speciesID) => {
    const existingBreed = await Breed.findOne({
        where: {
            name: name,
        },
    });

    if (existingBreed) throw new Error("This Breed already exists");

    const breed = await Breed.create({ name: name, id_species: speciesID });

    return breed.toJSON();
};

const renameBreed = async (breedID, name) => {
    const existingBreed = await Breed.findOne({
        where: {
            name: name,
        },
    });

    if (existingBreed)
        throw new Error("Breed with provided name already exists");

    await Breed.update({ name: name }, { where: { id_breed: breedID } });
};

const getAllBreeds = async () => {
    const breeds = await Breed.findAll();

    return breeds;
};

module.exports = { createBreed, renameBreed, getAllBreeds };

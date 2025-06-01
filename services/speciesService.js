const { Species } = require("../models");

const createSpecies = async (name) => {
    const existingSpecies = await Species.findOne({
        where: {
            name: name,
        },
    });

    if (existingSpecies) throw new Error("This species already exists");

    const species = await Species.create({ name: name });

    return species.toJSON();
};

const renameSpecies = async (speciesID, name) => {
    const existingSpecies = await Species.findOne({
        where: {
            name: name,
        },
    });

    if (existingSpecies)
        throw new Error("Species with provided name already exists");

    await Species.update({ name: name }, { where: { id_species: speciesID } });
};

const getAllSpecies = async () => {
    const allSpecies = await Species.findAll();

    return allSpecies;
};

module.exports = { createSpecies, renameSpecies, getAllSpecies };

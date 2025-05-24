const Shelter = require("../models/Shelter");

const createShelter = async (shelterData) => {

    const shelter = await Shelter.create(shelterData);

    return shelter.toJSON();
};

module.exports = {
    createShelter
};

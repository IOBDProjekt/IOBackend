const { Shelter, User } = require("../models");

const createShelter = async (shelterData) => {
    const shelter = await Shelter.create(shelterData);

    return shelter.toJSON();
};

const assignUserToShelter = async (userID, shelterID) => {
    Shelter.update({ id_user: userID }, { where: { id_shelter: shelterID } });
};

const updateShelter = async (shelterID, shelterData) => {
    await Shelter.update(shelterData, { where: { id_shelter: shelterID } });
};

const getAllShelters = async () => {
    return Shelter.findAll({ include: [{ model: User, as: "user" }] });
};

const getShelterIdByUserID = async (userID) => {
    const shelter = await Shelter.findOne({ where: { id_user: userID } });

    if (!shelter) throw new Error("Shelter not found");

    return shelter.toJSON()["id_shelter"];
};

module.exports = {
    createShelter,
    updateShelter,
    getAllShelters,
    assignUserToShelter,
    getShelterIdByUserID,
};

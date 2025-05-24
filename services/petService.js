const { Pet } = require("../models");
const { ShelterService } = require("./shelterService");

const createPet = async (petData) => {
	const pet = await Pet.create(petData);

	return pet.toJSON();
};

const getAllPets = async () => {
	return Pet.findAll();
};

const changePetData = async (petID, petData) => {
	await Pet.update(petData, { where: { id_pet: petID } });
};

const getAllPetsByUserID = async (userID) => {
	const shelterID = await ShelterService.getShetlerIdByUserID(userID);

	const pets = await Pet.findAll({ where: { id_shelter: shelterID } });
	return pets.toJSON();
};

module.exports = {
	createPet,
	getAllPets,
	changePetData,
	getAllPetsByUserID,
};

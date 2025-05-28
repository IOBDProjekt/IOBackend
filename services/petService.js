const { Pet } = require("../models");
const { PetTag } = require("../models");
const { ShelterService } = require("./shelterService");

const createPet = async (petData) => {
	const tags = petData.tags;
	delete petData.tags;

	const pet = await Pet.create(petData);
	tags.forEach(async (tagID) => {
		await PetTag.create({ id_pet: pet.id_pet, id_tag: tagID });
	});

	return pet.toJSON();
};

const getAllPets = async () => {
	const pets = await Pet.findAll();

	const petsWithTags = await Promise.all(
		pets.map(async (pet) => {
			const tags = await PetTag.findAll({
				attributes: ["id_tag"],
				where: { id_pet: pet.id_pet },
			});

			pet = pet.toJSON();
			pet.tags = tags.map((t) => t.id_tag);

			return pet;
		}),
	);
	return petsWithTags;
};

const changePetData = async (petID, petData) => {
	const tags = petData.tags;
	delete petData.tags;

	console.log(tags);
	if (tags !== undefined) {
		await PetTag.destroy({ where: { id_pet: petID } });
		await Promise.all(
			tags.map(async (tagID) => {
				await PetTag.create({ id_pet: petID, id_tag: tagID });
			}),
		);
	}
	await Pet.update(petData, { where: { id_pet: petID } });
};

const getAllPetsByUserID = async (userID) => {
	const shelterID = await ShelterService.getShetlerIdByUserID(userID);
	const pets = await Pet.findAll({ where: { id_shelter: shelterID } });

	const petsWithTags = await Promise.all(
		pets.map(async (pet) => {
			const tags = await PetTag.findAll({
				attributes: ["id_tag"],
				where: { id_pet: pet.id_pet },
			});

			pet = pet.toJSON();
			pet.tags = tags.map((t) => t.id_tag);

			return pet;
		}),
	);
	return petsWithTags;
};

module.exports = {
	createPet,
	getAllPets,
	changePetData,
	getAllPetsByUserID,
};

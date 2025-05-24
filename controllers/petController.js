const { StatusCodes } = require("http-status-codes");
const PetService = require("../services/petService");
const { condition } = require("sequelize");

const addPet = async (req, res) => {
	const petData = {
		name: req.body.name,
		speciesID: req.body["id_species"],
		breedID: req.body["id_breed"],
		age: req.body.age,
		sex: req.body.sex,
		condition: req.body.condition,
		status: req.body.status,
		shelterID: req.body["id_shelter"],
		imageID: req.body["id_shelter"],
		tagID: req.body["id_tag"],
	};

	try {
		const pet = await PetService.createPet(petData);

		return res.status(StatusCodes.CREATED).json({
			message: "New pet created successfully",
			pet: pet,
		});
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message });
	}
};

const allPets = async (req, res) => {
	try {
		const pets = await PetService.getAllPets();

		return res.json({ pets: pets });
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message });
	}
};

const changePetData = async (req, res) => {
	const petData = {
		name: req.body.name,
		id_species: req.body["id_species"],
		id_breed: req.body["id_breed"],
		age: req.body.age,
		sex: req.body.sex,
		condition: req.body.condition,
		status: req.body.status,
		id_shelter: req.body["id_shelter"],
		id_image: req.body["id_image"],
		id_tag: req.body["id_tag"],
	};
	const petID = req.params.id;

	try {
		await PetService.changePetData(petID, petData);

		return res.status(StatusCodes.CREATED).json({
			message: "Pet data changed successfully",
		});
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message });
	}
};

module.exports = {
	addPet,
	allPets,
	changePetData,
};

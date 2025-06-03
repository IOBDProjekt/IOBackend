const { StatusCodes } = require("http-status-codes");
const PetService = require("../services/petService");
const { condition } = require("sequelize");

const addPet = async (req, res) => {
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
		tags: req.body.tagIDs,
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
const getAllPetsByUserID = async (req, res) => {
	try {
		const userID = req.params.id;
		const pets = await PetService.getAllPetsByUserID(userID);
		return res.json({ pets: pets });
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message });
	}
};

const getPetByID = async (req, res) => {
	try {
		const petID = req.params.id;
		const pets = await PetService.getByID(petID);
		return res.json({ pets: pets });
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message });
	}
};
const activePets = async (req, res) => {
	try {
		const pets = await PetService.getActivePets();

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
		tags: req.body.tagIDs,
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
	activePets,
	getAllPetsByUserID,
	getPetByID,
};

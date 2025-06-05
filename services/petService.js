const { Pet, PetTag, Tag, Species, Shelter, Breed } = require("../models");
const ShelterService = require("./shelterService");

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
    const pets = await Pet.findAll({
        include: [
            { model: Species, as: "species", attributes: ["name"] },
            { model: Breed, as: "breed", attributes: ["name"] },
            { model: Shelter, as: "shelter", attributes: ["name"] },
            {
                model: Tag,
                as: "tags",
                attributes: ["character"],
                through: { attributes: [] },
            },
        ],
    });

    return pets;
};

const getByID = async (petID) => {
    const pets = await Pet.findAll({
        where: { id_pet: petID },
        include: [
            { model: Species, as: "species", attributes: ["name"] },
            { model: Breed, as: "breed", attributes: ["name"] },
            { model: Shelter, as: "shelter" },
            {
                model: Tag,
                as: "tags",
                attributes: ["character"],
                through: { attributes: [] },
            },
        ],
    });
    return pets;
};

const getActivePets = async () => {
    const pets = await Pet.findAll({
        where: { status: "Do oddania" },
        include: [
            { model: Species, as: "species", attributes: ["name"] },
            { model: Breed, as: "breed", attributes: ["name"] },
            { model: Shelter, as: "shelter", attributes: ["name"] },
            {
                model: Tag,
                as: "tags",
                attributes: ["character"],
                through: { attributes: [] },
            },
        ],
    });

    return pets;
};

const changePetData = async (petID, petData) => {
    const tags = petData.tags;
    delete petData.tags;

    if (tags !== undefined) {
        await PetTag.destroy({ where: { id_pet: petID } });
        await Promise.all(
            tags.map(async (tagID) => {
                await PetTag.create({ id_pet: petID, id_tag: tagID });
            })
        );
    }
    await Pet.update(petData, { where: { id_pet: petID } });
};

const getAllPetsByUserID = async (userID) => {
    const shelterID = await ShelterService.getShelterIdByUserID(userID);
    const pets = await Pet.findAll({
        where: { id_shelter: shelterID },
        include: [
            { model: Species, as: "species", attributes: ["name"] },
            { model: Breed, as: "breed", attributes: ["name"] },
            { model: Shelter, as: "shelter", attributes: ["name"] },
            {
                model: Tag,
                as: "tags",
                attributes: ["character"],
                through: { attributes: [] },
            },
        ],
    });
    return pets;
};

module.exports = {
    createPet,
    getAllPets,
    changePetData,
    getAllPetsByUserID,
    getActivePets,
    getByID,
};

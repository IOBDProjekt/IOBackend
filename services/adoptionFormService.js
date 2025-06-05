const { Op, where } = require("sequelize");
const AdoptionForm = require("../models/AdoptionForm");
const User = require("../models/User");
const Pet = require("../models/Pet");
const Shelter = require("../models/Shelter");

const submitAdoptionForm = async (formData) => {
    const result = await AdoptionForm.create(formData);

    return result.toJSON();
};

const getAllByUserID = async (userID) => {
    const result = await AdoptionForm.findAll({
        include: [
            {
                model: Pet,
                as: "pet",
                required: true,
                include: [
                    {
                        model: Shelter,
                        as: "shelter",
                        required: true,
                        include: [
                            {
                                model: User,
                                as: "user", // alias użytkownika schroniska
                                where: {
                                    id_user: userID,
                                    role: "shelter", // czyli moderator
                                },
                                required: true,
                            },
                        ],
                    },
                ],
            },
            {
                model: User,
                as: "adopter",
            },
        ],
    });

    return result;
};

module.exports = {
    submitAdoptionForm,
    getAllByUserID,
};

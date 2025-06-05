const Application = require("../models/Application");
const { Op, or, json, transaction } = require("sequelize");
const sequelize = require("../database");
const { DataTypes, fn, col } = require("sequelize");
const bcrypt = require("bcryptjs");
const User = require("../models/User")
const Shelter = require("../models/Shelter")


const createApplication = async (applicationData) => {

    const hashedPassword = await bcrypt.hash(applicationData.moderator_password, 10);
    applicationData.moderator_password = hashedPassword;

    const application = await Application.create(applicationData);

    return application.toJSON();
};

const getAllApplications = async () => {

    const applications = await Application.findAll({
    });

    return applications.map(application => application.toJSON());  
};

const getAllPending = async () => {
    const applications = await Application.findAll({
        where: {
            status: "pending",
        },
    });

    return applications.map(application => application.toJSON()); 
};

const acceptApplication = async (id_application) => {
    const application = await Application.findByPk(id_application);
    if (!application) {
        throw new Error("Nie znaleziono aplikacji.");
    }

    if (application.status !== "pending") {
        throw new Error("Aplikacja została już przetworzona.");
    }

    await sequelize.transaction(async (t) => {
        const user = await User.create(
            {
                firstname: application.moderator_firstname,
                lastname: application.moderator_lastname,
                email: application.moderator_email,
                city: application.moderator_city,
                password: application.moderator_password,
                role: "shelter",
            },
            { transaction: t }
        );

        await Shelter.create(
            {
                name: application.shelter_name,
                city: application.shelter_city,
                number: application.shelter_number,
                email: application.shelter_email,
                id_user: user.id_user,
            },
            { transaction: t }
        );

        await application.update({ status: "approved" }, { transaction: t });
    });

    return { message: "Aplikacja została zaakceptowana." };
};

const rejectApplication = async (id_application) => {
    const application = await Application.findByPk(id_application);
    if (!application) {
        throw new Error("Nie znaleziono aplikacji.");
    }

    if (application.status !== "pending") {
        throw new Error("Aplikacja została już przetworzona.");
    }

    await application.update({ status: "rejected" });
    return { message: "Aplikacja została odrzucona." };
};

module.exports = {
    createApplication,
    getAllApplications,
    getAllPending,
    acceptApplication,
    rejectApplication,
};
 
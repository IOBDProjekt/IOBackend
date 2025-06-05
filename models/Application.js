const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ShelterApplication = sequelize.define(
    "ShelterApplication",
    {
        id_application: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        shelter_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        shelter_city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        shelter_email: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        shelter_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        moderator_firstname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        moderator_lastname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        moderator_city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        moderator_email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        moderator_password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "approved", "rejected"),
            defaultValue: "pending",
        },
        submitted_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "shelter_applications",
        timestamps: false,
    }
);

module.exports = ShelterApplication;

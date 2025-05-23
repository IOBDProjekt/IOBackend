const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Breed = sequelize.define(
    "Breed",
    {
        id_breed: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        breed: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        id_species: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "species",
                key: "id_species",
            },
            onDelete: "RESTRICT",
        },
    },
    {
        tableName: "breeds",
        timestamps: false,
    }
);

Breed.associate = (models) => {
    Breed.belongsTo(models.Species, {
        foreignKey: "id_species",
        as: "species",
    });
};

module.exports = Breed;

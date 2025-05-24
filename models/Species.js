const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Species = sequelize.define(
	"Species",
	{
		id_species: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		species: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
	},
	{
		tableName: "species",
		timestamps: false,
	},
);

Species.associate = (models) => {
    Species.hasMany(models.Breed, {
        foreignKey: "id_species",
        as: "spieces",
    });
	Species.hasMany(models.Pet, {
    foreignKey: "id_species",
    as: "pets",
  });
};

module.exports = Species;

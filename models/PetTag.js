const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const PetTag = sequelize.define(
	"PetTag",
	{
		id_pet: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
			references: {
				model: "pets",
				key: "id_pet",
			},
		},
		id_tag: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: {
				model: "tags",
				key: "id_tag",
			},
		},
	},
	{
		tableName: "PetTags",
		timestamps: false,
	},
);

module.exports = PetTag;

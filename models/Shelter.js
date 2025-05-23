const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Shelter = sequelize.define(
	"Shelter",
	{
		id_shelter: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		username: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
	},
	{
		tableName: "shelters",
		timestamps: false,
	},
);
module.exports = Shelter;

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Image = sequelize.define(
	"Image",
	{
		id_image: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: false,
		},
		encoding: {
			type: DataTypes.STRING(45),
			allowNull: false, 
		},
		mimetype: {
			type: DataTypes.STRING(45),
			allowNull: false,
		},
		size: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		data: {
			type: DataTypes.BLOB("medium"),
			allowNull: false,
		},
	},
	{
		tableName: "images",
		timestamps: false,
	},
);
module.exports = Image;

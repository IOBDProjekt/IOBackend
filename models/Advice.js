const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database");

const Advice = sequelize.define(
	"Advice",
	{
		id_advice: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		title: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
        content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
        type: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
        addedAt: {
			type: DataTypes.DATE,
			allowNull: false,
            defaultValue: Sequelize.NOW
		},
	},
	{
		tableName: "advice",
		timestamps: false,
	},
);
module.exports = Advice;

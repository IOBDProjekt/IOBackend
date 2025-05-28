const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Tag = sequelize.define(
	"Tag",
	{
		id_tag: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		character: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
	},
	{
		tableName: "tags",
		timestamps: false,
	},
);

Tag.associate = (models) => {
	Tag.belongsToMany(models.Pet, { through: 'PetTags', as: 'pets', foreignKey: 'id_tag' });
};

module.exports = Tag;

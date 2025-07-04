const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Pet = sequelize.define(
	"Pet",
	{
		id_pet: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		id_species: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "species",
				key: "id_species",
			},
		},
		id_breed: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "breeds",
				key: "id_breed",
			},
		},
		age: {
			type: DataTypes.STRING(10),
			allowNull: false,
		},
		sex: {
			type: DataTypes.STRING(10),
			allowNull: false,
		},
		condition: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		id_shelter: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		id_image: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: "pets",
		timestamps: false,
	},
);

Pet.associate = (models) => {
	Pet.belongsTo(models.Species, { foreignKey: "id_species", as: "species" });
	Pet.belongsTo(models.Breed, { foreignKey: "id_breed", as: "breed" });
	Pet.belongsTo(models.Shelter, { foreignKey: "id_shelter", as: "shelter" });
	Pet.belongsTo(models.Image, { foreignKey: "id_image", as: "image" });
	Pet.belongsToMany(models.Tag, {
		through: "PetTags",
		as: "tags",
		foreignKey: "id_pet",
	});
	Pet.hasMany(models.AdoptionForm, {
		foreignKey: "id_pet",
		as: "adoptionForms",
	});
	Pet.hasMany(models.Form, {
		foreignKey: "id_pet",
		as: "forms",
	});
};
module.exports = Pet;

const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database");

const AdoptionForm = sequelize.define(
	"AdoptionForm",
	{
		id_adoptionForm: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		submittedAt: {
			type: DataTypes.DATE,
			allowNull: false,
            defaultValue: Sequelize.NOW
		},
        workerComment: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		id_pet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pets",
                key: "id_pet",
            },
            onDelete: "RESTRICT",
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id_user",
            },
            onDelete: "RESTRICT",
        },
	},
	{
		tableName: "adoptionForms",
		timestamps: false,
	},
);

AdoptionForm.associate = (models) => {
    AdoptionForm.belongsTo(models.User, { foreignKey: "id_user", as: "user" });
    AdoptionForm.belongsTo(models.Pet, { foreignKey: "id_pet", as: "pet" });
    AdoptionForm.hasMany(models.Notification, { foreignKey: "id_adoptionForm", as: "notifications" })
  };

module.exports = AdoptionForm;

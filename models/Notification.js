const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database");

const Notification = sequelize.define(
	"Notification",
	{
		id_notification: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
        content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
        type: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
        sentAt: {
			type: DataTypes.DATE,
			allowNull: false,
            defaultValue: Sequelize.NOW
		},
		id_adoptionForm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "adoptionForms",
                key: "id_adoptionForm",
            },
            onDelete: "NO ACTION",
        },
	},
	{
		tableName: "notification",
		timestamps: false,
	},
);

Notification.associate = (models) => {
    Notification.belongsTo(models.AdoptionForm, { foreignKey: "id_adoptionForm", as: "adoptionForm" });
  };

module.exports = Notification;

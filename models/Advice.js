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
		id_shelter: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "shelters",
                key: "id_shelter",
            },
            onDelete: "NO ACTION",
        },
	},
	{
		tableName: "advice",
		timestamps: false,
	},
);

Advice.associate = (models) => {
    Advice.belongsTo(models.Shelter, { foreignKey: "id_shelter", as: "shelter" });
  };

module.exports = Advice;

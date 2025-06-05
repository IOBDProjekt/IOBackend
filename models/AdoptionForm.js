const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database");

const AdoptionForm = sequelize.define(
    "AdoptionForm",
    {
        id_aform: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        pesel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        motivation: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id_user",
            },
        },
        id_pet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pets",
                key: "id_pet",
            },
            onDelete: "NO ACTION",
        },
    },
    {
        tableName: "adoption_forms",
        timestamps: false,
    }
);

AdoptionForm.associate = (models) => {
    AdoptionForm.belongsTo(models.User, { foreignKey: "id_user", as: "adopter" });
    AdoptionForm.belongsTo(models.Pet, { foreignKey: "id_pet", as: "pet" });
};

module.exports = AdoptionForm;

const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Advice = require("./Advice");

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
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "users",
                key: "id_user",
            },
        },
    },
    {
        tableName: "shelters",
        timestamps: false,
    }
);

Shelter.associate = (models) => {
    Shelter.hasMany(models.Advice, { foreignKey: "id_shelter", as: "advices" });
    Shelter.hasMany(models.Pet, { foreignKey: "id_shelter", as: "pets" });
    Shelter.hasOne(models.User, { foreignKey: "id_user", as: "user" });
};

module.exports = Shelter;

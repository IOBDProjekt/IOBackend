const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define(
    "User",
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: false,
    }
);

User.associate = (models) => {
    User.hasMany(models.Favourite, {
        foreignKey: "id_user",
        as: "favourites",
    });
};

module.exports = User;

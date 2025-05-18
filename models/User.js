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
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        tableName: "users",
        timestamps: false,
    }
);

module.exports = User;

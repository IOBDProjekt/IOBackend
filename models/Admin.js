const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Admin = sequelize.define(
    "Admin",
    {
        id_admin: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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
    },
    {
        tableName: "admin",
        timestamps: false,
    }
);

module.exports = Admin;

const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database");

const Favourite = sequelize.define(
    "Favourite",
    {
        id_favourite: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        },
        addedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        tableName: "favourites",
        timestamps: false,
    }
);

Favourite.associate = (models) => {
    Favourite.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
    });
};

module.exports = Favourite;

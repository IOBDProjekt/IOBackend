const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Form = sequelize.define(
    "Form",
    {
        id_form: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id_user',
        },
        },
        id_pet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pets',
            key: 'id_pet',
        },
        },
        sentAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        },
        status: {
        type: DataTypes.STRING(30),
        allowNull: false
        },
        
    },
    {
        tableName: "forms",
        timestamps: false,
    }
);

Form.associate = (models) => {
    Form.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user',
    });
    Form.belongsTo(models.Pet, {
      foreignKey: 'id_pet',
      as: 'pet',
    });
};

module.exports = Form;

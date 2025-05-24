const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Messages = sequelize.define(
    "Messages",
    {
        id_message: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        id_sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id_user',
        },
        },
        id_receiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id_user',
        },
        },
        sentAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        },
        
    },
    {
        tableName: "messages",
        timestamps: false,
    }
);

Messages.associate = (models) => {
    Messages.belongsTo(models.User, {
      foreignKey: 'id_sender',
      as: 'sender',
    });
    Messages.belongsTo(models.User, {
      foreignKey: 'id_receiver',
      as: 'receiver',
    });
};

module.exports = Messages;

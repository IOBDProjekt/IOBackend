const Message = require("../models/Messages");
const User = require("../models/User");
const Pet = require("../models/Pet");
const { Op, or, json } = require("sequelize");
const { DataTypes, fn, col } = require("sequelize");

const createMessage = async (messageData) => {

    const message = await Message.create(messageData);

    return message.toJSON();
};

const getAllMessages = async (sender, receiver, pet) => {
    try {
        const messages = await Message.findAll({
        where: {
            [Op.or]: [
                {id_sender: sender, id_receiver: receiver },
                {id_sender: receiver, id_receiver: sender }
            ],
            id_pet: pet
        },
        order: [
            ['sentAt', 'ASC']
        ]
    });
    return messages.map(message => message.toJSON());
    } catch(err) {
        console.error("Error in downloading data: ", err);
        throw err;
    }
    
};

const getAllUserConversations = async (sender) => {

    try {
        const conversations = await Message.findAll({
        attributes: [
            'id_sender',
            'id_receiver',
            'id_pet',
            [fn('MAX', col('sentAt')), 'lastMessageSentAt']
        ],
        where: {
            [Op.or] : [
                {id_sender: sender},
                {id_receiver: sender}
            ]
            
        },
        include : [
            {
                model: User,
                as: 'sender',
                attributes: ['firstname', 'lastname'],
            },
            {
                model: User,
                as: 'receiver',
                attributes: ['firstname', 'lastname'],
            },
            {
                model: Pet,
                as: 'messagePet',
                attributes: ['name'],
            }
        ],
        group: [
            'id_sender',
            'id_receiver',
            'id_pet',
            'sender.id_user',
            'sender.firstname',
            'sender.lastname',
            'receiver.id_user',
            'receiver.firstname',
            'receiver.lastname',
            'messagePet.id_pet',
            'messagePet.name'
        ],
        order: [
            ['lastMessageSentAt', 'DESC']
        ],
        raw: false,
        subQuery: false
    });

    return conversations
    .map(conversation => conversation.toJSON())
    .reduce((acc, conv) => {
        const user1 = Math.min(conv.id_sender, conv.id_receiver);
        const user2 = Math.max(conv.id_sender, conv.id_receiver);
        const key = `${user1}-${user2}-${conv.id_pet}`;

        if (!acc.map.has(key)) {
        acc.map.set(key, true);
        acc.unique.push({
            id_sender: conv.id_sender,
            id_receiver: conv.id_receiver,
            id_pet: conv.id_pet,
            lastMessageSentAt: conv.lastMessageSentAt,
            senderName: conv.sender ? `${conv.sender.firstname} ${conv.sender.lastname}` : null,
            receiverName: conv.receiver ? `${conv.receiver.firstname} ${conv.receiver.lastname}` : null,
            petName: conv.messagePet ? conv.messagePet.name : null
        });
        }

        return acc;
    }, { map: new Map(), unique: [] }).unique;


    } catch(err) {
        console.error("Error in downloading data: ", err);
        throw err;
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    getAllUserConversations
};
 
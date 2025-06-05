const MessageService = require("../services/messageService.js");

const { StatusCodes } = require("http-status-codes");

const addMessage = async (req, res) => {
    const messageData = {
        content: req.body.content,
        id_sender: req.authData.id_user,
        id_receiver: req.body.id_receiver,
        id_pet: req.body.id_pet,
    };

    console.log(messageData);

    try {
        const newMessage = await MessageService.createMessage(messageData);

        return res.status(StatusCodes.CREATED).json({ message: "Message added successfully", newMessage });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const getMessagesTogether = async (req, res) => {
    try {
        const senderID = req.authData.id_user;
        const receiverID = parseInt(req.query.id_receiver, 10);
        const petID = parseInt(req.query.pet_id, 10);

        console.log(senderID, receiverID, petID);

        const messages = await MessageService.getAllMessages(senderID, receiverID, petID);

        return res.status(StatusCodes.OK).json({ messages });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const getMessagesUser = async (req, res) => {
    const senderID = req.authData.id_user;

    try {
        const messages = await MessageService.getAllUserConversations(senderID);
        return res.status(StatusCodes.OK).json({ messages });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

module.exports = {
    addMessage,
    getMessagesTogether,
    getMessagesUser,
};

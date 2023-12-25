const messageModel = require('../models/messageModel');

// creating a message
// get Messages

const createMessage = async (req, res) => {
    const {chatId, senderId, text} =  req.body;

    const message = new messageModel({
        chatId,
        senderId,
        text
    });

    try {
        const response = await message.save();
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json(response);
    }
}

const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await messageModel.find({chatId});
        res.status(200).json(messages);

    } catch (error) {
        console.log(error);
        res.status(500).json(messages);
    };
}

module.exports = { createMessage, getMessages };
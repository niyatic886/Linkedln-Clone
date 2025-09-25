const ConversationModel = require('../models/conversation');
const MessageModel = require('../models/message');

exports.addConversation = async (req, res) => {
    try {
        let senderId = req.user._id;
        let { receiverId, message } = req.body;
        let isConvExist = await ConversationModel.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (!isConvExist) {
            let newConversation = new ConversationModel({
                members: [senderId, receiverId]
            });
            await newConversation.save();
            let addMessage = new MessageModel({
                conversation: newConversation._id,
                sender: req.user._id,
                message
            });
            await addMessage.save();
        } else {
            let addMessage = new MessageModel({
                conversation: isConvExist._id,
                sender: req.user._id,
                message
            });
            await addMessage.save();
        }
        res.status(201).json({ message: 'message sent successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.getConversation = async (req, res) => {
    try {
        let loggedinId = req.user._id;
        let conversations = await ConversationModel.find({
            members: { $in: [loggedinId] }
        }).populate('members', '-password').sort({ createdAt: -1 });
        return res.status(200).json({ conversations: conversations, message: 'conversations fetched successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}
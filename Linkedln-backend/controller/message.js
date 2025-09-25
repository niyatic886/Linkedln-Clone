const MessageModel = require('../models/message');


exports.sendMessage = async (req, res) => {
    try {
        let { conversation, message, picture } = req.body;
        let addMessage = new MessageModel({
            conversation,
            sender: req.user._id,
            message,
            picture
        });
        await addMessage.save();
       let populatedMessage = await addMessage.populate('sender');
       return res.status(200).json( populatedMessage );

    }catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.getMessage = async (req, res) => {
    try{
        let { convId } = req.params;
        let messages = await MessageModel.find({ conversation: convId }).populate('sender');
        return res.status(200).json({ messages, message: 'Messages fetched successfully' });

    }catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}
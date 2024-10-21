const { ConversationModel } = require("../models/converstation.model");

const getConversation = async (currentUserId) => {
    if (currentUserId) {
        const currentUserConversation = await ConversationModel.find({
            "$or": [
                { sender: currentUserId },
                { receiver: currentUserId }
            ]
        })
        .sort({ updatedAt: -1 })
        .populate('message') // Change from 'messages' to 'message'
        .populate('sender')
        .populate('receiver');

        const conversation = currentUserConversation.map((conv) => {
            const countUnseenMsg = conv?.message?.reduce((preve, curr) => { // Also change from messages to message here
                const msgByUserId = curr?.msgByUserId?.toString();

                if (msgByUserId !== currentUserId) {
                    return preve + (curr?.seen ? 0 : 1);
                } else {
                    return preve;
                }

            }, 0);

            return {
                _id: conv?._id,
                sender: conv?.sender,
                receiver: conv?.receiver,
                unseenMsg: countUnseenMsg,
                lastMsg: conv.message[conv?.message?.length - 1] // Also change here
            };
        });

        return conversation;
    } else {
        return [];
    }
};

module.exports = getConversation;

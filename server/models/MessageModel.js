import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    content:{
        type: String,
    },
    type: {
        type: String,
    },
    sender: {
        type: String,
    },
    receiver: {
        type: [String],
    },
    seen: {
        type: [String],
    },
    room: {
        type: String,
    }
},{timestamps: true});

const MessageModel = mongoose.model('Message',MessageSchema);
export default MessageModel;
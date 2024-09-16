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
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isEdited: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const MessageModel = mongoose.model('Message',MessageSchema);
export default MessageModel;
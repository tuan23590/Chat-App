import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
    photoURL:{
        type: String,
    },
    name: {
        type: String,
    },
    listUser: {
        type: [String],
    },
    LastMessage: {
        type: String,
    },
    listMessage: {
        type: [String],
    },
},{timestamps: true});

const RoomModel = mongoose.model('Room',RoomSchema);
export default RoomModel;
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    uid:{
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    photoURL: {
        type: String,
    },
    status: {
        type: String,
        default: 'offline'
    },
},{timestamps: true});

const UserModel = mongoose.model('User',UserSchema);
export default UserModel;
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
    online: {
        type: Boolean,
        default: false
    },
    lastOnline: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

const UserModel = mongoose.model('User',UserSchema);
export default UserModel;
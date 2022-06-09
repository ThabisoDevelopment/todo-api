import mongoose from 'mongoose'

const users = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        min: 8
    }
},
{
    timestamps: true 
})

const UserModel = mongoose.model('users', users)
export default UserModel
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    // transactions: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'transaction',
    //     default: []
    // }]
}, {timestamps: true})


export const userModel = mongoose.model('user', userSchema)
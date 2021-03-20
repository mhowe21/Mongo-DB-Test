import mongoose from 'mongoose';
const { Schema } = mongoose;

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Username is required",
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: "Email is required",

    }
})
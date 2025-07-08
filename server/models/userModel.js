import mongoose from 'mongoose';
import { db } from "../mongoose/index.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },

    contact: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit contact number'],
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    role: {
        type: String,
        default: 'admin',
    },

    permission: {
        type: [String],
        default: [],
    },

    otp: {
        type: String,
    },

    otpExpiry: {
        type: Date,
    },

    forgotOrResetPasswordToken: {
        type: String
    },

    forgotOrResetPasswordTokenExpiry: {
        type: Date,
    }

}, { timestamps: true });

const User = db.model('User', userSchema);
export default User;

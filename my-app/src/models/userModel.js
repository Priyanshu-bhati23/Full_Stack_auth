import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },

    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Please provide a password"], // Corrected the message
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    forgotPasswordToken: { // Corrected the typo
        type: String
    },
    forgotPasswordTokenExpiry: { // Corrected the typo
        type: Date
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.user || mongoose.model("users", userSchema);

export default User;

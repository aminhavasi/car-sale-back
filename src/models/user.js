const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        tokens: [
            {
                access: {
                    type: String,
                },
                token: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

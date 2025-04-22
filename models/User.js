const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
    },

    role: {
        type: String,
        enum: ['user', 'department', 'admin'],
        default: 'user',
    },

    department: {
        type: String,
        required: function () {
            return this.role === 'department';
        },
    },

    avatar: {
        type: String,
        default: '', // can be a Cloudinary link later
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

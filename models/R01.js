const mongoose = require('mongoose');

const r01Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        wouldLikeTo: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('R01', r01Schema)
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        docType: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        doc: {
            type: mongoose.Schema.ObjectId,
            ref: docType,
            required: true
        }
    }
)

module.exports = mongoose.model('Document', documentSchema);
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        docType: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        docId: {
            type: mongoose.Schema.ObjectId,
            ref: 'docType',
            required: true
        }
    }
)

module.exports = mongoose.model('Document', documentSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true
    }],
    mail: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    document: [{
        type: mongoose.Schema.ObjectId,
        ref: "Document"
    }]
})

module.exports = mongoose.model('User', userSchema)
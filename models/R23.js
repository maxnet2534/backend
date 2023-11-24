const mongoose = require('mongoose');

const r23Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        typeDoc: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        text: {    
            theLecturerOf: {
                type: String,
                required: true
            },
            classLevel: {
                type: String,
                required: true
            },
            durationOfStudy: {
                type: String,
                required: true
            },
            program: {
                type: String,
                required: true
            },
            request: {
                type: String,
                required: true
            },
            forDay: {
                type: String,
                required: true
            },
            start: {
                type: String,
                required: true
            },
            end: {
                type: String,
                required: true
            },
            because: {
                type: String,
                required: true
            }
        },
        parent: {
            comment: {
                type: String,
            },
            date: {
                type: String,
                required: true
            }
        },
        advisor: {
            comment: {
                type: String
            },
            date: {
                type: String,
                required: true
            }
        },
        lecturer: {
            comment: {
                type: String
            },
            date: {
                type: String,
                required: true
            }
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

module.exports = mongoose.model('Documents', r23Schema)
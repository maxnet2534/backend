const mongoose = require('mongoose');

const r16Schema = new mongoose.Schema(
    {
        /*  */
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        docType: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        /*  */
        text: {    
            to: {
                type: String,
                required: true
            },
            courseId: {
                type: String,
                required: true
            },
            courseTitle: {
                type: String,
                required: true
            },
            group: {
                type: String,
                required: true
            },
            because: {
                type: String,
                required: true
            },
            registeredPersonQuantity: {
                type: Number,
                required: true
            },
            addPersonQuantity: {
                type: Number,
                required: true
            },
            person: [{
                userId: {
                    type: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true
                },
                academicYear: {
                    type: String,
                    required: true
                },
                statusRegister: {
                    type: String,
                    required: true
                }
            }]
        },
        /*  */
        date: {
            type: String,
            required: true
        },
        /*  */
        advisorComment: {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            comment:{
                type: String
            },
            date: {
                type: String
            }
        },
        professorComment: {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            approve: {
                type: Boolean,
                default: true
            },
            because: {
                type: String
            },
            date: {
                type: String
            }
        },
        registerOffice: {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            request: {
                type: Boolean,
                default: true
            },
            because: {
                type: String
            },
            date: {
                type: String
            }
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('R16', r16Schema)
const mongoose = require('mongoose');

const r01Schema = new mongoose.Schema(
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
            }
        },
        /*  */
        date: {
            type: String,
            required: true
        },
        /*  */
        advisor: {
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
        headDepartment: {
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
        deanConsideration: {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            approve: {
                type: Boolean,
                default: false
            },
            because:{
                type: String
            }
        },
        registerOffice: {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            request: {
                type: Boolean
            },
            because: {
                type: String
            },
            runtime: {
                minute: {
                    type: String
                },
                day: {
                    type: String
                }
            }
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('R01', r01Schema)
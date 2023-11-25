const mongoose = require('mongoose');

const r11Schema = new mongoose.Schema(
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
            courseInSemester: {
                type: String,
                required: true
            },
            academicYear: {
                type: String,
                required: true
            },
            courseStructure: [{
                courseCode: {
                    type: String,
                    required: true
                },
                courseTitle: {
                    type: String,
                    required: true
                },
                credit:{
                    type: String,
                    required: true
                }
            }],
            preferredCourse: [{
                courseCode: {
                    type: String,
                    required: true
                },
                courseTitle: {
                    type: String,
                    required: true
                },
                credit:{
                    type: String,
                    required: true
                }
            }],
        },
        /*  */
        date: {
            type: String,
            required: true
        },
        /*  */
        advisor: {
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
                default: true
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
                type: Boolean,
                default: true
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

module.exports = mongoose.model('R11', r11Schema)
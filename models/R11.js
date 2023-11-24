const mongoose = require('mongoose');

const r11Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        docType: {
            type: String,
            required: true
        },
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
        date: {
            type: String,
            required: true
        },
        advisor: {
            comment:{
                type: String
            },
            date: {
                type: String,
                required: true
            }
        },
        headDepartment: {
            comment:{
                type: String
            },
            date: {
                type: String,
                required: true
            }
        },
        deanConsideration: {
            approve: {
                type: Boolean,
                default: true,
                required: true
            },
            because:{
                type: String
            }
        },
        registerOffice: {
            request: {
                type: Boolean,
                default: true
            },
            because: {
                type: String
            },
            runtime: {
                minute: {
                    type: String,
                    required: true
                },
                day: {
                    type: String,
                    required: true
                }
            }
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Documents', r11Schema)
const mongoose = require('mongoose');

const r11Schema = new mongoose.Schema(
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
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('R11', r11Schema)
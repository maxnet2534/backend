const mongoose = require('mongoose');

const r17Schema = new mongoose.Schema(
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
        title: {
            term: {
                type: String,
                required: true
            },
            year: {
                type: String,
                required: true
            }
        },
        to: {
            type: String,
            required: true
        },
        text: {    
            gradYear: {
                type: String,
                required: true
            },
            studyType: {
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
            theoryCredit: {
                type: Number,
                required: true
            },
            practiceCredit: {
                type: Number,
                required: true
            },
            longTimePerWeek: {
                theory: {
                    type: Number,
                    required: true
                },
                practice: {
                    type: Number,
                    required: true
                }
            },
            oldCourse: {
                year: {
                    type: String,
                    required: true
                },
                term: {
                    type: String,
                    required: true
                }
            },
            because: {
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
            personQuantity: {
                type: Number,
                required: true
            }
        },
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
        headerDepartment: {
            comment: {
                type: String
            },
            date: {
                type: String,
                required: true
            },
            assignProfessor: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        },
        deanSubmit: {
            request: {
                type: Boolean
            },
            because: {
                type: String
            }
        },
        toOtherDean: {
            department: {
                type: String
            },
            date: {
                type: String
            }
        },
        otherDeanSubmit: {
            request: {
                type: Boolean
            },
            because: {
                type: String
            },
            date: {
                type: String
            },
            assignProfessor: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        },
        deanOffice: {
            request: {
                type: Boolean,
                default: true
            },
            date: {
                type: String,
                required: true
            }
        },
        studentRequest: [{
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            group: {
                type: String,
                required: true
            },
            grade: {
                type: Number,
                required: true
            },
            whyType: {
                type: String,
                required: true
            },
            sumCredit: {
                type: Number,
                required: true
            },
            endStudy: {
                type: String,
                required: true
            }
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Documents', r17Schema)
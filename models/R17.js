const mongoose = require('mongoose');

const r17Schema = new mongoose.Schema(
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
                oldYear: {
                    type: String,
                    required: true
                },
                oldTerm: {
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
        /*  */
        date: {
            type: String,
            required: true
        },
        case: {
            type: String,
            required: true
        },
        /* case 1 */
        advisor: {
            comment:{
                type: String
            },
            date: {
                type: String
            }
        },
        headerDepartment: {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            comment: {
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
        deanSubmit: {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            request: {
                type: Boolean
            },
            because: {
                type: String
            }
        },
        /* case 2 */
        toOtherDean: {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            department: {
                type: String
            },
            date: {
                type: String
            }
        },
        otherDeanSubmit: {
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
            date: {
                type: String
            },
            assignProfessor: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        },
        deanOffice: {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            request: {
                type: Boolean
            },
            date: {
                type: String
            }
        },
        studentRequest: [{
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            group: {
                type: String
            },
            grade: {
                type: Number
            },
            whyType: {
                type: String
            },
            sumCredit: {
                type: Number
            },
            endStudy: {
                type: String
            }
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('R17', r17Schema)
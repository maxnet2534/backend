const Document = require('../models/Document');
const R01 = require('../models/R01');
const R11 = require('../models/R11');
const R16 = require('../models/R16');
const R17 = require('../models/R17');
const R23 = require('../models/R23');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc Get all document
// @route GET /document
// @access Private
const getAllDocuments = asyncHandler(async (req, res) => {
    // Get all documents from MongoDB
    const documents = await Document.find().lean();

    // If no documents 
    if (!documents?.length) {
        return res.status(400).json({ message: 'No documents found' });
    }

    
    // Add username to each document before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
    // You could also do this with a for...of loop
    const documentsWithUser = await Promise.all(documents.map(async (document) => {

        // query user collection
        const userId = await User.findById(document.userId).select('-password').lean().exec();

        // check docType
        const docType = document.docType;

        // query R01 document
        if (docType === "R01") {
            const docId = await R01.findById(document.docId).lean().exec();
            return { ...document, userId, docId };
        } 
        

        // query R11 document
        if (docType === "R11") {
            const docId = await R11.findById(document.docId).lean().exec();
            return { ...document, userId, docId };
        } 
        
        // query R16 document
        if (docType === "R16") {
            const docId = await R16.findById(document.docId).lean().exec();
            return { ...document, userId, docId };
        } 
        
        // query R17 document
        if (docType === "R17") {
            const docId = await R17.findById(document.docId).lean().exec();
            return { ...document, userId, docId };
        } 
        
        // query R23 document
        if (docType === "R23") {
            const docId = await R23.findById(document.docId).lean().exec();
            return { ...document, userId, docId };
        }

    }))

    res.json(documentsWithUser);
})

// @desc Create new document
// @route POST /document
// @access Private
const createNewDocument = asyncHandler(async (req, res) => {
    const { docType } = req.body

    // Confirm data
    if (!docType) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    /* ----- R01 ----- */
    if (docType === "R01") {
        const { userId, title, to, wouldLikeTo } = req.body;

        // Confirm data
        if (!userId || !docType || !title || !to || !wouldLikeTo) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = User.findById(userId).exec()

        // Check have a user
        if (!user) {
            return res.status(400).json({ message: 'User not found'});
        }

        // Create and store the new r01
        const r01 = await R01.create({ 
            user: userId,
            docType, 
            status: '0',
            text:{title, to, wouldLikeTo}, 
            date: new Date().toLocaleString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) 
        })
        // Create and store thr new document
        const document = await Document.create({ docType, userId, docId: r01._id.toString() })

        // return status
        if (r01 && document) { // Created 
            return res.status(201).json({ message: 'New document R01 created' })
        } else {
            return res.status(400).json({ message: 'Invalid note data received' })
        }
        
    } 

    /* ----- R11 ----- */
    else if (docType === "R11") {
        const { userId, 
            to, 
            courseInSemester, 
            academicYear, 
            courseCode, 
            courseTitle, 
            credit,
            preCourseCode, 
            preCourseTitle, 
            preCredit, 
        } = req.body;

        // Confirm data
        if (!userId || !docType || !to || !courseInSemester || !academicYear || !courseCode || !courseTitle || !credit || !preCourseCode || !preCourseTitle || !preCredit) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = User.findById(userId).exec()

        // Check have a user
        if (!user) {
            return res.status(400).json({ message: 'User not found'});
        }

        // Create and store the new r11
        const r11 = await R11.create({ 
            user: userId,
            docType, 
            status: '0',
            text:{ 
                title, to, courseInSemester, academicYear, 
                courseStructure: { courseCode, courseTitle, credit },
                preferredCourse: { preCourseCode, preCourseTitle, preCredit }
            }, 
            date: new Date().toLocaleString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) 
        })
        // Create and store thr new document
        const document = await Document.create({ docType, userId, docId: r11._id.toString() })

        // return status
        if (r11 && document) { // Created 
            return res.status(201).json({ message: 'New document R11 created' })
        } else {
            return res.status(400).json({ message: 'Invalid note data received' })
        }

    } 

    /* ----- R16 ----- */
    else if (docType === "R16") {
        const { 
            userId, 
            to, 
            courseId, 
            courseTitle, 
            group, 
            because, 
            academicYear,
            statusRegister
        } = req.body;

        // Confirm data
        if (!userId || !docType || !to || !courseId || !courseTitle || !group || !because || !academicYear || !statusRegister) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = User.findById(userId).exec()

        // Check have a user
        if (!user) {
            return res.status(400).json({ message: 'User not found'});
        }

        // Create and store the new r16
        const r16 = await R16.create({ 
            user: userId,
            docType, 
            status: '0',
            text:{
                to,
                courseId,
                courseTitle,
                group,
                because,
                registeredPersonQuantity,
                addPersonQuantity: 1,
                person: [{
                    userId,
                    academicYear,
                    statusRegister
                }]
            }, 
            date: new Date().toLocaleString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) 
        })

        // Create and store thr new document
        const document = await Document.create({ docType, userId, docId: r16._id.toString() })

        // return status
        if (r16 && document) { // Created 
            return res.status(201).json({ message: 'New document R16 created' })
        } else {
            return res.status(400).json({ message: 'Invalid note data received' })
        }

    } 

    /* ----- R17 ----- */
    else if (docType === "R17") {
        const { 
            userId,
            term,
            year,
            to, 
            gradYear,
            studyType,
            courseId,
            courseTitle,
            theoryCredit,
            practiceCredit,
            theory,
            practice,
            oldYear,
            oldTerm,
            because,
            courseFaculty,
            courseDepartment,
            statusCase,
            group,
            grad,
            whyType,
            sumCredit,
            endStudy
        } = req.body;

        // Confirm data
        if (!userId || !docType || !term || !year || !to || !gradYear || !studyType || !courseId || !courseTitle || !theoryCredit || !practiceCredit || !theory || !practice || !oldYear || ! oldTerm || !because || !courseFaculty || !courseDepartment || !statusCase || !group || !grad || !whyType || !sumCredit || !endStudy) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = User.findById(userId).exec()

        // Check has a user
        if (!user) {
            return res.status(400).json({ message: 'User not found'});
        }

        // Create and store the new r17
        const r17 = await R17.create({ 
            user: userId,
            docType, 
            status: '0',
            text:{
                title: { term, year }, 
                to, 
                gradYear,
                studyType,
                courseId,
                courseTitle,
                theoryCredit,
                practiceCredit,
                longTimePerWeek: { theory, practice },
                oldCourse: { oldYear, oldTerm },
                because,
                courseFaculty,
                courseDepartment,
                personQuantity: 1
            }, 
            date: new Date().toLocaleString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),
            statusCase,
            studentRequest: [{
                user: userId,
                group,
                grad,
                whyType,
                sumCredit,
                endStudy
            }]
        })
        // Create and store thr new document
        const document = await Document.create({ docType, userId, docId: r17._id.toString() })

        // return status
        if (r17 && document) { // Created 
            return res.status(201).json({ message: 'New document R17 created' })
        } else {
            return res.status(400).json({ message: 'Invalid note data received' })
        }

    } 
    
    /* ----- R23 ----- */
    else if (docType === "R23") {
        const { 
            userId, 
            title, 
            to, 
            theLecturerOf, 
            classLevel, 
            durationOfStudy, 
            program, 
            request, 
            forDay, 
            start, 
            end, 
            because 
        } = req.body;

        // Confirm data
        if (!userId || !docType || !title || !to || !theLecturerOf || !classLevel || !durationOfStudy || !program || !request || !forDay || !start || !end || !because) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = User.findById(userId).exec()

        // Check has a user
        if (!user) {
            return res.status(400).json({ message: 'User not found'});
        }

        // Create and store the new r23
        const r23 = await R23.create({ 
            user: userId,
            docType, 
            status: '0',
            text:{
                title, 
                to, 
                theLecturerOf,
                classLevel,
                durationOfStudy,
                program,
                request,
                forDay,
                start,
                end,
                because
            }, 
            date: new Date().toLocaleString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) 
        })
        // Create and store thr new document
        const document = await Document.create({ docType, userId, docId: r23._id.toString() })

        // return status
        if (r23 && document) { // Created 
            return res.status(201).json({ message: 'New document R23 created' })
        } else {
            return res.status(400).json({ message: 'Invalid note data received' })
        }

    } else { // don't same any condition.
        return res.status(400).json({ message: 'Invalid document data received' })
    }


})

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateDocument = asyncHandler(async (req, res) => {
    const { id, docType } = req.body

    // Confirm data
    if (!id || !docType) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    
    /* ----- update R01 ----- */
    if (docType === "R01") {
        const { title, to, wouldLikeTo } = req.body;
        
        // Confirm data
        if (!id || !docType || !title || !to || !wouldLikeTo) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Confirm document exists to update
        const document = await Document.findById(id).exec()
        const r01 = await R01.findById(document.docId.toString()).exec()
    
        if (!document && r01) {
            return res.status(400).json({ message: 'Document not found' })
        }

        r01.text.title = title
        r01.text.to = to
        r01.text.wouldLikeTo = wouldLikeTo
    
        const updatedNote = await r01.save()
    
        res.json('R01 updated')

    } 
    
    /* ----- update R11 ----- */
    else if (docType === "R11") {
        const { 
            to, 
            courseInSemester, 
            academicYear, 
            courseCode, 
            courseTitle, 
            credit,
            preCourseCode, 
            preCourseTitle, 
            preCredit, 
        } = req.body;
        
        // Confirm data
        if (!docType || !to || !courseInSemester || !academicYear || !courseCode || !courseTitle || !credit || !preCourseCode || !preCourseTitle || !preCredit) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Confirm document exists to update
        const document = await Document.findById(id).exec()
        const r11 = await R11.findById(document.docId.toString()).exec()
    
        if (!document && r11) {
            return res.status(400).json({ message: 'Document not found' })
        }

        r11.text.to = to
        r11.text.courseInSemester = courseInSemester
        r11.text.academicYear = academicYear
        r11.text.courseStructure.courseCode = courseCode
        r11.text.courseStructure.courseTitle = courseTitle
        r11.text.courseStructure.credit = credit
        r11.text.preferredCourse.preCourseCode = preCourseCode
        r11.text.preferredCourse.preCourseTitle = preCourseTitle
        r11.text.preferredCourse.preCredit = preCredit
    
        const updatedNote = await r11.save()
    
        res.json('R11 updated')
    }

    /* ----- update R16 ----- */
    else if (docType === "R16") {
        const { 
            to, 
            courseId, 
            courseTitle, 
            group, 
            because, 
            academicYear,
            statusRegister
        } = req.body;
        
        // Confirm data
        if (!docType || !to || !courseId || !courseTitle || !group || !because || !academicYear || !statusRegister) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Confirm document exists to update
        const document = await Document.findById(id).exec()
        const r16 = await R16.findById(document.docId.toString()).exec()
    
        if (!document && r16) {
            return res.status(400).json({ message: 'Document not found' })
        }

        r16.text.to = to
        r16.text.courseId = courseId
        r16.text.courseTitle = courseTitle
        r16.text.group = group
        r16.text.because = because
        r16.text.person[0].academicYear = academicYear
        r16.text.person[0].statusRegister = statusRegister
    
        const updatedNote = await r16.save()
    
        res.json('R16 updated')

    }

    /* ----- update R17 ----- */
    else if (docType === "R17") {
        const {
            term,
            year,
            to, 
            gradYear,
            studyType,
            courseId,
            courseTitle,
            theoryCredit,
            practiceCredit,
            theory,
            practice,
            oldYear,
            oldTerm,
            because,
            courseFaculty,
            courseDepartment,
            statusCase,
            group,
            grad,
            whyType,
            sumCredit,
            endStudy
        } = req.body;
        
        // Confirm data
        if (!docType || !term || !year || !to || !gradYear || !studyType || !courseId || !courseTitle || !theoryCredit || !practiceCredit || !theory || !practice || !oldYear || ! oldTerm || !because || !courseFaculty || !courseDepartment || !statusCase || !group || !grad || !whyType || !sumCredit || !endStudy) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Confirm document exists to update
        const document = await Document.findById(id).exec()
        const r17 = await R17.findById(document.docId.toString()).exec()
    
        if (!document && r17) {
            return res.status(400).json({ message: 'Document not found' })
        }

        r17.text.title.term = term
        r17.text.title.year = year
        r17.text.to = to
        r17.text.gradYear = gradYear
        r17.text.studyType = studyType
        r17.text.courseId = courseId
        r17.text.courseTitle = courseTitle
        r17.text.theoryCredit = theoryCredit
        r17.text.practiceCredit = practiceCredit
        r17.text.longTimePerWeek.theory = theory
        r17.text.longTimePerWeek.practice = practice
        r17.text.oldCourse.practice = practice
        r17.text.oldCourse.practice = practice
        r17.text.because = because
        r17.text.courseFaculty = courseFaculty
        r17.text.courseDepartment = courseDepartment
        r17.text.statusCase = statusCase
        r17.studentRequest[0].group = group
        r17.studentRequest[0].grad = grad
        r17.studentRequest[0].whyType = whyType
        r17.studentRequest[0].sumCredit = sumCredit
        r17.studentRequest[0].endStudy = endStudy
    
        const updatedNote = await r17.save()
    
        res.json('R17 updated')
    }

    /* ----- update R23 ----- */
    else if (docType === "R23") {
        const {
            title, 
            to, 
            theLecturerOf, 
            classLevel, 
            durationOfStudy, 
            program, 
            request, 
            forDay, 
            start, 
            end, 
            because 
        } = req.body;

        // Confirm data
        if (!docType || !title || !to || !theLecturerOf || !classLevel || !durationOfStudy || !program || !request || !forDay || !start || !end || !because) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Confirm document exists to update
        const document = await Document.findById(id).exec()
        const r23 = await R23.findById(document.docId.toString()).exec()
    
        if (!document && r23) {
            return res.status(400).json({ message: 'Document not found' })
        }

        r23.text.title = title
        r23.text.to = to
        r23.text.theLecturerOf = theLecturerOf
        r23.text.classLevel = classLevel
        r23.text.durationOfStudy = durationOfStudy
        r23.text.program = program
        r23.text.request = request
        r23.text.forDay = forDay
        r23.text.start = start
        r23.text.end = end
        r23.text.because = because
    
        const updatedNote = await r23.save()
    
        res.json('R23 updated')
    } else {
        return res.status(400).json({ message: 'invalid Data' })
    }

})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteDocument = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm document exists to delete 
    const document = await Document.findById(id).exec()   
    const docType = document.docType
    
    if (!document) {
        return res.status(400).json({ message: 'Document not found' })
    }
    
    /* --CHECK TYPE R01-- */
    if (docType === "R01") {
        const r01 = await R01.findById(document.docId.toString()).exec()
        await r01.deleteOne()
    }

    /* --CHECK TYPE R11-- */
    if (docType === "R11") {
        const r11 = await R11.findById(document.docId.toString()).exec()
        await r11.deleteOne()
    }

    /* --CHECK TYPE R16-- */
    if (docType === "R16") {
        const r16 = await R16.findById(document.docId.toString()).exec()
        await r16.deleteOne()
    }

    /* --CHECK TYPE R17-- */
    if (docType === "R17") {
        const r17 = await R17.findById(document.docId.toString()).exec()
        await r17.deleteOne()
    }

    /* --CHECK TYPE R23-- */
    if (docType === "R23") {
        const r23 = await R23.findById(document.docId.toString()).exec()
        await r23.deleteOne()
    }
    

    await document.deleteOne()

    const reply = `Document with ID: ${document._id} and ${document.docType} with ID: ${document.docId} deleted`

    res.json(reply)
})

module.exports = {
    getAllDocuments,
    createNewDocument,
    updateDocument,
    deleteDocument
}
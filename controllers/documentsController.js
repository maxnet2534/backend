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

    if (docType === "R01") {
        const { userId, title, to, wouldLikeTo } = req.body;

        // Confirm data
        if (!userId || !docType || !title || !to || !wouldLikeTo) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = User.findById(userId).exec()

        // Check has a user
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
        const document = await Document.create({ docType, userId, docId: r01._id })

        // return status
        if (r01 && document) { // Created 
            return res.status(201).json({ message: 'New document created' })
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
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()

    res.json(`'${updatedNote.title}' updated`)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await note.deleteOne()

    const reply = `Note '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllDocuments,
    createNewDocument,
    updateNote,
    deleteNote
}
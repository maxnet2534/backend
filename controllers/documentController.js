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

    const docType = documents.document.docType;
    
    // Add username to each document before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
    // You could also do this with a for...of loop
    const documentsWithUser = await Promise.all(documents.map(async (document) => {
        const user = await User.findById(document.document.user).select('-password').lean().exec();

        if (docType === "R01") {
            const doc = await R01.findById(document.document.doc).lean().exec();
            return { ...document, user, doc };
        } else if (docType === "R11") {
            const doc = await R11.findById(document.document.doc).lean().exec();
            return { ...document, user, doc };
        } else if (docType === "R16") {
            const doc = await R16.findById(document.document.doc).lean().exec();
            return { ...document, user, doc };
        } else if (docType === "R17") {
            const doc = await R17.findById(document.document.doc).lean().exec();
            return { ...document, user, doc };
        } else if (docType === "R23") {
            const doc = await R23.findById(document.document.doc).lean().exec();
            return { ...document, user, doc };
        }

    }))

    res.json(documentsWithUser);
})

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    // Create and store the new user 
    const note = await Note.create({ user, title, text })

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
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
    createNewNote,
    updateNote,
    deleteNote
}
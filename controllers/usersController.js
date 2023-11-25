const User = require('../models/User');
//const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found'});
    }
    res.json(users);
})

// @desc Create all users
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, prefix, firstName, lastName, studentId, degree, faculty, department, mail, tel, roles } = req.body;

    // Confirm data
    if (!username || !password || !prefix || !firstName || !lastName || !studentId || !degree || !faculty || !department || !mail || !tel || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required'});
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username'});
    }
    
    const duplicateMail = await User.findOne({ mail }).lean().exec();
    if (duplicateMail) {
        return res.status(409).json({ message: 'Duplicate email address'});
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    const userObject = { username, "password": hashedPwd, prefix, firstName, lastName, studentId, degree, faculty, department, mail, tel, roles };

    // Create and store new user
    const user = await User.create(userObject);

    if (user) { // Created
        res.status(201).json({ message: `New user ${username} created.`});
    } else {
        res.status(400).json({ message: 'Invalid user data received.'});
    }
})

// @desc Update a users
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password, prefix, firstName, lastName, studentId, degree, faculty, department, mail, tel, roles } = req.body;

    // Confirm data
    if (!id || !username || !prefix || !firstName || !lastName || !studentId || !degree || !faculty || !department || !mail || !tel || !Array.isArray(roles) || !roles.length ) {
        return res.status(400).json({ message: 'All fields are required.'});
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found.'});
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec();
    // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username.'});
    }

    // Chang variable
    user.username = username;
    user.prefix = prefix;
    user.firstName = firstName;
    user.lastName = lastName;
    user.studentId = studentId;
    user.degree = degree;
    user.faculty = faculty;
    user.department = department;
    user.mail = mail;
    user.tel = tel;
    user.roles = roles;
    user.roles = roles;

    // if have password
    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10) // set rounds
    }

    // Update User to mongoDB
    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.username} updated.`});
})

// @desc Delete a users
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID required'});
    }

    // check have a document before delete
/*     const note = await Note.findOne({ user: id}).lean().exec();
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes'});
    } */

    // Check have a id
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found.'});
    }

    const reply = `Username ${user.username} with ID ${user._id} deleted`
    res.json(reply);
    
    await user.deleteOne();

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
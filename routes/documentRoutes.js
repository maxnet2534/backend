const express =require('express');
const router = express.Router();
const documentsController = require('../controllers/documentsController');
const verifyJWT = require('../middleware/verifyJWT');

//router.use(verifyJWT);

router.route('/')
    .get(documentsController.getAllDocuments)
    .post(documentsController.createNewDocument)
    .patch(documentsController.updateDocument)
    .delete(documentsController.deleteDocument);

module.exports = router;
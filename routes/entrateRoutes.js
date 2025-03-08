
const express = require('express');

const {
    getAllEntrate, 
    createEntrata, 
    getEntrata, 
    updateEntrata, 
    deleteEntrata, 
    checkID, 
    checkBody
} = require('../controllers/entrataController');


const entrateRouter = express.Router();

entrateRouter.param('id', checkID);

// Create a checkBody middleware
// Check if the body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack
entrateRouter.route('/')
    .get(getAllEntrate)
    .post(checkBody, createEntrata);

entrateRouter.route('/:id')
    .get(getEntrata)
    .patch(updateEntrata)
    .delete(deleteEntrata);

module.exports = entrateRouter;
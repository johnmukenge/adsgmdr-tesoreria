
const express = require('express');

const {
    getAllEntrate, 
    createEntrata, 
    getEntrata, 
    updateEntrata, 
    deleteEntrata, 
    checkID
} = require('../controllers/entrataController');


const entrateRouter = express.Router();

entrateRouter.param('id', checkID);
entrateRouter.route('/')
    .get(getAllEntrate)
    .post(createEntrata);

entrateRouter.route('/:id')
    .get(getEntrata)
    .patch(updateEntrata)
    .delete(deleteEntrata);

module.exports = entrateRouter;
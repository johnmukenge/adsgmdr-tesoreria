const express = require('express');

const {
    getAllCasse, 
    createCassa, 
    getCassa, 
    updateCassa, 
    deleteCassa,
} = require('../controllers/cassaController');


const cassaRouter = express.Router();

cassaRouter.route('/')
    .get(getAllCasse)
    .post(createCassa);

cassaRouter.route('/:id')
    .get(getCassa)
    .patch(updateCassa)
    .delete(deleteCassa);

module.exports = cassaRouter;
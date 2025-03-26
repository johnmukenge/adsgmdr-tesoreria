const express = require('express');

const {
    getAllCasse, 
    createCassa, 
    getCassa, 
    updateCassa, 
    deleteCassa,
    aliasTopCasse,
    getCasseStats,
} = require('../controllers/cassaController');


const cassaRouter = express.Router();

// middleware to manipulate the query object
cassaRouter.route('/top-casse')
    .get(aliasTopCasse, getAllCasse);

cassaRouter.route('/casse-stats')
    .get(getCasseStats);

cassaRouter.route('/')
    .get(getAllCasse)
    .post(createCassa);

cassaRouter.route('/:id')
    .get(getCassa)
    .patch(updateCassa)
    .delete(deleteCassa);

module.exports = cassaRouter;
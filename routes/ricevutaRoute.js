
const express = require('express');

const {
    getAllRicevute, 
    createRicevuta, 
    getRicevuta, 
    updateRicevuta, 
    deleteRicevuta,
} = require('../controllers/ricevutaController');


const ricevutaRoute = express.Router();

ricevutaRoute.route('/')
    .get(getAllRicevute)
    .post(createRicevuta);

ricevutaRoute.route('/:id')
    .get(getRicevuta)
    .patch(updateRicevuta)
    .delete(deleteRicevuta);

module.exports = ricevutaRoute;
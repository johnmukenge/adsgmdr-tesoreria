
const express = require('express');

const {
    getAllRicevute, 
    createRicevuta, 
    getRicevuta, 
    updateRicevuta, 
    deleteRicevuta,
    ricevuteStats,
} = require('../controllers/ricevutaController');


const ricevutaRoute = express.Router();

ricevutaRoute.route('/')
    .get(getAllRicevute)
    .post(createRicevuta);

ricevutaRoute.route('/ricevute-stats')
    .get(ricevuteStats);

ricevutaRoute.route('/:id')
    .get(getRicevuta)
    .patch(updateRicevuta)
    .delete(deleteRicevuta);

module.exports = ricevutaRoute;
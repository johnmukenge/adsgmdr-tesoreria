
const express = require('express');
const { getAllUscite, createUscita, getUscita, updateUscita, deleteUscita } = require('../controllers/uscitaController');

const usciteRouter = express.Router();

usciteRouter.route('/')
    .get(getAllUscite)
    .post(createUscita);

usciteRouter.route('/:id')
    .get(getUscita)
    .patch(updateUscita)
    .delete(deleteUscita);

module.exports = usciteRouter;
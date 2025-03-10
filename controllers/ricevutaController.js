const Ricevuta = require('../models/ricevutaModel');

const getAllRicevute = async (req, res) => {
    console.log(req.requestTime);
    try {
        const ricevute = await Ricevuta.find();
        res.status(200).json({
            status: 'success',
            results: ricevute.length,
            data: {
                ricevute,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};
const getRicevuta = async (req, res) => {
    console.log(req.requestTime);
    try {
        const ricevuta = await Ricevuta.findById(req.params.id);
        // Ricevuta.findOne({ _id: req.params.id })
        res.status(200).json({
            status: 'success',
            data: {
                ricevuta,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};
const createRicevuta = async (req, res) => {
    try {
        const newRicevuta = await Ricevuta.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                ricevuta: newRicevuta,
            },
        });
    } catch (error) {
        console.error('Errore durante la creazione della ricevuta:', error);
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
const updateRicevuta = async (req, res) => {
    try {
        const ricevuta = await Ricevuta
            .findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
        res.status(200).json({
            status: 'success',
            data: {
                ricevuta,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};
const deleteRicevuta = async (req, res) => {
    try {
        await Ricevuta.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};

module.exports = {
    getAllRicevute,
    getRicevuta,
    createRicevuta,
    updateRicevuta,
    deleteRicevuta,
};
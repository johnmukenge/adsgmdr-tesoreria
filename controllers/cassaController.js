const Cassa = require('./../models/cassaModel');

const getAllCasse = async (req, res) => {
    console.log(req.requestTime);
    try {
        const casse = await Cassa.find();
        res.status(200).json({
            status: 'success',
            results: casse.length,
            data: {
                casse,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};
const getCassa = async (req, res) => {
    try {
        const cassa = await Cassa.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                cassa,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};
const createCassa = async (req, res) => {
    try {
        const newCassa = await Cassa.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                cassa: newCassa,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data received',
        });
    }
};
const updateCassa = async (req, res) => {
    try {
        const cassa = await Cassa
            .findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
        res.status(200).json({
            status: 'success',
            data: {
                cassa,
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
const deleteCassa = async (req, res) => {
    try {
        await Cassa.findByIdAndDelete(req.params.id);
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
    getAllCasse,
    getCassa,
    createCassa,
    updateCassa,
    deleteCassa,
};
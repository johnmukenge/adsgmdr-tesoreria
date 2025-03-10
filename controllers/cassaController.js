const Cassa = require('./../models/cassaModel');

const getAllCasse = async (req, res) => {
    console.log(req.requestTime);
    try {
        console.log(req.query);
        // Build the query
        // 1. Filtering
        const queryObj = { ...req.query };
            // Fields to exclude from the queryObj
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
            // remove the fields from the queryObj
        excludeFields.forEach(el => delete queryObj[el]);

        // 2. Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));
        
        // exact query: { tipoTesoreria: 'centrale', importo: { $gte: 1000 } }
        // coming from api { tipoTesoreria: 'centrale', percentuale: { gte: '15' } }

        const query = Cassa.find(JSON.parse(queryStr));
        // Execute the query
        const casse = await query;

        // Send the response
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
            message: error.message,
        });
    }
};
const getCassa = async (req, res) => {
    try {
        const cassa = await Cassa.findById(req.params.id);
        // Cassa.findOne({ _id: req.params.id })
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
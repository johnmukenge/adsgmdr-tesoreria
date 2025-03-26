const Cassa = require('./../models/cassaModel');
const APIFeatures = require('./../utils/apiFeatures');

const aliasTopCasse = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-importo';
    req.query.fields = 'nome,tipoPagamento,importo';
    next();
}

const getAllCasse = async (req, res) => {
    try {
        // Execute the query
        const features = new APIFeatures(Cassa.find(), req.query)
                            .filter()
                            .sort()
                            .limitFields()
                            .paginate();
        const casse = await features.query;

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

const getCasseStats = async (req, res) => {
    try {
        const stats = await Cassa.aggregate([
            {
                // matsh is a pipeline used to filter the data
                // in this case we are filtering the data where the importo is greater than 100
                $match: { importo: { $gte: 100 } },
            },
            {
                // group is a pipeline used to group the data
                // in this case we are grouping the data by null
                $group: {
                    _id: null,
                    // $sum is an accumulator operator used to sum the data
                    numCasse: { $sum: 1 },
                    // $avg is an accumulator operator used to calculate the average of the data
                    avgCasse: { $avg: '$importo' },
                    // $min is an accumulator operator used to calculate the minimum of the data
                    minCasse: { $min: '$importo' },
                    // $max is an accumulator operator used to calculate the maximum of the data
                    maxCasse: { $max: '$importo' },
                },
            },
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                stats,
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
}

module.exports = {
    getAllCasse,
    getCassa,
    createCassa,
    updateCassa,
    deleteCassa,
    aliasTopCasse,
    getCasseStats,
};
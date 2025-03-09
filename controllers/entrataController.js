const Entrata = require('./../models/entrataModel');

const getAllEntrate = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        /*results: entrate.length,
        requestedAt: req.requestTime,
        data: {
            entrate: entrate,
        }*/
    });
};
const getEntrata = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    // loop through all the entrate and find the one with the id that matches the one in the request
    /*const entrata = entrate.find(el => el.id === id); // * 1 converts the string to a number
    res.status(200).json({
        status: 'success',
        data: {
            entrata,
        },
    });*/
};
const createEntrata = async (req, res) => {
    try {
        const newEntrata = await Entrata.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                entrate: newEntrata,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error,
        });
    }
};
const updateEntrata = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            entrata: '<Aggiorna entrate qui...>',
        },
    });
};
const deleteEntrata = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
};

module.exports = {
    getAllEntrate,
    getEntrata,
    createEntrata,
    updateEntrata,
    deleteEntrata,
};
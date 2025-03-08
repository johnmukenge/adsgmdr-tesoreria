const fs = require('fs');

const entrate = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/entrate.json`)
);
const getAllEntrate = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        results: entrate.length,
        requestedAt: req.requestTime,
        data: {
            entrate: entrate,
        }
    });
};
const getEntrata = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    if(id > entrate.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Non ci sono entrate con questo ID',
        });
    }
    // loop through all the entrate and find the one with the id that matches the one in the request
    const entrata = entrate.find(el => el.id === id); // * 1 converts the string to a number
    res.status(200).json({
        status: 'success',
        data: {
            entrata,
        },
    });
};
const createEntrata = (req, res) => {
    //console.log(req.body);
    const newId = entrate[entrate.length - 1].id + 1;
    // retrieve the last entry and increment the number of the receipt
    const lastRicevuta = entrate[entrate.length - 1].ricevuta;
    const numeroRicevuta = lastRicevuta.numeroRicevuta.substring(0,3) + newId;
    // create a new ricevuta object with updated numeroRicevuta
    const newRicevuta = { ...lastRicevuta, numeroRicevuta: numeroRicevuta };
    const newEntrata = { ...req.body, id: newId,ricevuta: newRicevuta };
    
    entrate.push(newEntrata);

    fs.writeFile(`${__dirname}/dev-data/data/entrate.json`, JSON.stringify(entrate), err => {
        res.status(201).json({
            status: 'success',
            data: {
                entrate: newEntrata,
            },
        });
    });
};
const updateEntrata = (req, res) => {
    if(req.params.id * 1 > entrate.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Non ci sono entrate con questo ID',
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            entrata: '<Aggiorna entrate qui...>',
        },
    });
};
const deleteEntrata = (req, res) => {
    if(req.params.id * 1 > entrate.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Non ci sono entrate con questo ID',
        });
    }
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
const fs = require('fs');

const uscite = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/uscite.json`)
);
const getAllUscite = (req, res) => {
    res.status(200).json({
        status:'success',
        results: uscite.length,
        data: {
            uscite: uscite,
        }
    });
};
const getUscita = (req, res) => {
    const id = req.params.id * 1;
    if(id > uscite.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Non ci sono utenti con questo ID',
        });
    }
    const uscita = uscite.find(el => el.id === id);
    res.status(200).json({
        status: 'success',
        data: {
            uscita,
        },
    });
};
const createUscita = (req, res) => {
    const newId = uscite[uscite.length - 1].id + 1;
    // retrieve the last entry and increment the number of the receipt
    const lastRicevuta = uscite[uscite.length - 1].ricevuta;
    const numeroRicevuta = lastRicevuta.numeroRicevuta.substring(0,3) + newId;
    // create a new ricevuta object with updated numeroRicevuta
    const newRicevuta = { numeroRicevuta: numeroRicevuta, ...req.body.ricevuta };
    const newUscita = { ...req.body, id: newId,ricevuta: newRicevuta };
    
    uscite.push(newUscita);

    fs.writeFile(`${__dirname}/dev-data/data/uscite.json`, JSON.stringify(uscite), err => {
        res.status(201).json({
            status: 'success',
            data: {
                uscite: newUscita
            },
        });
    });
};
const updateUscita = (req, res) => {
    if(req.params.id * 1 > uscite.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Non ci sono utenti con questo ID',
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            user: '<Aggiorna utente qui...>',
        },
    });
};
const deleteUscita = (req, res) => {
    if(req.params.id * 1 > uscite.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Non ci sono utenti con questo ID',
        });
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
};

module.exports = { 
    getAllUscite, 
    getUscita, 
    createUscita, 
    updateUscita, 
    deleteUscita 
};
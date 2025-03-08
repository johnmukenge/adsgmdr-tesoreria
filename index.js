const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// middleware for parsing the body of the request
app.use(express.json());

const entrate = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/entrate.json`)
);

app.get('/api/v1/entrate', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: entrate.length,
        data: {
            entrate: entrate,
        }
    });
});

app.post('/api/v1/entrate', (req, res) => {
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
});

app.get('/api/v1/entrate/:id', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
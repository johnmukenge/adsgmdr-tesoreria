const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
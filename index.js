const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({message:'Hello World!', app: 'ADSGMDR'});
    });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const mongoose = require('mongoose');

// Creating a new Schema Entrate
const entrateSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome è obbligatorio']
  },
  data: {
    type: String,
  },
  importoTotale: {
    type: Number,
    required: [true, 'è importante avere l\'importo totale']
  },
});

// Creating a new Model Entrate
const Entrate = mongoose.model('Entrate', entrateSchema);

module.exports = Entrate;
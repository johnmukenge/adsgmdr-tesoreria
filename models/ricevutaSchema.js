const mongoose = require('mongoose');
const cassaModel = require('./cassaModel');

const ricevutaSchema = new mongoose.Schema({
    numeroRicevuta: {
        type: String,
        required: [true, 'Il numero della ricevuta è obbligatorio']
    },
    data: {
        type: Date,
        required: [true, 'La data è obbligatoria']
    },
    nomeContribuente: {
        type: String,
        required: [true, 'Il nome del contribuente è obbligatorio']
    },
    descrizione: String,
    cassa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cassa',
        required: [true, 'La cassa è obbligatoria']
    },
    tipoPagamento: {
        type: String,
        enum: ['banca', 'contanti'],
        required: [true, 'Il tipo di pagamento è obbligatorio']
    },
    tipoRicevuta: {
        type: String,
        enum: ['entrata', 'uscita'],
        required: [true, 'Il tipo di ricevuta è obbligatorio']
    },
    importo: {
        type: Number,
        required: [true, 'L\'importo è obbligatorio']
    },
    importoTotale: {
        type: Number,
        required: [true, 'L\'importo totale è obbligatorio']
    },
    firma: String,
    note: String
});

module.exports = mongoose.model('Ricevuta', ricevutaSchema);
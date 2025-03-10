const mongoose = require('mongoose');
const cassaModel = require('./cassaModel');

const ricevutaSchema = new mongoose.Schema({
    numeroRicevuta: {
        type: String,
        required: [true, 'Il numero della ricevuta è obbligatorio']
    },
    nomeContribuente: {
        type: String,
        required: [true, 'Il nome del contribuente è obbligatorio']
    },
    entries: [{
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
        tipoEntry: {
            type: String,
            enum: ['entrata', 'uscita'],
            required: [true, 'Il tipo di ricevuta è obbligatorio']
        },
        importo: {
            type: Number,
            required: [true, 'L\'importo è obbligatorio']
        },
    }],
    importoTotale: {
        type: Number,
        required: [true, 'L\'importo totale è obbligatorio']
    },
    firma: String,
    note: String,
    allegati: [{
        url: {
            type: String,
            required: [true, 'Il link all\'allegato è obbligatorio']
        },
        tipo: {
            type: String,
            enum: ['jpeg', 'png', 'pdf'],
            required: [true, 'Il tipo dell\'allegato è obbligatorio']
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ricevuta = mongoose.model('Ricevuta', ricevutaSchema, 'ricevute');
module.exports = Ricevuta;
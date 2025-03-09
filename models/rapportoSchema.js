const mongoose = require('mongoose');

const rapportoSchema = new mongoose.Schema({
    mese: {
        type: String,
        required: [true, 'Il mese è obbligatorio']
    },
    anno: {
        type: Number,
        required: [true, 'L\'anno è obbligatorio']
    },
    tesoriere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Il tesoriere è obbligatorio']
    },
    ricevute: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ricevuta'
    }],
    totaleEntrate: {
        type: Number,
        required: [true, 'Il totale delle entrate è obbligatorio']
    },
    totaleUscite: {
        type: Number,
        required: [true, 'Il totale delle uscite è obbligatorio']
    }
});

module.exports = mongoose.model('Rapporto', rapportoSchema);
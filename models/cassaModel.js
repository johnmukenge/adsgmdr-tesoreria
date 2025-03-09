const mongoose = require('mongoose');

const cassaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Il nome della cassa è obbligatorio']
    },
    percentuale: {
        type: Number,
        required: [true, 'La percentuale è obbligatoria']
    },
    tipoTesoreria: {
        type: String,
        enum: ['locale', 'centrale'],
        required: [true, 'Il tipo di tesoreria è obbligatorio']
    },
    tipoOperazione: {
        type: String,
        enum: ['entrata', 'uscita'],
        required: [true, 'Il tipo è obbligatorio']
    },
    tipoPagamento: {
        type: String,
        enum: ['banca', 'contanti'],
        default: 'banca',
        required: [true, 'Il tipo di pagamento è obbligatorio']
    }
});

const Cassa = mongoose.model('Cassa', cassaSchema, 'casse');
module.exports = Cassa;


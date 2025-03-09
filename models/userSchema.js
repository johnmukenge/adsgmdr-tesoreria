const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Il nome è obbligatorio']
    },
    email: {
        type: String,
        //required: [true, 'L\'email è obbligatoria'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La password è obbligatoria']
    },
    ruolo: {
        type: String,
        enum: ['tesoriereLocale', 'tesoriereCentrale', 'admin'],
        required: [true, 'Il ruolo è obbligatorio']
    }
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'}); // load environment variables from.env file

const app = require('./index');

//console.log(app.get('env'));// show environment variable --> development
//console.log(process.env);// show all environment variables

// Connect to the database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => console.log('DB connection successful'));

// Creating a new Schema Entrate
const entrateSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome è obbligatorio']
  },
  importoTotale: {
    type: Number,
    required: [true, 'è importante avere l\'importo totale']
  },
});

// Creating a new Model Entrate
const Entrate = mongoose.model('Entrate', entrateSchema);

const port = process.env.PORT || 3000; // use environment variable PORT or default 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
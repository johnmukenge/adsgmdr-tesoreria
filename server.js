const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'}); // load environment variables from.env file

const app = require('./index');

// Connect to the database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000; // use environment variable PORT or default 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
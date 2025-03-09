const dotenv = require('dotenv');
dotenv.config({path: './config.env'}); // load environment variables from.env file

const app = require('./index');

//console.log(app.get('env'));// show environment variable --> development
//console.log(process.env);// show all environment variables

const port = process.env.PORT || 3000; // use environment variable PORT or default 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
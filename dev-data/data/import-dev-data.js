const { Mongoose } = require("mongoose");

Mongoose.connect('mongodb://localhost:27017/tesoreria', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log('DB connection successful');
});

// READ DATA
const fs = require('fs');
const ricevute = JSON.parse(fs.readFileSync(`${__dirname}/entrate.json`, 'utf8'));

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Entrata.create(entrate);
        console.log('Data successfully loaded');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Entrata.deleteMany();
        console.log('Data successfully deleted');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

if(process.argv[2] === '--import'){
    importData();
} else if(process.argv[2] === '--delete'){
    deleteData();
}

// run node dev-data/data/import-dev-data.js --import

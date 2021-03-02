
const mongoose = require('mongoose');
const config = require('../config/dev');
const fakeDB = require('./fakeDB');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, async () => {
    console.log("Start populating DB......");
    await fakeDB.populate();
    mongoose.connection.close();
    console.log("Finished Population DB....");
})
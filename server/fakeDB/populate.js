
const mongoose = require('mongoose');
const config = require('../config/dev');
const fakeDB = require('./fakeDB');

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("populating DB......")
})
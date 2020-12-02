const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const database = mongoose.connection;

database.on('connected', () => {
    console.log('Mongoose default connection is open');
});

database.on('error', error => {
    console.log(`Mongoose default connection has occured \n${error}`);
});

database.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    database.close(() => {
        console.log('Mongoose default connection is disconnected due to application termination');
        process.exit(0);
    });
})

const Mentions = require('./models/mentions');

const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const mentionsRoutes = require('./routes/mentions-routes');
app.use('/mentions', mentionsRoutes);

module.exports = app;
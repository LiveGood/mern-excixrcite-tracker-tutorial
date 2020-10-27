const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// TODO: what are cors() ajd express.json()
app.use(cors());
app.use(express.json());


// Start of MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database is running.!');
})

// Require the routes that the SPA app has.
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})



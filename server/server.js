require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const App = express();

const models = require('./db/schema');


// const httpServer = http.Server(App);
const PORT = 8080;

process.env.NODE_ENV !== "prod" && App.use(morgan('dev'));
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(express.static('public'));

const db = mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(db => console.log('db in server.js: ', db));

const apiRoutes = require('./routes/apiRoutes');
App.use('/api', apiRoutes(db, models));

App.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});
  
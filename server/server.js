const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const App = express();

require('./db/schema');

require('dotenv').config();

const httpServer = http.Server(App);
const PORT = 8080;

process.env.NODE_ENV !== "prod" && App.use(morgan('dev'));
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(express.static('public'));


mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  );
  
  httpServer.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
  });
  
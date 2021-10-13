const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const App = express();

require('dotenv').config();

const httpServer = http.Server(App);
const PORT = 8080;

App.use(express.urlencoded({ extended: false }));
App.use(express.json());
App.use(express.static('public'));

httpServer.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
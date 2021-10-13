const express = require('express');
const http = require('http');
const App = express();

const httpServer = http.Server(App);
const PORT = 8080;

App.use(express.urlencoded({ extended: false }));
App.use(express.json());
App.use(express.static('public'));

httpServer.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});
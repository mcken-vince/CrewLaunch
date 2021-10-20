require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const App = express();

const models = require('./src/db/schema');


// const httpServer = http.Server(App);
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

const apiRoutes = require('./src/routes/apiRoutes');
const clientsRoutes = require('./src/routes/clientsRoutes');
const contractsRoutes = require('./src/routes/contractsRoutes');
const crewsRoutes = require('./src/routes/crewsRoutes');
const jobsRoutes = require('./src/routes/jobsRoutes');
const packagesRoutes = require('./src/routes/packagesRoutes');

App.use('/api', apiRoutes(models));
App.use('/clients', clientsRoutes(models.Client));
App.use('/contracts', contractsRoutes(models.Contract));
App.use('/crews', crewsRoutes(models.Crew));
App.use('/jobs', jobsRoutes(models.Job));
App.use('/packages', packagesRoutes(models.Package));

App.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});
  
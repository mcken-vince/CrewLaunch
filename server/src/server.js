require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const App = express();

const { ClientModel } = require('./models/client.model');
const { PackageModel } = require('./models/package.model');
const { CrewModel } = require('./models/crew.model');
const { ClientModel } = require('./models/client.model');
const { JobModel } = require('./models/job.model');


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

const apiRoutes = require('./routes/apiRoutes');
const clientsRoutes = require('./routes/clientsRoutes');
const contractsRoutes = require('./routes/contractsRoutes');
const crewsRoutes = require('./routes/crewsRoutes');
const jobsRoutes = require('./routes/jobsRoutes');
const packagesRoutes = require('./routes/packagesRoutes');

App.use('/api', apiRoutes({ClientModel, ContractModel, CrewModel, JobModel, PackageModel}));
App.use('/clients', clientsRoutes(ClientModel));
App.use('/contracts', contractsRoutes(ContractModel));
App.use('/crews', crewsRoutes(CrewModel));
App.use('/jobs', jobsRoutes(JobModel));
App.use('/packages', packagesRoutes(PackageModel));

App.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});
  
require('dotenv').config();
import express, { Express, Request, Response } from 'express';

// const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const App = express();

const { ClientModel } = require('./models/client.model');
const { PackageModel } = require('./models/package.model');
const { CrewModel } = require('./models/crew.model');
const { ContractModel } = require('./models/contract.model');
const { JobModel } = require('./models/job.model');
const { UserModel } = require('./models/user.model');

// const httpServer = http.Server(App);
const PORT = process.env.PORT || 8080;

process.env.NODE_ENV !== "production" && App.use(morgan('dev'));
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

import usersRoutes from './routes/usersRoutes';
import apiRoutes from './routes/apiRoutes';
import clientsRoutes from './routes/clientsRoutes';
import contractsRoutes from './routes/contractsRoutes';
import crewsRoutes from './routes/crewsRoutes';
import jobsRoutes from './routes/jobsRoutes';
import packagesRoutes from './routes/packagesRoutes';

App.use('/users', usersRoutes(UserModel));
App.use('/api', apiRoutes({ClientModel, ContractModel, CrewModel, JobModel, PackageModel}));
App.use('/clients', clientsRoutes(ClientModel));
App.use('/contracts', contractsRoutes(ContractModel));
App.use('/crews', crewsRoutes(CrewModel));
App.use('/jobs', jobsRoutes(JobModel));
App.use('/packages', packagesRoutes(PackageModel));

const root = path.join(__dirname, 'build');
App.use(express.static(root))

App.get('*', (req: Request, res: Response): void => {
  res.sendFile('index.html', { root } );
});


App.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
  // console.log(`Serving up file: ${path.resolve(root, "index.html")}`);
});
  
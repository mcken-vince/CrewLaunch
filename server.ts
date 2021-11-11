import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

// const http = require('http');
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import { error } from 'console';
const App = express();

import { ClientModel } from './models/client.model';
import { PackageModel } from './models/package.model';
import { CrewModel } from './models/crew.model';
import { ContractModel } from './models/contract.model';
import { JobModel } from './models/job.model';
import { UserModel } from './models/user.model';
import { AdminModel } from './models/admin.model';

// const httpServer = http.Server(App);
const PORT = process.env.PORT || 8080;

process.env.NODE_ENV !== "production" && App.use(morgan('dev'));
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

if (!process.env.MONGODB_URI || process.env.MONGODB_URI === undefined) throw error('MONGODB_URI must be defined')

mongoose.connect(
  process.env.MONGODB_URI,
  );
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }
  
import usersRoutes from './routes/usersRoutes';
import apiRoutes from './routes/apiRoutes';
import clientsRoutes from './routes/clientsRoutes';
import contractsRoutes from './routes/contractsRoutes';
import crewsRoutes from './routes/crewsRoutes';
import jobsRoutes from './routes/jobsRoutes';
import packagesRoutes from './routes/packagesRoutes';

App.use('/api', apiRoutes({ClientModel, ContractModel, CrewModel, JobModel, PackageModel}));
App.use('/users', usersRoutes(UserModel, AdminModel));
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const App = express();
const { ClientModel } = require('./models/client.model');
const { PackageModel } = require('./models/package.model');
const { CrewModel } = require('./models/crew.model');
const { ContractModel } = require('./models/contract.model');
const { JobModel } = require('./models/job.model');
// const httpServer = http.Server(App);
const PORT = 8080;
process.env.NODE_ENV !== "prod" && App.use(morgan('dev'));
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(express.static('public'));
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const clientsRoutes_1 = __importDefault(require("./routes/clientsRoutes"));
const contractsRoutes_1 = __importDefault(require("./routes/contractsRoutes"));
const crewsRoutes_1 = __importDefault(require("./routes/crewsRoutes"));
const jobsRoutes_1 = __importDefault(require("./routes/jobsRoutes"));
const packagesRoutes_1 = __importDefault(require("./routes/packagesRoutes"));
App.use('/api', (0, apiRoutes_1.default)({ ClientModel, ContractModel, CrewModel, JobModel, PackageModel }));
App.use('/clients', (0, clientsRoutes_1.default)(ClientModel));
App.use('/contracts', (0, contractsRoutes_1.default)(ContractModel));
App.use('/crews', (0, crewsRoutes_1.default)(CrewModel));
App.use('/jobs', (0, jobsRoutes_1.default)(JobModel));
App.use('/packages', (0, packagesRoutes_1.default)(PackageModel));
App.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

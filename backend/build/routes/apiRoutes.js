"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
;
const router = express_1.default.Router();
const apiRoutes = (models) => {
    router.get('/crews', (req, res) => {
        models.CrewModel.find({})
            .then((result) => {
            console.log(`Successful GET /api/crews`);
            res.json({ result });
        })
            .catch((err) => {
            console.log(`Error: Could not GET /api/crews ${err}`);
        });
    });
    router.get('/clients', (req, res) => {
        models.ClientModel.find({})
            .then((result) => {
            console.log(`Successful GET /api/clients`);
            res.json({ result });
        })
            .catch((err) => {
            console.log(`Error: Could not GET /api/crews ${err}`);
        });
    });
    router.get('/packages', (req, res) => {
        models.PackageModel.find({})
            .then((result) => {
            console.log(`Successful GET /api/packages`);
            res.json({ result });
        })
            .catch((err) => {
            console.log(`Error: Could not GET /api/packages ${err}`);
        });
    });
    router.get('/contracts', (req, res) => {
        models.ContractModel.find({})
            .then((result) => {
            console.log(`Successful GET /api/contracts`);
            res.json({ result });
        })
            .catch((err) => {
            console.log(`Error: Could not GET /api/contracts ${err}`);
        });
    });
    router.get('/jobs', (req, res) => {
        models.JobModel.find({})
            .then((result) => {
            console.log(`Successful GET /api/jobs`);
            res.json({ result });
        })
            .catch((err) => {
            console.log(`Error: Could not GET /api/jobs ${err}`);
        });
    });
    return router;
};
exports.default = apiRoutes;

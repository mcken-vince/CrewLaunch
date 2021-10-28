"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const contractsRoutes = (Contract) => {
    router.post('/', (req, res) => {
        const contract = new Contract(req.body);
        contract.save()
            .then(newContract => {
            console.log('New contract created successfully');
            res.json(newContract);
        })
            .catch(err => {
            console.log(`Error: could not create new contract ${err}`);
            res.send(err);
        });
    });
    router.post('/:id', (req, res) => {
        const update = req.body;
        Contract.findOne({
            id: req.params.id
        })
            .then(contract => {
            if (!contract) {
                throw Error('Error updating nonexistent contract');
            }
            contract.client_id = update.client_id;
            contract.package_id = update.package_id;
            contract.address = update.address;
            contract.start_date = update.start_date;
            contract.job_notes = update.job_notes;
            return contract.save();
        })
            .then(client => {
            console.log('Contract updated successfully');
            res.json(client);
        })
            .catch(err => {
            console.log(`Error: could not update contract ${err}`);
        });
    });
    return router;
};
exports.default = contractsRoutes;

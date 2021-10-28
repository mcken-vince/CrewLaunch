"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const clientsRoutes = (Client) => {
    router.post('/', (req, res) => {
        const client = new Client(req.body);
        client.save()
            .then(newClient => {
            console.log('New client created successfully');
            res.json(newClient);
        })
            .catch(err => {
            console.log(`Error: could not create new client ${err}`);
            res.send(err);
        });
    });
    router.post('/:id', (req, res) => {
        const update = req.body;
        Client.findOne({
            id: req.params.id
        })
            .then(client => {
            if (!client) {
                throw Error('Error updating nonexistent client');
            }
            client.name = update.name;
            client.email = update.email;
            client.phone = update.phone;
            return client.save();
        })
            .then(client => {
            console.log('Client updated successfully');
            res.json(client);
        })
            .catch(err => {
            console.log(`Error: could not update client ${err}`);
        });
    });
    return router;
};
exports.default = clientsRoutes;

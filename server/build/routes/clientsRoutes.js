"use strict";
const express = require('express');
const router = express.Router();
module.exports = (Client) => {
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

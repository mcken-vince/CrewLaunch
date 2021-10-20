"use strict";
const express = require('express');
const router = express.Router();
module.exports = (Crew) => {
    router.post('/', (req, res) => {
        const crew = new Crew(req.body);
        crew.save()
            .then(newCrew => {
            console.log('New crew created successfully');
            res.json(newCrew);
        })
            .catch(err => {
            console.log(`Error: could not create new crew ${err}`);
            res.send(err);
        });
    });
    router.post('/:id', (req, res) => {
        const update = req.body;
        Crew.findOne({
            id: req.params.id
        })
            .then(crew => {
            crew.name = update.name;
            crew.email = update.email;
            crew.phone = update.phone;
            return crew.save();
        })
            .then(crew => {
            console.log('Crew updated successfully');
            res.json(crew);
        })
            .catch(err => {
            console.log(`Error: could not update crew ${err}`);
        });
    });
    return router;
};

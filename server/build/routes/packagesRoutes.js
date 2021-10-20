"use strict";
const express = require('express');
const router = express.Router();
module.exports = (Package) => {
    router.post('/', (req, res) => {
        const thisPackage = new Package(req.body);
        thisPackage.save()
            .then(newPackage => {
            console.log('New package created successfully');
            res.json(newPackage);
        })
            .catch(err => {
            console.log(`Error: could not create new package ${err}`);
            res.send(err);
        });
    });
    router.post('/:id', (req, res) => {
        const update = req.body;
        Package.findOne({
            id: req.params.id
        })
            .then(thisPackage => {
            thisPackage.name = update.name;
            thisPackage.email = update.email;
            thisPackage.phone = update.phone;
            return thisPackage.save();
        })
            .then(thisPackage => {
            console.log('Package updated successfully');
            res.json(thisPackage);
        })
            .catch(err => {
            console.log(`Error: could not update package ${err}`);
        });
    });
    return router;
};

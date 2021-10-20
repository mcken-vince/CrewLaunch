const express = require('express');
const router = express.Router();

module.exports = (Package) => {
  router.post('/', (req, res) => {
    const package = new Package(req.body);
    package.save()
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
    .then(package => {
      package.name = update.name;
      package.email = update.email;
      package.phone = update.phone;
      return package.save()
    })
    .then(package => {
      console.log('Package updated successfully');
      res.json(package);
    })
    .catch(err => {
      console.log(`Error: could not update package ${err}`);
    });
  });

  return router;
};
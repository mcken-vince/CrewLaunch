const express = require('express');
const router = express.Router();

module.exports = (Contract) => {
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
      contract.name = update.name;
      contract.email = update.email;
      contract.phone = update.phone;
      return client.save()
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
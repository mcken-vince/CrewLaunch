import express from 'express';
import { Model } from 'mongoose';
import { IContract } from '../models/contract.model';

const router: express.IRouter = express.Router();

module.exports = (Contract: Model<IContract>) => {
  router.post('/', (req, res) => {
    const contract: IContract = new Contract(req.body);
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
    const update: IContract = req.body;

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
      return contract.save()
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
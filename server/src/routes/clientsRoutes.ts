import express from 'express';
import { Model } from 'mongoose';
import { IClient } from '../models/client.model';

const router: express.IRouter = express.Router();

const clientsRoutes = (Client: Model<IClient> ) => {
  router.post('/', (req, res) => {
    const client: IClient = new Client(req.body);
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
    const update: IClient = req.body;

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
      return client.save()
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

export default clientsRoutes;
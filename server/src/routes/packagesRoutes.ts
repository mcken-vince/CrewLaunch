import express from 'express';
import { Model } from 'mongoose';
import { IPackage } from '../models/package.model';
const router: express.IRouter = express.Router();

const packagesRoutes = (Package: Model<IPackage>) => {
  router.post('/', (req, res) => {
    const thisPackage: IPackage = new Package(req.body);
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
    const update: IPackage = req.body;

    Package.findOne({
      id: req.params.id
    })
    .then(thisPackage => {
      if (!thisPackage) {
        throw Error('Error updating nonexistent package');
      }
      thisPackage.title = update.title;
      thisPackage.cost = update.cost;
      thisPackage.description = update.description;
      thisPackage.visit_interval_days = update.visit_interval_days;
      thisPackage.man_hrs_per_visit = update.man_hrs_per_visit;
      thisPackage.contract_length_days = update.contract_length_days;
      return thisPackage.save()
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

export default packagesRoutes;
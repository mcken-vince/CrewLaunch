import express from 'express';
import { ICrew } from '../models/crew.model';
import { Model } from 'mongoose';
const router: express.IRouter = express.Router();

const crewsRoutes = (Crew: Model<ICrew>) => {
  router.post('/', (req, res) => {
    const crew: ICrew = new Crew(req.body);
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
    const update: ICrew = req.body;

    const query = { _id: req.params.id };
    Crew.findOneAndUpdate(
      query,
      {
        foreman_name: update.foreman_name,
        crew_size: update.crew_size,
        is_active: update.is_active,
        avatar: update.avatar
      },
      { new: true, overwrite: true }
    )
    .then(crew => {
      console.log('Crew updated successfully');
      res.json(crew);
    })
    .catch(err => {
      console.log(`Error: could not update crew ${err}`);
    });
  });

  router.delete('/:id', (req, res) => {
    Crew.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send('Crew deleted');
    })
    .catch((err) => {
      console.log(`Error: could not delete crew ${err}`);
    });
  });

  return router;
};

export default crewsRoutes;

import express from 'express';
import { Model } from 'mongoose';
import { IJob } from '../models/job.model';
const router: express.IRouter = express.Router();

const jobRoutes = (Job: Model<IJob>) => {
  router.post('/', (req, res) => {
    const job: IJob = new Job(req.body);
    job.save()
    .then(newJob => {
      console.log('New job created successfully');
      res.json(newJob);
    })
    .catch(err => {
      console.log(`Error: could not create new job ${err}`);
      res.send(err);
    });
  });

  router.post('/:id', (req, res) => {
    const update: IJob = req.body;

    Job.findOne({
      id: req.params.id
    })
    .then(job => {
      if (!job) {
        throw Error('Error updating nonexistent job');
      }
      job.crew_id = update.crew_id;
      job.date = update.date;
      job.completed = update.completed;
      return job.save()
    })
    .then(job => {
      console.log('Job updated successfully');
      res.json(job);
    })
    .catch(err => {
      console.log(`Error: could not update job ${err}`);
    });
  });

  return router;
};

export default jobsRoutes;

import express from 'express';
import { Model } from 'mongoose';
import { IJob } from '../models/job.model';
const router: express.IRouter = express.Router();

const jobsRoutes = (Job: Model<IJob>) => {
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

  router.post('/:id', async (req, res) => {
    const update: IJob = req.body;
    const query = { _id: req.params.id };
    await Job.findOneAndUpdate(
      query,
      {
        contract_id: update.contract_id,
        crew_id: update.crew_id,
        date: update.date,
        completed: update.completed
      },
      { new: true, overwrite: true }
    )
    .then(job => {
      console.log('Job updated successfully', job);
      res.json(job);
    })
    .catch(err => {
      console.log(`Error: could not update job ${err}`);
    });
  });

  return router;
};

export default jobsRoutes;

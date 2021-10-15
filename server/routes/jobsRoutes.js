const express = require('express');
const router = express.Router();

module.exports = (Job) => {
  router.post('/', (req, res) => {
    const job = new Job(req.body);
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
    const update = req.body;

    Job.findOne({
      id: req.params.id
    })
    .then(job => {
      job.name = update.name;
      job.email = update.email;
      job.phone = update.phone;
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
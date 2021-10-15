const express = require('express');
const router = express.Router();

module.exports = (db, models) => {
  router.get('/crews', (req, res) => {
    models.Crew.find({})
    .then(result => {
      console.log(`Successful GET /api/crews`);
      res.json({result});
    })
    .catch(err => {
      console.log(`Error: Could not GET /api/crews ${err}`);
    });
  });

  router.get('/clients', (req, res) => {
    models.Client.find({})
    .then(result => {
      console.log(`Successful GET /api/clients`);
      res.json({result});
    })
    .catch(err => {
      console.log(`Error: Could not GET /api/crews ${err}`);
    });
  });

  router.get('/packages', (req, res) => {
    models.Package.find({})
    .then(result => {
      console.log(`Successful GET /api/packages`);
      res.json({result});
    })
    .catch(err => {
      console.log(`Error: Could not GET /api/packages ${err}`);
    });
  });

  router.get('/contracts', (req, res) => {
    models.Contract.find({})
    .then(result => {
      console.log(`Successful GET /api/contracts`);
      res.json({result});
    })
    .catch(err => {
      console.log(`Error: Could not GET /api/contracts ${err}`);
    });
  });

  router.get('/jobs', (req, res) => {
    models.Job.find({})
    .then(result => {
      console.log(`Successful GET /api/jobs`);
      res.json({result});
    })
    .catch(err => {
      console.log(`Error: Could not GET /api/jobs ${err}`);
    });
  });

  return router;
};

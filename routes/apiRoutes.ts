import express from 'express';
import { Model } from 'mongoose';

interface IAllModels {
  PackageModel: Model<any>;
  ClientModel: Model<any>;
  CrewModel: Model<any>;
  ContractModel: Model<any>;
  JobModel: Model<any>;
};

const router = express.Router();

const apiRoutes = (models: IAllModels) => {
  router.get('/crews', (req, res) => {
    models.CrewModel.find({})
    .then((result: any) => {
      console.log(`Successful GET /api/crews`);
      res.json({result});
    })
    .catch((err: any) => {
      console.log(`Error: Could not GET /api/crews ${err}`);
    });
  });

  router.get('/clients', (req, res) => {
    models.ClientModel.find({})
    .then((result: any) => {
      console.log(`Successful GET /api/clients`);
      res.json({result});
    })
    .catch((err: any) => {
      console.log(`Error: Could not GET /api/crews ${err}`);
    });
  });

  router.get('/packages', (req, res) => {
    models.PackageModel.find({})
    .then((result: any) => {
      console.log(`Successful GET /api/packages`);
      res.json({result});
    })
    .catch((err: any) => {
      console.log(`Error: Could not GET /api/packages ${err}`);
    });
  });

  router.get('/contracts', (req, res) => {
    models.ContractModel.find({})
    .then((result: any) => {
      console.log(`Successful GET /api/contracts`);
      res.json({result});
    })
    .catch((err: any) => {
      console.log(`Error: Could not GET /api/contracts ${err}`);
    });
  });

  router.get('/jobs', (req, res) => {
    models.JobModel.find({})
    .then((result: any) => {
      console.log(`Successful GET /api/jobs`);
      res.json({result});
    })
    .catch((err: any) => {
      console.log(`Error: Could not GET /api/jobs ${err}`);
    });
  });

  return router;
};

export default apiRoutes;

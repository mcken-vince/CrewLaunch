"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jobsRoutes = (Job) => {
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
            if (!job) {
                throw Error('Error updating nonexistent job');
            }
            job.crew_id = update.crew_id;
            job.date = update.date;
            job.completed = update.completed;
            return job.save();
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
exports.default = jobsRoutes;

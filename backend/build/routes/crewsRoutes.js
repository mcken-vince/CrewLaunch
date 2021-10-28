"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const crewsRoutes = (Crew) => {
    router.post('/', (req, res) => {
        const crew = new Crew(req.body);
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
        const update = req.body;
        Crew.findOne({
            id: req.params.id
        })
            .then(crew => {
            if (!crew) {
                throw Error('Error updating nonexistent crew');
            }
            crew.foreman_name = update.foreman_name;
            crew.crew_size = update.crew_size;
            crew.is_active = update.is_active;
            crew.avatar = update.avatar;
            return crew.save();
        })
            .then(crew => {
            console.log('Crew updated successfully');
            res.json(crew);
        })
            .catch(err => {
            console.log(`Error: could not update crew ${err}`);
        });
    });
    return router;
};
exports.default = crewsRoutes;

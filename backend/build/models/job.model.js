"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = require("mongoose");
;
const JobSchema = new mongoose_1.Schema({
    crew_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    contract_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: Date
});
exports.JobModel = (0, mongoose_1.model)('Job', JobSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageModel = void 0;
const mongoose_1 = require("mongoose");
;
const PackageSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    contract_length_days: {
        type: Number,
        required: true
    },
    visit_interval_days: {
        type: Number,
        required: true
    },
    man_hrs_per_visit: {
        type: Number,
        required: true
    },
    description: String,
}, { timestamps: true });
exports.PackageModel = (0, mongoose_1.model)('Package', PackageSchema);

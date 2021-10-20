"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractModel = void 0;
const mongoose_1 = require("mongoose");
;
const ContractSchema = new mongoose_1.Schema({
    package_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    client_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    job_notes: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    }
}, { timestamps: true });
exports.ContractModel = (0, mongoose_1.model)('Contract', ContractSchema);

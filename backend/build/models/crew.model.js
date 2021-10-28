"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrewModel = void 0;
const mongoose_1 = require("mongoose");
;
const CrewSchema = new mongoose_1.Schema({
    foreman_name: {
        type: String,
        required: true
    },
    crew_size: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    avatar: String
}, { timestamps: true });
exports.CrewModel = (0, mongoose_1.model)('Crew', CrewSchema);

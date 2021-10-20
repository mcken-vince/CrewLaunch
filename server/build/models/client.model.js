"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = require("mongoose");
;
const ClientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: String
}, { timestamps: true });
exports.ClientModel = (0, mongoose_1.model)('Client', ClientSchema);

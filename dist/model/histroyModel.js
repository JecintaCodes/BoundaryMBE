"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const histroyModel = new mongoose_1.Schema({
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    details: {
        type: String,
    },
    orders: [{
            type: mongoose_1.Types.ObjectId,
            ref: "orders",
        }],
    users: {
        type: mongoose_1.Types.ObjectId,
        ref: "users"
    },
    admins: {
        type: mongoose_1.Types.ObjectId,
        ref: "admins"
    },
    buyers: {
        type: mongoose_1.Types.ObjectId,
        ref: "buyers"
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("histroys", histroyModel);

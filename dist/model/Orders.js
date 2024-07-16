"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderModel = new mongoose_1.Schema({
    date: {
        type: Number,
    },
    id1: {
        type: Number,
    },
    email: {
        type: String,
        require: true,
    },
    custormersName: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
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
exports.default = (0, mongoose_1.model)("orders", orderModel);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminModel = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    role: {
        type: String,
    },
    detail: {
        type: String,
    },
    secretCode: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    imageID: {
        type: String,
    },
    verify: {
        type: Boolean,
    },
    users: {
        type: mongoose_1.Types.ObjectId,
        ref: "users"
    },
    stores: {
        type: mongoose_1.Types.ObjectId,
        ref: "stores"
    },
    orders: {
        type: mongoose_1.Types.ObjectId,
        ref: "orders"
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("admins", adminModel);

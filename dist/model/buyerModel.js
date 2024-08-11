"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const buyerModel = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    imageID: {
        type: String,
    },
    details: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowerCase: true,
    },
    verify: {
        type: Boolean,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
    },
    admins: {
        type: mongoose_1.Types.ObjectId,
        ref: "admins"
    },
    stores: {
        type: mongoose_1.Types.ObjectId,
        ref: "stores"
    },
    users: {
        type: mongoose_1.Types.ObjectId,
        ref: "users"
    },
    orders: [{
            type: mongoose_1.Types.ObjectId,
            ref: "orders"
        }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("buyers", buyerModel);

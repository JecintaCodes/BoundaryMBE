"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productModel = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    description: {
        type: String,
    },
    storeID: {
        type: String,
    },
    amount: {
        type: Number,
    },
    toggle: {
        type: Boolean,
        default: false,
    },
    QTYinStock: {
        type: Number,
        default: 0,
    },
    stores: [{
            type: mongoose_1.Types.ObjectId,
            ref: "stores"
        }],
    users: [{
            type: mongoose_1.Types.ObjectId,
            ref: "users"
        }],
    admins: {
        type: mongoose_1.Types.ObjectId,
        ref: "admins"
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("products", productModel);

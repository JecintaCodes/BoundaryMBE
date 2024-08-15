"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowerCase: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
    },
    detail: {
        type: String,
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
    // secretCode:{
    //     type:String,
    //     require:true,
    // },
    admins: {
        type: mongoose_1.Types.ObjectId,
        ref: "admins",
    },
    stores: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "stores",
        },
    ],
    orders: {
        type: mongoose_1.Types.ObjectId,
        ref: "orders",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storeModel = new mongoose_1.Schema({
    storeName: {
        type: String,
        require: true,
    },
    storeUrl: {
        type: String,
    },
    storeEmail: {
        type: String,
        require: true,
        //   unique: true,
        lowercase: true,
    },
    storeImg: {
        type: String,
    },
    storeImgID: {
        type: String,
    },
    storeDetail: {
        type: String,
    },
    verify: {
        type: Boolean,
    },
    storeSocialMediaAcc: {
        type: String,
    },
    category: {
        type: String,
        require: true,
    },
    users: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "users",
        },
    ],
    products: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "products",
        },
    ],
    admins: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "users",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("stores", storeModel);

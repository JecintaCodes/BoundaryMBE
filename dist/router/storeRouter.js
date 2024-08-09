"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storeController_1 = require("../controller/storeController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("image");
const storeRouter = (0, express_1.Router)();
storeRouter.route("/:userID/create-store").post(upload, storeController_1.createStore);
// storeRouter.route("/:userID/sign-in-store").post(signInStore)
storeRouter.route("/get-store").get(storeController_1.getAllStores);
storeRouter.route("/:storeID/get-one-store").get(storeController_1.getOneStore);
storeRouter.route("/:userID/:storeID/get-one-user-store").get(storeController_1.getOneUserStore);
storeRouter.route("/:storeID/:userID/get-one-store-user").get(storeController_1.getOneStoreUser);
storeRouter.route("/search-store-category").get(storeController_1.searchStoreCategory);
storeRouter.route("/search-store-name").get(storeController_1.searchStoreName);
storeRouter.route("/:adminID/:storeID/admin-delete-store").delete(storeController_1.adminDeleteStore);
storeRouter.route("/:userID/:storeID/user-delete-store").delete(storeController_1.userDeleteStore);
storeRouter.route(":storeID/store-products").get(storeController_1.getStoreProducts);
exports.default = storeRouter;

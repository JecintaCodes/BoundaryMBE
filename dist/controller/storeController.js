"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneStore = exports.getAllStores = exports.userDeleteStore = exports.adminDeleteStore = exports.searchStoreCategory = exports.getOneStoreUser = exports.getOneUserStore = exports.signInStore = exports.createStore = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const storeModel_1 = __importDefault(require("../model/storeModel"));
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const adminModel_1 = __importDefault(require("../model/adminModel"));
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        console.log("start");
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const { storeName, storeUrl, StoreEmail, storeSocialMediaAcc, storeImg, storeDetail, category, password } = req.body;
            const salt = yield (0, bcrypt_1.genSalt)(10);
            const harsh = yield (0, bcrypt_1.hash)(password, salt);
            const store = yield storeModel_1.default.create({
                storeName,
                storeUrl,
                StoreEmail,
                storeSocialMediaAcc,
                storeImg,
                storeDetail,
                category,
                password: harsh,
                verify: true,
            });
            store === null || store === void 0 ? void 0 : store.users.push(new mongoose_1.Types.ObjectId(user._id));
            store === null || store === void 0 ? void 0 : store.save();
            // console.log()
            return res.status(201).json({
                message: ` ${user === null || user === void 0 ? void 0 : user.name} successfully created ${store === null || store === void 0 ? void 0 : store.storeName} store`,
                data: store
            });
            return res.status(201).json({
                message: `${user === null || user === void 0 ? void 0 : user.name} successfully created your ${store === null || store === void 0 ? void 0 : store.storeName}store`,
                data: store
            });
        }
        else {
            return res.status(404).json({
                message: ` you are not a user `
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `can't create store ${error}`
        });
    }
});
exports.createStore = createStore;
const signInStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { StoreEmail, password } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const store = yield storeModel_1.default.findOne({ StoreEmail });
            console.log(store);
            if (store === null || store === void 0 ? void 0 : store.verify) {
                const comp = yield (0, bcrypt_1.compare)(password, store === null || store === void 0 ? void 0 : store.password);
                if (comp) {
                    return res.status(200).json({
                        message: `u signed in successfully ${store === null || store === void 0 ? void 0 : store.storeName}`,
                        data: store === null || store === void 0 ? void 0 : store._id
                    });
                }
                else {
                    return res.status(404).json({
                        message: `Incorrect store Password`
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: `you didn't create a store`
                });
            }
        }
        else {
            return res.status(404).json({
                message: `you are not a user`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `can't sign in store :${error}`
        });
    }
});
exports.signInStore = signInStore;
const getOneUserStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, storeID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const store = yield storeModel_1.default.findById(storeID).populate({
                path: "stores",
                options: {
                    sort: {
                        createdAt: -1
                    }
                }
            });
            return res.status(200).json({
                message: `${user === null || user === void 0 ? void 0 : user.name} ${store === null || store === void 0 ? void 0 : store.storeName} stores gotten `
            });
        }
        else {
            return res.status(404).json({
                message: "u are not a user"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `error ${error}`
        });
    }
});
exports.getOneUserStore = getOneUserStore;
const getOneStoreUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, storeID } = req.params;
        const store = yield storeModel_1.default.findById(storeID);
        if (store) {
            const user = yield userModel_1.default.findById(userID).populate({
                path: "users",
                options: {
                    sort: {
                        createdAt: -1
                    }
                }
            });
            return res.status(200).json({
                message: `${store === null || store === void 0 ? void 0 : store.storeName} ${user === null || user === void 0 ? void 0 : user.name} stores gotten `
            });
        }
        else {
            return res.status(404).json({
                message: "u are not a store"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `error ${error}`
        });
    }
});
exports.getOneStoreUser = getOneStoreUser;
const searchStoreCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body;
        const store = yield storeModel_1.default.find({ category });
        return res.status(201).json({
            message: "one category gotten",
            data: store
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error ${error}`
        });
    }
});
exports.searchStoreCategory = searchStoreCategory;
const adminDeleteStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID, storeID } = req.params;
        const admin = yield adminModel_1.default.findById(adminID);
        if (admin) {
            const store = yield storeModel_1.default.findByIdAndDelete(storeID);
            return res.status(200).json({
                message: `${admin === null || admin === void 0 ? void 0 : admin.name} admin got ${store === null || store === void 0 ? void 0 : store.storeName} deleted`,
                data: store
            });
        }
        else {
            return res.status(404).json({
                message: `you are not an admin`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `error deleting store ${error}`
        });
    }
});
exports.adminDeleteStore = adminDeleteStore;
const userDeleteStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, storeID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const store = yield storeModel_1.default.findByIdAndDelete(storeID);
            // store?.users?.pull(new Types.ObjectId(user?._id))
            // store?.save();
            // user?.stores.pull(new Types.ObjectId(store._id))
            // user?.save();
            // store?.users.pull(new Types.ObjectId(user._id))
            // store?.save();
            return res.status(200).json({
                message: `${user === null || user === void 0 ? void 0 : user.name} user got ${store === null || store === void 0 ? void 0 : store.storeName} deleted`,
                data: store
            });
        }
        else {
            return res.status(404).json({
                message: `you are not an user`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `error deleting store ${error}`
        });
    }
});
exports.userDeleteStore = userDeleteStore;
const getAllStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeModel_1.default.find().sort({
            createdAt: -1
        });
        return res.status(200).json({
            message: `all stores gotten`,
            data: store
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error deleting store ${error}`
        });
    }
});
exports.getAllStores = getAllStores;
const getOneStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { storeID } = req.params;
        const store = yield storeModel_1.default.findById(storeID);
        return res.status(200).json({
            message: `one stores gotten`,
            data: store
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error deleting store ${error}`
        });
    }
});
exports.getOneStore = getOneStore;

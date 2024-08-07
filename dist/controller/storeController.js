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
exports.getOneStore = exports.getAllStores = exports.userDeleteStore = exports.adminDeleteStore = exports.searchStoreCategory = exports.getOneStoreUser = exports.getOneUserStore = exports.createStore = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const storeModel_1 = __importDefault(require("../model/storeModel"));
// import {hash, compare, genSalt} from "bcryptjs"
const adminModel_1 = __importDefault(require("../model/adminModel"));
const stream_1 = require("../utils/stream");
// export const createStore = async(req:Request, res:Response)=>{
//    try {
//     const {userID} = req.params;
//     const {storeDetail,storeImgID,storeImg,category,storeUrl,storeSocialMediaAcc,storeName,storeEmail} = req.body;
//     const {secure_url,public_id}:any = await streamUpload(req);
//     const user = await userModel.findById(userID)
//     if (user) {
//         const store = await storeModel.create({
//             storeEmail,
//             storeName,
//             storeImg:secure_url,
//             storeImgID:public_id,
//             storeDetail,
//             storeSocialMediaAcc,
//             storeUrl,
//             verify:true,
//         })
//         user?.stores?.push(store?._id)
//         return res.status(201).json({
//             message:`${user?.name} created ${store?.storeName} `,
//             data:store
//         })
//     } else {
//         return res.status(404).json({
//             message:"you are not a user"
//         })
//     }
//    } catch (error:any) {
//     return res.status(404).json({
//         message:`cannot create store ${error?.message}`
//     })
//    }
// }
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('Request body:', req.body);
        const { userID } = req.params;
        const { storeDetail, storeImgID, storeImg, category, storeUrl, storeSocialMediaAcc, storeName, storeEmail, } = req.body;
        // Verify that all fields are present and not undefined
        //   if (!storeDetail || !storeImgID || !storeImg || !category || !storeUrl || !storeSocialMediaAcc || !storeName || !storeEmail) {
        //     throw new Error('Missing required fields');
        //   }
        const { secure_url, public_id } = yield (0, stream_1.streamUpload)(req);
        console.log('Stream upload result:', secure_url, public_id);
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const store = yield storeModel_1.default.create({
                storeEmail,
                storeName,
                storeImg: secure_url,
                storeImgID: public_id,
                storeDetail,
                storeSocialMediaAcc,
                storeUrl,
                verify: true,
            });
            (_a = user === null || user === void 0 ? void 0 : user.stores) === null || _a === void 0 ? void 0 : _a.push(store === null || store === void 0 ? void 0 : store._id);
            return res.status(201).json({
                message: `${user === null || user === void 0 ? void 0 : user.name} created ${store === null || store === void 0 ? void 0 : store.storeName} `,
                data: store,
            });
        }
        else {
            return res.status(404).json({ message: 'You are not a user' });
        }
    }
    catch (error) {
        console.error('Error creating store:', error);
        return res.status(400).json({
            message: `Cannot create store: ${error.message}`,
        });
    }
});
exports.createStore = createStore;
// export const signInStore = async(req:Request, res:Response)=>{
//     try {
//         const {userID} = req.params;
//         const {StoreEmail,password} = req.body;
//         const user = await userModel.findById(userID);
//         if (user) {
//             const store = await storeModel.findOne({StoreEmail});
//             console.log(store)
//        if (store?.verify) {
//       const comp = await compare(password, store?.password)
//        if (comp) {
//         return res.status(200).json({
//             message:`u signed in successfully ${store?.storeName}`,
//             data:store?._id
//         })
//        } else {
//          return res.status(404).json({
//             message:`Incorrect store Password`
//         }) 
//        }
//        } else {
//         return res.status(404).json({
//             message:`you didn't create a store`
//         }) 
//        }
//         } else {
//             return res.status(404).json({
//                 message:`you are not a user`
//             })   
//         }
//     } catch (error) {
//         return res.status(404).json({
//             message:`can't sign in store :${error}`
//         })
//     }
// } 
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

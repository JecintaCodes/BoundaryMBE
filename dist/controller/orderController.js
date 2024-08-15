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
exports.createOrder = void 0;
const Orders_1 = __importDefault(require("../model/Orders"));
const buyerModel_1 = __importDefault(require("../model/buyerModel"));
const mainError_1 = require("../error/mainError");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buyerID, storeID, productID } = req.params;
        const { email } = req.body;
        const buyer = yield buyerModel_1.default.findById(buyerID);
        const store = yield buyerModel_1.default.findById(storeID);
        const product = yield buyerModel_1.default.findById(productID);
        const dates = Date.now();
        const status = "paid";
        const status1 = "pending";
        const status2 = "Fail";
        if (buyer && store && product) {
            // const store = await storeModel.findById(storeID);
            // if (store) {
            const order = yield Orders_1.default.create({
                date: dates,
                email: buyer === null || buyer === void 0 ? void 0 : buyer.email,
                customersName: buyer === null || buyer === void 0 ? void 0 : buyer.name,
                status: status,
                ids: buyer === null || buyer === void 0 ? void 0 : buyer._id,
            });
            // console.log(c)
            // console.log("starting here")
            // console.log("")
            return res.status(mainError_1.HTTP.CREATED).json({
                message: `your order and it was ${order === null || order === void 0 ? void 0 : order.status} is successfull ${buyer === null || buyer === void 0 ? void 0 : buyer.name}`,
                data: order,
            });
            // } else {
            //   return res.status(404).json({
            //     message: `you did not order so email is not here`,
            //   });
            // }
        }
        else {
            return res.status(mainError_1.HTTP.BAD_REQUEST).json({
                message: `you did not click on any store   `,
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: `your order did not create due to ${error}`,
        });
    }
});
exports.createOrder = createOrder;

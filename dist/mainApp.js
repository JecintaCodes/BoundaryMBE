"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const adminRouter_1 = __importDefault(require("./router/adminRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const buyerRouter_1 = __importDefault(require("./router/buyerRouter"));
const storeRouter_1 = __importDefault(require("./router/storeRouter"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const orderRouter_1 = __importDefault(require("./router/orderRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const mainApp = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)("dev"));
    app.use((0, helmet_1.default)());
    app.use("/api/v1", adminRouter_1.default);
    app.use("/api/v1", userRouter_1.default);
    app.use("/api/v1", buyerRouter_1.default);
    app.use("/api/v1", storeRouter_1.default);
    app.use("/api/v1", orderRouter_1.default);
    app.use("/api/v1", productRouter_1.default);
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Api live ..............",
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "server error",
                data: error,
            });
        }
    });
};
exports.mainApp = mainApp;

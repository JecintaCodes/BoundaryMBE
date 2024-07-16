"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controller/orderController");
const orderRouter = (0, express_1.Router)();
orderRouter.route("/:buyerID/:storeID/create-order").post(orderController_1.createOrder);
exports.default = orderRouter;

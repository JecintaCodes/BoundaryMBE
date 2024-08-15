"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controller/productController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("image");
const productRouter = (0, express_1.Router)();
productRouter.route("make-payment").post(productController_1.ProductPayment);
productRouter.route("/:userID/register-products").post(upload, productController_1.createProduct);
productRouter.route("/:productID/get-one-product").get(productController_1.readOneProduct);
productRouter.route("/get-all-product").get(productController_1.readProduct);
productRouter.route("/:productID/update-product").patch(upload, productController_1.updateProducts);
productRouter.route("/update-product-amount").patch(productController_1.updateProductAmount);
productRouter.route("/:productID/update-product-name").patch(productController_1.updateProductName);
productRouter
    .route("/:productID/update-product-img")
    .patch(upload, productController_1.updateProductImg);
productRouter
    .route("/:productID/update-product-total")
    .patch(productController_1.updateProductTotal);
productRouter.route("/:userID/:productID/delete-product").delete(productController_1.deleteProduct);
productRouter
    .route("/:adminID/:productID/admin-delete-product")
    .delete(productController_1.deleteProduct);
productRouter
    .route("/update-stock-product/:productID")
    .patch(productController_1.updateProductStock);
productRouter
    .route("/update-toggle-product/:productID")
    .patch(productController_1.updateProductToggle);
exports.default = productRouter;

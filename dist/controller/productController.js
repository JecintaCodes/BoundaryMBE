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
exports.updateProductToggle = exports.payment = exports.updateProductStock = exports.adminDeleteProduct = exports.searchProductName = exports.deleteProduct = exports.updateProductImg = exports.updateProductQuantity = exports.updateProductAmount = exports.updateProductTotal = exports.updateProductName = exports.updateProduct = exports.readOneProduct = exports.readProduct = exports.createProduct = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const storeModel_1 = __importDefault(require("../model/storeModel"));
const productModel_1 = __importDefault(require("../model/productModel"));
const stream_1 = require("../utils/stream");
const adminModel_1 = __importDefault(require("../model/adminModel"));
const https_1 = __importDefault(require("https"));
const mainError_1 = require("../error/mainError");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID, storeID } = req.params;
        const { title, description, QTYinStock, amount } = req.body;
        const { secure_url } = yield (0, stream_1.streamUpload)(req);
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const store = yield storeModel_1.default.findById(storeID);
            if (store) {
                const product = yield productModel_1.default.create({
                    title,
                    img: secure_url,
                    store,
                    QTYinStock,
                    amount,
                    storeID,
                    description
                });
                (_a = store === null || store === void 0 ? void 0 : store.products) === null || _a === void 0 ? void 0 : _a.push(product === null || product === void 0 ? void 0 : product._id);
                store === null || store === void 0 ? void 0 : store.save();
                // product?.stores?.push(store?.storeName!)
                return res.status(201).json({
                    message: `${store.storeName} has succesfully created ${product.title} `,
                    data: product
                });
            }
            else {
                return res.status(400).json({
                    message: `go and create a store `,
                });
            }
        }
        else {
            return res.status(400).json({
                message: `you are not a user go back and register as a user `,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: `Cannot create store: ${error}`,
        });
    }
});
exports.createProduct = createProduct;
const readProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.find();
        return res.status(200).json({
            message: "reading all the products",
            data: product
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `can't read data ${error} `
        });
    }
});
exports.readProduct = readProduct;
const readOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const product = yield productModel_1.default.findById(productID);
        return res.status(200).json({
            message: "gotten one product"
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `cannot read one product ${error}`
        });
    }
});
exports.readOneProduct = readOneProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const { secure_url } = yield (0, stream_1.streamUpload)(req);
        const { title, QTYinStock, amount, img } = req.body;
        const product = yield productModel_1.default.findById(productID);
        if (product) {
            const updateProduct = yield productModel_1.default.findByIdAndUpdate(productID, {
                title,
                img: secure_url,
                QTYinStock,
                amount,
            }, { new: true });
            return res.status(201).json({
                message: "product updated",
                data: updateProduct
            });
        }
        else {
            return res.status(404).json({
                message: `this is not a product `
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `can't update product ${error}`
        });
    }
});
exports.updateProduct = updateProduct;
const updateProductName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const { title, } = req.body;
        const product = yield productModel_1.default.findById(productID);
        if (product) {
            const updateProduct = yield productModel_1.default.findByIdAndUpdate(productID, {
                title,
            }, { new: true });
            return res.status(201).json({
                message: "product updated",
                data: updateProduct
            });
        }
        else {
            return res.status(404).json({
                message: `this is not a product `
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `can't update product ${error}`
        });
    }
});
exports.updateProductName = updateProductName;
const updateProductTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const { total, } = req.body;
        const product = yield productModel_1.default.findById(productID);
        if (product) {
            const updateProduct = yield productModel_1.default.findByIdAndUpdate(productID, {
                total,
            }, { new: true });
            return res.status(201).json({
                message: "product updated",
                data: updateProduct
            });
        }
        else {
            return res.status(404).json({
                message: `this is not a product `
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `can't update product ${error}`
        });
    }
});
exports.updateProductTotal = updateProductTotal;
const updateProductAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const { amount, } = req.body;
        const product = yield productModel_1.default.findById(productID);
        if (product) {
            const updateProduct = yield productModel_1.default.findByIdAndUpdate(productID, {
                amount,
            }, { new: true });
            return res.status(201).json({
                message: "product updated",
                data: updateProduct
            });
        }
        else {
            return res.status(404).json({
                message: `this is not a product `
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `can't update product ${error}`
        });
    }
});
exports.updateProductAmount = updateProductAmount;
const updateProductQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const { QTYinStock, } = req.body;
        const product = yield productModel_1.default.findById(productID);
        if (product) {
            const updateProduct = yield productModel_1.default.findByIdAndUpdate(productID, {
                QTYinStock,
            }, { new: true });
            return res.status(201).json({
                message: "product updated",
                data: updateProduct
            });
        }
        else {
            return res.status(404).json({
                message: `this is not a product `
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `can't update product ${error}`
        });
    }
});
exports.updateProductQuantity = updateProductQuantity;
const updateProductImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const { img, } = req.body;
        const { secure_url } = yield (0, stream_1.streamUpload)(req);
        const product = yield productModel_1.default.findById(productID);
        if (product) {
            const updateProduct = yield productModel_1.default.findByIdAndUpdate(productID, {
                img: secure_url,
            }, { new: true });
            return res.status(201).json({
                message: "product updated",
                data: updateProduct
            });
        }
        else {
            return res.status(404).json({
                message: `this is not a product `
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `can't update product ${error}`
        });
    }
});
exports.updateProductImg = updateProductImg;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, storeID, productID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const store = yield storeModel_1.default.findById(storeID);
            if (store) {
                const product = yield productModel_1.default.findById(productID);
                if (product) {
                    const deleteProduct = yield productModel_1.default.findByIdAndDelete(productID);
                    // store?.products?.pull(product?._id)
                    // store?.save();
                    // store?.products?.pull(product._id);
                    // store.save();
                    return res.status(200).json({
                        message: "product deleted",
                        data: deleteProduct
                    });
                }
                else {
                    return res.status(404).json({
                        message: `this product does not belong to you `
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: `you don't have access to this store `
                });
            }
        }
        else {
            return res.status(404).json({
                message: `you are not a user `
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: `error deleting product ${error}`
        });
    }
});
exports.deleteProduct = deleteProduct;
const searchProductName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const product = yield productModel_1.default.find({ name });
        return res.status(200).json({
            message: `product name found`,
            data: product
        });
    }
    catch (error) {
        return res.status(404).json({
            message: `error searching one product name ${error} `
        });
    }
});
exports.searchProductName = searchProductName;
const adminDeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID, productID } = req.params;
        const admin = yield adminModel_1.default.findById(adminID);
        if (admin) {
            const product = yield productModel_1.default.findByIdAndDelete(productID);
            return res.status(200).json({
                message: `${admin === null || admin === void 0 ? void 0 : admin.name} admin got ${product === null || product === void 0 ? void 0 : product.title} deleted`,
                data: product
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
exports.adminDeleteProduct = adminDeleteProduct;
const updateProductStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const { QTYPurchased } = req.body;
        const product = yield productModel_1.default.findById(productID);
        if (product) {
            let viewProduct = yield productModel_1.default.findByIdAndUpdate(productID, { QTYinStock: product.QTYinStock - QTYPurchased }, { new: true });
            return res.status(200).json({
                message: "update one product",
                data: viewProduct,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.updateProductStock = updateProductStock;
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const params = JSON.stringify({
            email: "customer@email.com",
            amount: amount * 100,
        });
        const options = {
            hostname: "api.paystack.co",
            port: 443,
            path: "/transaction/initialize",
            method: "POST",
            headers: {
                Authorization: "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
                "Content-Type": "application/json",
            },
        };
        const ask = https_1.default
            .request(options, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("end", () => {
                console.log(JSON.parse(data));
                res.status(mainError_1.HTTP.OK).json({
                    message: "Payment successful",
                    data: JSON.parse(data),
                });
            });
        })
            .on("error", (error) => {
            console.error(error);
        });
        ask.write(params);
        ask.end();
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error making Payment",
        });
    }
});
exports.payment = payment;
const updateProductToggle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const { toggle } = req.body;
        const product = yield productModel_1.default.findById(productID);
        if (product) {
            let toggledView = yield productModel_1.default.findByIdAndUpdate(productID, { toggle }, { new: true });
            return res.status(200).json({
                message: "update toggle product",
                data: toggledView,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.updateProductToggle = updateProductToggle;

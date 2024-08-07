import { Router } from "express"
import { createProduct, deleteProduct, readOneProduct, readProduct, updateProduct, updateProductAmount, updateProductImg, updateProductName, updateProductTotal } from "../controller/productController"
import multer from "multer"
const upload = multer().single("image")

const productRouter = Router()

productRouter.route("/create-product").post(upload,createProduct)
productRouter.route("/get-one-product").get(readOneProduct)
productRouter.route("/get-all-product").get(readProduct)
productRouter.route("/update-product").patch(upload,updateProduct)
productRouter.route("/update-product-amount").patch(updateProductAmount)
productRouter.route("/update-product-name").patch(updateProductName)
productRouter.route("/update-product-img").patch(upload,updateProductImg)
productRouter.route("/update-product-total").patch(updateProductTotal)
productRouter.route("/delete-product").delete(deleteProduct)
productRouter.route("/admin-delete-product").delete(deleteProduct)



export default productRouter
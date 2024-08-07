import { Router } from "express";
import { adminDeleteStore, createStore, getAllStores, getOneStore, getOneStoreUser, getOneUserStore, getStoreProducts, searchStoreCategory, searchStoreName, userDeleteStore } from "../controller/storeController";
import multer from "multer";
const upload = multer().single("image");

const storeRouter = Router();

storeRouter.route("/:userID/create-store").post(upload,createStore)
// storeRouter.route("/:userID/sign-in-store").post(signInStore)
storeRouter.route("/get-store").get(getAllStores)
storeRouter.route("/:storeID/get-one-store").get(getOneStore)
storeRouter.route("/:userID/:storeID/get-one-user-store").get(getOneUserStore)
storeRouter.route("/:storeID/:userID/get-one-store-user").get(getOneStoreUser)
storeRouter.route("/search-store-category").get(searchStoreCategory)
storeRouter.route("/search-store-name").get(searchStoreName)
storeRouter.route("/:adminID/:storeID/admin-delete-store").delete(adminDeleteStore)
storeRouter.route("/:userID/:storeID/user-delete-store").delete(userDeleteStore)
storeRouter.route(":storeID/store-products").get(getStoreProducts)
export default storeRouter
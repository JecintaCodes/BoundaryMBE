import { Router } from "express";
import { adminDeleteStore, createStore, getAllStores, getOneStore, getOneStoreUser, getOneUserStore, searchStoreCategory, signInStore, userDeleteStore } from "../controller/storeController";


const storeRouter = Router();

storeRouter.route("/:userID/create-store").post(createStore)
storeRouter.route("/:userID/sign-in-store").post(signInStore)
storeRouter.route("/get-store").get(getAllStores)
storeRouter.route("/:storeID/get-one-store").get(getOneStore)
storeRouter.route("/:userID/:storeID/get-one-user-store").get(getOneUserStore)
storeRouter.route("/:storeID/:userID/get-one-store-user").get(getOneStoreUser)
storeRouter.route("/search-store-category").get(searchStoreCategory)
storeRouter.route("/:adminID/:storeID/admin-delete-store").delete(adminDeleteStore)
storeRouter.route("/:userID/:storeID/user-delete-store").delete(userDeleteStore)
export default storeRouter
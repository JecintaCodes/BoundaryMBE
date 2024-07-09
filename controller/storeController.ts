import { Request, Response } from "express";
import userModel from "../model/userModel";
import storeModel from "../model/storeModel";
import {Types} from "mongoose"
import {hash, compare, genSalt} from "bcrypt"
import adminModel from "../model/adminModel";

export const createStore = async(req:Request, res:Response)=>{
    try {
        const {userID} = req.params;
        
        console.log("start")
        const user = await userModel.findById(userID);
        
        if (user) {

            const { storeName,storeUrl,StoreEmail,storeSocialMediaAcc,storeImg,storeDetail, category,password} = req.body;

            const salt = await genSalt(10);
            const harsh = await hash(password, salt)
           

            const store = await storeModel.create({
                storeName,
                storeUrl,
                StoreEmail,
                storeSocialMediaAcc,
                storeImg,
                storeDetail,
                category,
                password:harsh,
                verify:true,
            })
         
            store?.users.push(new Types.ObjectId(user._id))
            store?.save();
            // console.log()
            return res.status(201).json({
                message:` ${user?.name} successfully created ${store?.storeName} store`,
            data:store
                })
            return res.status(201).json({
                message:`${user?.name} successfully created your ${store?.storeName}store`,
            data:store
                })
        } else {
            return res.status(404).json({
                message:` you are not a user `
            }) 
        }
        
    } catch (error) {
        return res.status(404).json({
            message:`can't create store ${error}`
        })
    }

}
export const signInStore = async(req:Request, res:Response)=>{
    try {
        const {userID} = req.params;
        const {StoreEmail,password} = req.body;

        const user = await userModel.findById(userID);
        
        if (user) {
            
            const store = await storeModel.findOne({StoreEmail});
            console.log(store)

       if (store?.verify) {
      const comp = await compare(password, store?.password)

       if (comp) {

        return res.status(200).json({
            message:`u signed in successfully ${store?.storeName}`,
            data:store?._id
        })
        
       } else {
         return res.status(404).json({
            message:`Incorrect store Password`
        }) 
       }
       } else {
        return res.status(404).json({
            message:`you didn't create a store`
        }) 
       }
            
        } else {
            return res.status(404).json({
                message:`you are not a user`
            })   
        }
    } catch (error) {
        return res.status(404).json({
            message:`can't sign in store :${error}`
        })
    }
} 
export const getOneUserStore = async(req:Request, res:Response)=>{
    try {
        const {userID,storeID} = req.params

        const user = await userModel.findById(userID)

        if (user) {

            const store = await storeModel.findById(storeID).populate({
                path:"stores",
                options:{
                    sort:{
                        createdAt: -1
                    }
                }
            })
            return res.status(200).json({
                message:`${user?.name} ${store?.storeName} stores gotten `
            })
            
        } else {
            return res.status(404).json({
                message:"u are not a user"
            })
        }
        
    } catch (error) {
        return res.status(404).json({
            message:`error ${error}`
        })
    }
}
export const getOneStoreUser = async(req:Request, res:Response)=>{
    try {
        const {userID,storeID} = req.params

        const store = await storeModel.findById(storeID)

        if (store) {

            const user = await userModel.findById(userID).populate({
                path:"users",
                options:{
                    sort:{
                        createdAt: -1
                    }
                }
            })
            return res.status(200).json({
                message:`${store?.storeName} ${user?.name} stores gotten `
            })
            
        } else {
            return res.status(404).json({
                message:"u are not a store"
            })
        }
        
    } catch (error) {
        return res.status(404).json({
            message:`error ${error}`
        })
    }
}
export const searchStoreCategory = async(req:Request, res:Response)=>{
    try {
        const {category} = req.body

        const store = await storeModel.find({category})

            return res.status(201).json({
                message: "one category gotten",
                data:store
            })

    } catch (error) {
        return res.status(404).json({
            message:`error ${error}`
        })
    }
}
export const adminDeleteStore = async(req:Request, res:Response)=>{
    try {
        const {adminID, storeID} = req.params;

        const admin = await adminModel.findById(adminID)

        if (admin) {
        const store = await storeModel.findByIdAndDelete(storeID)
        return res.status(200).json({
            message:`${admin?.name} admin got ${store?.storeName} deleted`,
            data: store
        })
        } else {
            return res.status(404).json({
                message:`you are not an admin`
            }) 
        }
        
    } catch (error) {
        return res.status(404).json({
            message:`error deleting store ${error}`
        })
    }
}
export const userDeleteStore = async(req:Request, res:Response)=>{
    try {
        const {userID, storeID} = req.params;

        const user = await userModel.findById(userID)

        if (user) {
        const store = await storeModel.findByIdAndDelete(storeID)
        // store?.users?.pull(new Types.ObjectId(user?._id))
        // store?.save();
        // user?.stores.pull(new Types.ObjectId(store._id))
        // user?.save();
        // store?.users.pull(new Types.ObjectId(user._id))
        // store?.save();
        return res.status(200).json({
            message:`${user?.name} user got ${store?.storeName} deleted`,
            data: store
        })
        } else {
            return res.status(404).json({
                message:`you are not an user`
            }) 
        }
        
    } catch (error) {
        return res.status(404).json({
            message:`error deleting store ${error}`
        })
    }
}
export const getAllStores = async(req:Request, res:Response)=>{
    try {

        const store = await storeModel.find().sort({
            createdAt: -1
        })

        return res.status(200).json({
            message:`all stores gotten`,
            data: store
        })

    } catch (error) {
        return res.status(404).json({
            message:`error deleting store ${error}`
        })
    }
}
export const getOneStore = async(req:Request, res:Response)=>{
    try {

        const {storeID} = req.params

        const store = await storeModel.findById(storeID)

        return res.status(200).json({
            message:`one stores gotten`,
            data: store
        })

    } catch (error) {
        return res.status(404).json({
            message:`error deleting store ${error}`
        })
    }
}
import { Request, Response } from "express";
import userModel from "../model/userModel";
import storeModel from "../model/storeModel";
import {Types} from "mongoose"
// import {hash, compare, genSalt} from "bcryptjs"
import adminModel from "../model/adminModel";
import { streamUpload } from "../utils/stream";

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

export const createStore = async (req: Request, res: Response) => {
    try {
      console.log('Request body:', req.body);
      const { userID } = req.params;
      const {
        storeDetail,
        storeImgID,
        storeImg,
        category,
        storeUrl,
        storeSocialMediaAcc,
        storeName,
        storeEmail,
      } = req.body;
  
      // Verify that all fields are present and not undefined
    //   if (!storeDetail || !storeImgID || !storeImg || !category || !storeUrl || !storeSocialMediaAcc || !storeName || !storeEmail) {
    //     throw new Error('Missing required fields');
    //   }
      const { secure_url, public_id }: any = await streamUpload(req);
      console.log('Stream upload result:', secure_url, public_id);
  
      const user = await userModel.findById(userID);
      if (user) {
        const store = await storeModel.create({
          storeEmail,
          storeName,
          storeImg: secure_url,
          storeImgID: public_id,
          storeDetail,
          storeSocialMediaAcc,
          storeUrl,
          verify: true,
        });
        user?.stores?.push(store?._id);
        return res.status(201).json({
          message: `${user?.name} created ${store?.storeName} `,
          data: store,
        });
      } else {
        return res.status(404).json({ message: 'You are not a user' });
      }
    } catch (error: any) {
      console.error('Error creating store:', error);
      return res.status(400).json({
        message: `Cannot create store: ${error.message}`,
      });
    }
  };
  
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
export const searchStoreName = async(req:Request, res:Response)=>{
    try {
        const {storeName} = req.body

        const store = await storeModel.find({storeName})

            return res.status(201).json({
                message: "one storeName gotten",
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
export const  getStoreProducts = async(req:Request, res:Response)=>{
    try {
        const {storeID} = req.params;

        const store = await storeModel.findById(storeID).populate({
            path:"products",
            options:{
                sorts:({
                    createdAt: -1
                })
            }
        })
        return res.status(200).json({
            message:"gotten one store products",
            data:store
        })
        
    } catch (error) {
        return res.status(404).json({
            message:`error getting store products ${error}`,
        })
    }
}
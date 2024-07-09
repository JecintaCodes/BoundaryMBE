import {Request,Response} from "express"
import adminModel from "../model/adminModel"
import { role } from "../utils/role";
import {hash, genSalt, compare} from "bcrypt"
import userModel from "../model/userModel"
import { Types } from "mongoose";

export const registerUser = async(req:Request, res:Response)=>{
    try {
        const {adminID} = req.params;
       const {name, email, password, secretCode} = req.body;

       const admin = await adminModel.findById(adminID)

     if (admin) {
        const secret = "AjegunleCore"

        if (secret === secretCode) {
 
         const salt = await genSalt(10);
         const harsh = await hash(password, salt)
 
         const user = await userModel.create({
             name,
             email,
             password:harsh,
             secretCode:secret,
             role:role.user,
             verify:true,
         })

         admin?.users?.push(new Types.ObjectId(user?._id))
         admin?.save();
 
         return res.status(201).json({
             message:"welcome please sign in",
             data:user
         })
        } else {
         return res.status(400).json({
             message:"your secret code is not correct"
         })
        }
     } else {
        return res.status(400).json({
            message:"you are not an admin"
        })
     }

    } catch (error) {
        return res.status(404).json({
            message:`error signing up :${error}`
        })
    }
}
export const signInUser = async(req:Request, res:Response)=>{
    try {
       const {email,password} = req.body 
       const user = await userModel.findOne({email})

       if (user?.verify) {

      const comp = await compare(password, user?.password)

      if (comp) {

          return res.status(201).json({
            message:`welcome ${user.name}`,
            data:user._id
        })

      } else {
        return res.status(404).json({
            message:`Incorrect Password`
        })  
      }
       } else {
        return res.status(404).json({
            message:`please register as a user`
        }) 
       }

    } catch (error) {
        return res.status(404).json({
            message:`error signing in :${error}`
        }) 
    }

}
export const getAllUser = async(req:Request, res:Response)=>{
    try {
       const user = await userModel.find()
       
       return res.status(200).json({
        message: "all user gotten",
        data:user
       })
    } catch (error) {
        return res.status(404).json({
            message:`error signing in :${error}`
        }) 
    }
}
export const getOneUser = async(req:Request, res:Response)=>{
    try {
        const {userID} = req.params;

       const user = await userModel.findById(userID)
       
       return res.status(200).json({
        message: "one user gotten",
        data:user
       })
    } catch (error) {
        return res.status(404).json({
            message:`error getting one in :${error}`
        }) 
    }
}

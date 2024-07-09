import {Request,Response} from "express"
import adminModel from "../model/adminModel"
import { role } from "../utils/role";
import {hash, genSalt, compare} from "bcrypt"

export const registerAdmin = async(req:Request, res:Response)=>{
    try {
       const {name, email, password, secretCode} = req.body;

       const secret = "AjegunleCore"

       if (secret === secretCode) {

        const salt = await genSalt(10);
        const harsh = await hash(password,salt)

        const admin = await adminModel.create({
            name,
            email,
            password:harsh,
            secretCode:secret,
            role:role.admin,
            verify:true,
        })

        return res.status(201).json({
            message:"welcome please sign in",
            data:admin
        })
       } else {
        return res.status(400).json({
            message:"your secret code is inCorrect"
        })
       }

    } catch (error) {
        return res.status(404).json({
            message:`error signing in :${error}`
        })
    }
}
export const signInAdmin = async(req:Request, res:Response)=>{
    try {
       const {email,password} = req.body; 

       const admin = await adminModel.findOne({email})
       if (admin) {

       if (admin?.verify) {

        const comp = await compare(password,admin?.password)

       if (comp) {

        return res.status(201).json({
            message:`welcome ${admin.name}`,
            data:admin._id
        })
       } else {
        return res.status(404).json({
            message:`Incorrect Password `
        }) 
       }

       }else{
        return res.status(404).json({
            message:`you are not verified as an admin`
        }) 
       }

       } else {
        return res.status(404).json({
            message:`please register as an admin`
        }) 
       }

    } catch (error) {
        return res.status(404).json({
            message:`error signing in :${error}`
        }) 
    }

}
export const getAllAdmin = async(req:Request, res:Response)=>{
    try {
       const admin = await adminModel.find()
       
       return res.status(200).json({
        message: "all admin gotten",
        data:admin
       })
    } catch (error) {
        return res.status(404).json({
            message:`error signing in :${error}`
        }) 
    }
}
export const getOneAdmin = async(req:Request, res:Response)=>{
    try {
       const {adminID} = req.params;

       const admin = await adminModel.findById(adminID)
       
       return res.status(200).json({
        message: "one admin gotten",
        data:admin
       })
    } catch (error) {
        return res.status(404).json({
            message:`error getting one in :${error}`
        }) 
    }
}

import {Request,Response} from "express"
import { role } from "../utils/role";
import buyerModel from "../model/buyerModel";
import {hash,genSalt,compare} from "bcryptjs"

export const registerBuyer = async(req:Request, res:Response)=>{
    try {
       const {name, email, password, } = req.body;

        const salt = await genSalt(10);
        const harsh = await hash(password,salt);
        

        const buyer = await buyerModel.create({
            name,
            email,
            password:harsh,
            role:role.buyer,
            verify:true,
        })

        return res.status(201).json({
            message:`welcome please sign in ${buyer?.name} `,
            data:buyer
        })

    } catch (error) {
        return res.status(404).json({
            message:`error signing in :${error}`
        })
    }
}


export const signInBuyer = async(req:Request, res:Response)=>{
    try {
       const {email,password} = req.body 

       const buyer = await buyerModel.findOne({email})
       console.log(buyer)
       if (buyer) {

      if (buyer?.verify) {

        const comp = await compare(password, buyer?.password)
        
        if (comp) {

            return res.status(201).json({
                message:`welcome ${buyer.name}`,
                data:buyer._id
            })
        } else {
            return res.status(404).json({
                message:`In correct password`
            }) 
        }
      } else {
        return res.status(404).json({
            message:`you are not verified as a buyer`
        }) 
      }
       } else {
        return res.status(404).json({
            message:`please check your email`
        }) 
       }

    } catch (error:any) {
        return res.status(404).json({
            message:`error signing in :${error.message}`
        }) 
    }

}
export const getAllBuyers = async(req:Request, res:Response)=>{
    try {
       const buyer = await buyerModel.find()
       
       return res.status(200).json({
        message: "all buyers gotten",
        data:buyer
       })
    } catch (error) {
        return res.status(404).json({
            message:`error signing in :${error}`
        }) 
    }
}
export const getOneBuyer = async(req:Request, res:Response)=>{
    try {
       const {buyerID} = req.params;
       
       const buyer = await buyerModel.findById(buyerID).sort({
        cretedAt: -1
       })

       return res.status(200).json({
        message:"one buyer gotten",
        data:buyer
       })
       
    } catch (error) {
        return res.status(404).json({
            message:`can't get one buyer ${error} `,
        })
    }
}
import { Request, Response } from "express";
import Orders from "../model/Orders";
import buyerModel from "../model/buyerModel";
import storeModel from "../model/storeModel";




export const createOrder = async(req:Request, res:Response)=>{
    try {
        const {buyerID,storeID} = req.params;
        const {ids} = req.body;

        const buyer = await buyerModel.findById(buyerID);
       
        const dates = Date.now()
        const status = "paid"
        
       

        if (buyer) {
            const store = await storeModel.findById(storeID)
           

            if (store) {
                const order = await Orders.create({
                    date:dates,
                    email:buyer?.email,
                    customersName:buyer?.name,
                    status:status,
                    ids:buyer?._id
                    
                })
               
                // console.log(c)
                // console.log("starting here")
                // console.log("")
                return res.status(200).json({
                    message:`your order from ${store?.storeName} is successfull ${buyer?.name}`,
                    data:order
                })
            } else {
                return res.status(404).json({
                    message:`you did not order so email is not here`
                    }) 
            }
        } else {
              return res.status(404).json({
                    message:`you did not click on any store   `
                    }) 
        }

       

    } catch (error) {
        return res.status(404).json({
        message:`your order did not create due to ${error}`
        })
    }
}
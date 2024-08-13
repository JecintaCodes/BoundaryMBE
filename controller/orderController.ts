import { Request, Response } from "express";
import orderModel from "../model/Orders";
import buyerModel from "../model/buyerModel";
import storeModel from "../model/storeModel";
import { HTTP } from "../error/mainError";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { buyerID, storeID, productID } = req.params;
    const { email } = req.body;

    const buyer = await buyerModel.findById(buyerID);
    const store = await buyerModel.findById(storeID);
    const product = await buyerModel.findById(productID);

    const dates = Date.now();
    const status = "paid";
    const status1 = "pending";
    const status2 = "Fail";

    if (buyer && store && product) {
      // const store = await storeModel.findById(storeID);

      // if (store) {
      const order = await orderModel.create({
        date: dates,
        email: buyer?.email,
        customersName: buyer?.name,
        status: status,
        ids: buyer?._id,
      });

      // console.log(c)
      // console.log("starting here")
      // console.log("")
      return res.status(HTTP.CREATED).json({
        message: `your order and it was ${order?.status} is successfull ${buyer?.name}`,
        data: order,
      });
      // } else {
      //   return res.status(404).json({
      //     message: `you did not order so email is not here`,
      //   });
      // }
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `you did not click on any store   `,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `your order did not create due to ${error}`,
    });
  }
};

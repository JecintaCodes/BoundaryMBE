import { Request, Response } from "express";
import buyerModel from "../model/buyerModel";
import { HTTP } from "../error/mainError";
import userModel from "../model/userModel";
import productModel from "../model/productModel";
import { Types } from "mongoose";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { buyerID, productID } = req.params;

    const buyer = await buyerModel.findById(buyerID);

    if (buyer) {
      const product = await productModel.findById(productID);
      if (product) {
        const userProduct = await userModel.findById(product?.userID);

        userProduct?.orders?.push(new Types.ObjectId(product._id));
        userProduct?.histroys?.push(new Types.ObjectId(product._id));
        userProduct?.save();

        buyer?.orders.push(new Types.ObjectId(product?._id));
        buyer?.histroys.push(new Types.ObjectId(product?._id));
        buyer?.save();

        return res.status(HTTP.OK).json({
          message: `${buyer?.name} created an order from ${userProduct?.name}`,
        });
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: `product does not exist`,
        });
      }
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `you are not signed in`,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `your order did not create due to ${error}`,
    });
  }
};

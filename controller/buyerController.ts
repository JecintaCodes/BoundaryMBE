import { Request, Response } from "express";
import { role } from "../utils/role";
import buyerModel from "../model/buyerModel";
import { hash, genSalt, compare } from "bcryptjs";
import { streamUpload } from "../utils/stream";
import { HTTP } from "../error/mainError";

export const registerBuyer = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const salt = await genSalt(10);
    const harsh = await hash(password, salt);

    const buyer = await buyerModel.create({
      name,
      email,
      password: harsh,
      role: role.buyer,
      verify: true,
    });

    return res.status(HTTP.CREATED).json({
      message: `welcome please sign in ${buyer?.name} `,
      data: buyer,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error signing in :${error}`,
    });
  }
};
export const signInBuyer = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const buyer = await buyerModel.findOne({ email });
    console.log(buyer);
    if (buyer) {
      if (buyer?.verify) {
        const comp = await compare(password, buyer?.password);

        if (comp) {
          return res.status(HTTP.CREATED).json({
            message: `welcome ${buyer.name}`,
            data: buyer,
          });
        } else {
          return res.status(HTTP.BAD_REQUEST).json({
            message: `In correct password`,
          });
        }
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: `you are not verified as a buyer`,
        });
      }
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `please check your email`,
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error signing in :${error.message}`,
    });
  }
};
export const getAllBuyers = async (req: Request, res: Response) => {
  try {
    const buyer = await buyerModel.find();

    return res.status(HTTP.OK).json({
      message: "all buyers gotten",
      data: buyer,
      allBuyer: buyer?.length,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error signing in :${error}`,
    });
  }
};
export const UpdateOneBuyer = async (req: Request, res: Response) => {
  try {
    const { secure_url, public_id }: any = await streamUpload(req);
    const { buyerID } = req.params;
    const { name, details, image, imageID } = req.body;

    const buyer = await buyerModel.findById(buyerID);

    if (buyer) {
      const update = await buyerModel
        .findByIdAndUpdate(buyerID, {
          name,
          details,
          image: secure_url,
          imageID: public_id,
        })
        .sort({
          cretedAt: -1,
        });

      return res.status(HTTP.CREATED).json({
        message: " buyer updated",
        data: update,
      });
    } else {
      return res.status(404).json({
        message: `you are not a buyer `,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: `can't get one buyer ${error} `,
    });
  }
};
export const getOneBuyer = async (req: Request, res: Response) => {
  try {
    const { buyerID } = req.params;

    const buyer = await buyerModel.findById(buyerID).sort({
      cretedAt: -1,
    });

    return res.status(HTTP.OK).json({
      message: "one buyer gotten",
      data: buyer,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `can't get one buyer ${error} `,
    });
  }
};

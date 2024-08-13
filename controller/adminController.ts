import { Request, Response } from "express";
import adminModel from "../model/adminModel";
import { role } from "../utils/role";
import { hash, genSalt, compare } from "bcryptjs";
import { streamUpload } from "../utils/stream";
// import userModel from "../model/userModel";
// import buyerModel from "../model/buyerModel";
import { HTTP } from "../error/mainError";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, secretCode } = req.body;

    const secret = "AjegunleCore";

    if (secret === secretCode) {
      const salt = await genSalt(10);
      const harsh = await hash(password, salt);

      // const sec = await genSalt(10);
      // const secret = await hash(secretCode,sec)

      const admin = await adminModel.create({
        name,
        email,
        password: harsh,
        secretCode: secret,
        role: role.admin,
        verify: true,
      });
      //   console.log(admin);
      return res.status(HTTP.CREATED).json({
        message: "welcome please sign in",
        data: admin,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "your secret code is inCorrect",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error signing in :${error?.message}`,
    });
  }
};
export const signInAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, secretCode } = req.body;

    const admin = await adminModel.findOne({ email });
    if (admin) {
      // const secretCompare = await compare(secretCode,admin?. secretCode)

      if (admin?.verify) {
        const comp = await compare(password, admin?.password);

        if (comp) {
          console.log(admin);
          return res.status(HTTP.CREATED).json({
            message: `welcome ${admin.name}`,
            data: admin,
          });
        } else {
          return res.status(HTTP.BAD_REQUEST).json({
            message: `Incorrect Password `,
          });
        }
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: `you are not verified as an admin, or incorrect secretCode`,
        });
      }
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `please register as an admin`,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error signing in :${error}`,
    });
  }
};
export const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await adminModel.find();

    return res.status(HTTP.OK).json({
      message: "all admin gotten",
      data: admin,
      allAdmin: admin?.length,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error signing in :${error}`,
    });
  }
};
export const getOneAdmin = async (req: Request, res: Response) => {
  try {
    const { adminID } = req.params;

    const admin = await adminModel.findById(adminID);

    return res.status(HTTP.OK).json({
      message: "one admin gotten",
      data: admin,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error getting one in :${error}`,
    });
  }
};
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { adminID } = req.params;
    const { secure_url, public_id }: any = streamUpload(req);

    const adminUpdate = await adminModel.findByIdAndUpdate(
      adminID,
      {
        image: secure_url,
        imageID: public_id,
      },
      {
        new: true,
      }
    );
    return res.status(HTTP.CREATED).json({
      message: `${adminUpdate?.name} avatar updated `,
      data: adminUpdate,
    });
  } catch (error) {
    return res.status(HTTP.OK).json({
      message: "can't update admin avatar ",
    });
  }
};
export const updateAdminName = async (req: Request, res: Response) => {
  try {
    const { adminID } = req.params;
    const { name } = req.body;

    const admin = await adminModel.findByIdAndUpdate(
      adminID,
      {
        name,
      },
      {
        new: true,
      }
    );
    return res.status(HTTP.CREATED).json({
      message: `${admin?.name} has updated her name `,
      data: admin,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error updating admin name ${error} `,
    });
  }
};
export const updateAdminDetail = async (req: Request, res: Response) => {
  try {
    const { adminID } = req.params;
    const { detail } = req.body;

    const admin = await adminModel.findByIdAndUpdate(
      adminID,
      {
        detail,
      },
      {
        new: true,
      }
    );
    return res.status(HTTP.CREATED).json({
      message: `${admin?.name} has updated her name `,
      data: admin,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error updating admin name ${error} `,
    });
  }
};

export const updateAdminInFo = async (req: Request, res: Response) => {
  try {
    const { adminID } = req.params;
    const { name, detail, image, imageID } = req.body;
    const { secure_url, public_id }: any = streamUpload(req);

    const admin = await adminModel.findByIdAndUpdate(
      adminID,
      {
        name,
        detail,
        image: secure_url,
        imageID: public_id,
      },
      { new: true }
    );

    return res.status(HTTP.CREATED).json({
      message: `${admin?.name} information updated `,
      data: admin,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error updating admin: ${error} `,
    });
  }
};

// export const signInAllMembers = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const admin = await adminModel.findOne({ email });
//   const user = await userModel.findOne({ email });
//   const buyer = await buyerModel.findOne({ email });

//   if (admin?.verify && user?.verify && buyer?.verify) {
//     const comp = compare(
//       password,
//       admin?.password || password,
//       user?.password || password
//     );

//     if (comp) {
//     } else {
//       return res.status(404).json({
//         message: `incorrect password  `,
//       });
//     }
//   } else {
//     return res.status(404).json({
//       message: `you are not signed in  `,
//     });
//   }

//   try {
//   } catch (error) {
//     return res.status(404).json({
//       message: `can't sign in this member of boundary market `,
//     });
//   }
// };

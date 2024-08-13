import { Request, Response } from "express";
import userModel from "../model/userModel";
import storeModel from "../model/storeModel";
import productModel from "../model/productModel";
import { streamUpload } from "../utils/stream";
import adminModel from "../model/adminModel";
import https from "https";
import { HTTP } from "../error/mainError";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userID, storeID } = req.params;
    const { title, description, QTYinStock, amount } = req.body;
    const { secure_url }: any = await streamUpload(req);

    const user = await userModel.findById(userID);

    if (user) {
      const store = await storeModel.findById(storeID);

      if (store) {
        const product = await productModel.create({
          title,
          img: secure_url,
          //   store,
          QTYinStock,
          amount,
          storeID: store?._id,
          description,
        });
        store?.products?.push(product);
        store?.save();
        // product?.stores?.push(store?.storeName!)
        return res.status(HTTP.CREATED).json({
          message: `${store.storeName} has succesfully created ${product.title} `,
          data: product,
        });
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: `go and create a store `,
        });
      }
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `you are not a user go back and register as a user `,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `Cannot create store: ${error}`,
    });
  }
};
export const readProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.find();
    return res.status(HTTP.OK).json({
      message: "reading all the products",
      data: product,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `can't read data ${error} `,
    });
  }
};
export const readOneProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;

    const product = await productModel.findById(productID);

    return res.status(HTTP.OK).json({
      message: "gotten one product",
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `cannot read one product ${error}`,
    });
  }
};
export const updateProducts = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const { QTYpurchased } = req.body;

    const product = await productModel.findById(productID);

    if (product) {
      let viewProduct = await productModel.findByIdAndUpdate(
        productID,
        { QTYinStock: product.QTYinStock - QTYpurchased },
        { new: true }
      );
      return res.status(HTTP.CREATED).json({
        message: "One product gotten",
        data: viewProduct,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error getting One product ${error}`,
    });
  }
};
// export const updateProductToggle = async (req: Request, res: Response) => {
//   try {
//     const { productID } = req.params;
//     const { toggle } = req.body;

//     const product = await productModel.findById(productID);

//     if (product) {
//       let toggleProduct = await productModel.findByIdAndUpdate(
//         productID,
//         { toggle },
//         { new: true }
//       );
//       return res.status(HTTP.CREATED).json({
//         message: "One product gotten",
//         data: toggleProduct,
//       });
//     }
//   } catch (error) {
//     return res.status(HTTP.BAD_REQUEST).json({
//       message: `error getting One product ${error}`,
//     });
//   }
// };
export const updateProductName = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const { title } = req.body;

    const product = await productModel.findById(productID);

    if (product) {
      const updateProduct = await productModel.findByIdAndUpdate(
        productID,
        {
          title,
        },
        { new: true }
      );
      return res.status(HTTP.CREATED).json({
        message: "product updated",
        data: updateProduct,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `this is not a product `,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `can't update product ${error}`,
    });
  }
};
export const updateProductTotal = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const { total } = req.body;

    const product = await productModel.findById(productID);

    if (product) {
      const updateProduct = await productModel.findByIdAndUpdate(
        productID,
        {
          total,
        },
        { new: true }
      );
      return res.status(HTTP.CREATED).json({
        message: "product updated",
        data: updateProduct,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `this is not a product `,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `can't update product ${error}`,
    });
  }
};
export const updateProductAmount = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const { amount } = req.body;

    const product = await productModel.findById(productID);

    if (product) {
      const updateProduct = await productModel.findByIdAndUpdate(
        productID,
        {
          amount,
        },
        { new: true }
      );
      return res.status(HTTP.CREATED).json({
        message: "product updated",
        data: updateProduct,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `this is not a product `,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `can't update product ${error}`,
    });
  }
};
export const updateProductQuantity = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const { QTYinStock } = req.body;

    const product = await productModel.findById(productID);

    if (product) {
      const updateProduct = await productModel.findByIdAndUpdate(
        productID,
        {
          QTYinStock,
        },
        { new: true }
      );
      return res.status(HTTP.CREATED).json({
        message: "product updated",
        data: updateProduct,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `this is not a product `,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `can't update product ${error}`,
    });
  }
};
export const updateProductImg = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const { img } = req.body;
    const { secure_url }: any = await streamUpload(req);
    const product = await productModel.findById(productID);

    if (product) {
      const updateProduct = await productModel.findByIdAndUpdate(
        productID,
        {
          img: secure_url,
        },
        { new: true }
      );
      return res.status(HTTP.CREATED).json({
        message: "product updated",
        data: updateProduct,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `this is not a product `,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `can't update product ${error}`,
    });
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userID, storeID, productID } = req.params;

    const user = await userModel.findById(userID);

    if (user) {
      const store = await storeModel.findById(storeID);

      if (store) {
        const product = await productModel.findById(productID);

        if (product) {
          const deleteProduct = await productModel.findByIdAndDelete(productID);
          // store?.products?.pull(product?._id)
          // store?.save();
          // store?.products?.pull(product._id);
          // store.save();

          return res.status(HTTP.OK).json({
            message: "product deleted",
            data: deleteProduct,
          });
        } else {
          return res.status(HTTP.BAD_REQUEST).json({
            message: `this product does not belong to you `,
          });
        }
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: `you don't have access to this store `,
        });
      }
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `you are not a user `,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error deleting product ${error}`,
    });
  }
};
export const searchProductName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const product = await productModel.find({ name });
    return res.status(HTTP.OK).json({
      message: `product name found`,
      data: product,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error searching one product name ${error} `,
    });
  }
};
export const adminDeleteProduct = async (req: Request, res: Response) => {
  try {
    const { adminID, productID } = req.params;

    const admin = await adminModel.findById(adminID);

    if (admin) {
      const product = await productModel.findByIdAndDelete(productID);
      return res.status(HTTP.OK).json({
        message: `${admin?.name} admin got ${product?.title} deleted`,
        data: product,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `you are not an admin`,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error deleting store ${error}`,
    });
  }
};
export const updateProductStock = async (req: any, res: Response) => {
  try {
    const { productID } = req.params;
    const { QTYPurchased } = req.body;

    const product = await productModel.findById(productID);

    if (product) {
      let viewProduct = await productModel.findByIdAndUpdate(
        productID,
        { QTYinStock: product.QTYinStock - QTYPurchased },
        { new: true }
      );
      return res.status(HTTP.OK).json({
        message: "update one product",
        data: viewProduct,
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
      data: error.message,
    });
  }
};
export const ProductPayment = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    const params = JSON.stringify({
      email: "buyer@email.com",
      amount: amount * 100,
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization:
          "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
        "Content-Type": "application/json",
      },
    };

    const ask = https
      .request(options, (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          console.log(JSON.parse(data));
          res.status(HTTP.CREATED).json({
            message: "Payment successful",
            data: JSON.parse(data),
          });
        });
      })
      .on("error", (error) => {
        console.error(error);
      });

    ask.write(params);
    ask.end();
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error making Payment",
    });
  }
};
export const updateProductToggle = async (req: any, res: Response) => {
  try {
    const { productID } = req.params;
    const { toggle } = req.body;

    const product = await productModel.findById(productID);

    if (product) {
      let toggledView = await productModel.findByIdAndUpdate(
        productID,
        { toggle },
        { new: true }
      );
      return res.status(HTTP.OK).json({
        message: "update toggle product",
        data: toggledView,
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
      data: error.message,
    });
  }
};
// export const payment = async (req: Request, res: Response) => {
//   try {
//     const { amount } = req.body;

//     const params = JSON.stringify({
//       email: "customer@email.com",
//       amount: amount * 100,
//     });

//     const options = {
//       hostname: "api.paystack.co",
//       port: 443,
//       path: "/transaction/initialize",
//       method: "POST",
//       headers: {
//         Authorization:
//           "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
//         "Content-Type": "application/json",
//       },
//     };

//     const ask = https
//       .request(options, (resp) => {
//         let data = "";

//         resp.on("data", (chunk) => {
//           data += chunk;
//         });

//         resp.on("end", () => {
//           console.log(JSON.parse(data));
//           res.status(HTTP.OK).json({
//             message: "Payment successful",
//             data: JSON.parse(data),
//           });
//         });
//       })
//       .on("error", (error) => {
//         console.error(error);
//       });

//     ask.write(params);
//     ask.end();
//   } catch (error) {
//     return res.status(HTTP.BAD_REQUEST).json({
//       message: "Error making Payment",
//     });
//   }
// };

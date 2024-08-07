import { Request,Response } from "express";
import userModel from "../model/userModel";
import storeModel from "../model/storeModel";
import productModel from "../model/productModel";
import { streamUpload } from "../utils/stream";
import adminModel from "../model/adminModel";




export const createProduct = async(req:Request, res:Response)=>{
    try {

        const {userID, storeID} = req.params;
        const {name,img, total, amount} = req.body;
        const {secure_url}:any = await streamUpload(req);
        

        const user = await userModel.findById(userID);

        if (user) {
            
            const store = await storeModel.findById(storeID)

            if (store) {

                const product = await productModel.create({
                    name,
                    img:secure_url,
                    store,
                    total,
                    amount,
                    storeID
                })
                store?.products?.push(product?._id)
                store?.save()
                // product?.stores?.push(store?.storeName!)
                return res.status(201).json({
                    message:`${store.storeName} has succesfully created ${product.name} `,
                    data:product
                })
                
            } else {
                return res.status(400).json({
                    message: `go and create a store `,
                  });
            }

        } else {
            return res.status(400).json({
                message: `you are not a user go back and register as a user `,
              });  
        }
        
    } catch (error) {
        return res.status(400).json({
            message: `Cannot create store: ${error}`,
          });
    }
}
export const readProduct = async(req:Request,res:Response) =>{
    try {

        const product = await productModel.find()
        return res.status(200).json({
            message:"reading all the products",
            data:product
        })
    } catch (error) {
        return res.status(404).json({
            message:`can't read data ${error} `
        })
    }
}
export const readOneProduct = async (req:Request, res:Response)=>{
    try {
        
        const {productID} = req.params;

        const product = await productModel.findById(productID);

    return res.status(200).json({
        message:"gotten one product"
    })
        
    } catch (error) {
        return res.status(404).json({
            message:`cannot read one product ${error}`
        })
    }
}
export const updateProduct = async(req:Request, res:Response)=>{
    try {
        const {productID} = req.params;     
        const {secure_url}:any = await streamUpload(req);  
        const {name, total, amount, img} = req.body;

        const product = await productModel.findById(productID)

        if (product) {
            const updateProduct = await productModel.findByIdAndUpdate(productID,
                {
                    name,
                    img:secure_url,
                    total,
                    amount,
                },
                {new:true}
            )
            return res.status(201).json({
                message:"product updated",
                data:updateProduct
            })
        } else {
            return res.status(404).json({
                message:`this is not a product `
            })  
        }

    } catch (error) {
        return res.status(404).json({
            message:`can't update product ${error}`
        })
    }
}
export const updateProductName = async(req:Request, res:Response)=>{
    try {
        const {productID} = req.params;     
        const {name, } = req.body;

        const product = await productModel.findById(productID)

        if (product) {
            const updateProduct = await productModel.findByIdAndUpdate(productID,
                {
                    name,
                },
                {new:true}
            )
            return res.status(201).json({
                message:"product updated",
                data:updateProduct
            })
        } else {
            return res.status(404).json({
                message:`this is not a product `
            })  
        }

    } catch (error) {
        return res.status(404).json({
            message:`can't update product ${error}`
        })
    }
}
export const updateProductTotal = async(req:Request, res:Response)=>{
    try {
        const {productID} = req.params;     
        const {total, } = req.body;

        const product = await productModel.findById(productID)

        if (product) {
            const updateProduct = await productModel.findByIdAndUpdate(productID,
                {
                    total,
                },
                {new:true}
            )
            return res.status(201).json({
                message:"product updated",
                data:updateProduct
            })
        } else {
            return res.status(404).json({
                message:`this is not a product `
            })  
        }

    } catch (error) {
        return res.status(404).json({
            message:`can't update product ${error}`
        })
    }
}
export const updateProductAmount = async(req:Request, res:Response)=>{
    try {
        const {productID} = req.params;     
        const {amount, } = req.body;

        const product = await productModel.findById(productID)

        if (product) {
            const updateProduct = await productModel.findByIdAndUpdate(productID,
                {
                    amount,
                },
                {new:true}
            )
            return res.status(201).json({
                message:"product updated",
                data:updateProduct
            })
        } else {
            return res.status(404).json({
                message:`this is not a product `
            })  
        }

    } catch (error) {
        return res.status(404).json({
            message:`can't update product ${error}`
        })
    }
}
export const updateProductImg = async(req:Request, res:Response)=>{
    try {
        const {productID} = req.params;     
        const {img, } = req.body;
        const {secure_url}:any = await streamUpload(req);
        const product = await productModel.findById(productID)

        if (product) {
            const updateProduct = await productModel.findByIdAndUpdate(productID,
                {
                    img:secure_url,
                },
                {new:true}
            )
            return res.status(201).json({
                message:"product updated",
                data:updateProduct
            })
        } else {
            return res.status(404).json({
                message:`this is not a product `
            })  
        }

    } catch (error) {
        return res.status(404).json({
            message:`can't update product ${error}`
        })
    }
}
export const deleteProduct = async (req:Request,res:Response)=>{
    try {
        const {userID, storeID, productID} = req.params;

        const  user = await userModel.findById(userID);

        if (user) {
            const store = await storeModel.findById(storeID);

            if (store) {

                const product = await productModel.findById(productID)

                if (product) {
                    const deleteProduct = await productModel.findByIdAndDelete(productID)
                    // store?.products?.pull(product?._id)
                    // store?.save();
                    // store?.products?.pull(product._id);
                    // store.save();


                    return res.status(200).json({
                        message:"product deleted",
                        data:deleteProduct
                    })
                    
                } else {
                    return res.status(404).json({
                        message:`this product does not belong to you `
                       })  
                }
                
            } else {
                return res.status(404).json({
                    message:`you don't have access to this store `
                   })   
            }
        } else {
            return res.status(404).json({
                message:`you are not a user `
               }) 
        }

        
    } catch (error) {
       return res.status(404).json({
        message:`error deleting product ${error}`
       }) 
    }
}
export const searchProductName = async(req:Request, res:Response)=>{
    try {
        const {name} = req.params;
        const product = await productModel.find({name});
        return res.status(200).json({
            message:`product name found`,
            data:product
        })
        
    } catch (error) {
        return res.status(404).json({
            message:`error searching one product name ${error} `
        })
    }
}
export const adminDeleteProduct = async(req:Request, res:Response)=>{
    try {
        const {adminID, productID} = req.params;

        const admin = await adminModel.findById(adminID)

        if (admin) {
        const product = await productModel.findByIdAndDelete(productID)
        return res.status(200).json({
            message:`${admin?.name} admin got ${product?.name} deleted`,
            data: product
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
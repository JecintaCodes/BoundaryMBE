import { Document, model, Schema, Types} from "mongoose"


interface iProduct{
    name:string;
    img: string;
    amount:number;
    total:number;
    storeID:string;
    stores:[];
    users:{}[];
    admins:{};
}

interface iProductData extends iProduct, Document{}

const productModel = new Schema({
    name:{
        type:String,
        require:true,
    },
    img:{
        type:String,
    },
    storeID:{
        type:String,
    },
    amount:{
        type:Number,
    },
    total:{
        type:Number,
    },
    stores:[{
        type:Types.ObjectId,
        ref:"stores"
    }],
    users:[{
        type:Types.ObjectId,
        ref:"users"
    }],
    admins:{
        type:Types.ObjectId,
        ref:"admins"
    },
},{timestamps:true})
export default model<iProductData>("products",productModel)

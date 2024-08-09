import { Document, model, Schema, Types} from "mongoose"


interface iProduct{
    title:string;
    img: string;
    description?: string;
    amount:number;
    QTYinStock:number;
    storeID:string;
    toggle:boolean;
    stores:[];
    users:{}[];
    admins:{};
}

interface iProductData extends iProduct, Document{}

const productModel = new Schema({
    title:{
        type:String,
        require:true,
    },
    img:{
        type:String,
    },
    description:{
        type:String,
        
    },
    storeID:{
        type:String,
    },
    amount:{
        type:Number,
    },
    toggle:{
        type:Boolean,
        default:false,
    },
    QTYinStock:{
        type:Number,
        default:0,
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

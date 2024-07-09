import { model, Document,Schema,Types } from "mongoose"

interface iBuyer{
    name: string;
    email: string;
    image?:string;
    imageID?:string;
    role?:string;
    password:string;
    verify:boolean;
    admins:{};
    stores:{};
    users:{};
    orders:{}[];
    
}

interface iBuyerData extends iBuyer, Document{}

const buyerModel = new Schema({

    name:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    imageID:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowerCase:true,
    },
    verify:{
        type:Boolean,
       
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
    },
    admins:{
        type: Types.ObjectId,
        ref:"admins"
    },
    stores:{
        type: Types.ObjectId,
        ref:"stores"
    },
    users:{
        type: Types.ObjectId,
        ref:"users"
    },
    orders:[{
        type: Types.ObjectId,
        ref:"orders"
    }],

}, {timestamps:true})

export default model<iBuyerData>("buyers",buyerModel)
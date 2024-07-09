import { model, Document,Schema,Types } from "mongoose"

interface iAdmin{
    name: string;
    email: string;
    password:string;
    secretCode:string;
    image?:string;
    imageID?:string;
    role?:string;
    detail?:string;
    verify?:boolean;
    users:{}[];
    stores:[];
    orders:{}[];
}

interface iAdminData extends iAdmin, Document{}

const adminModel = new Schema({

    name:{
        type:String,
        require:true,
    },
    role:{
        type:String,
    },
    detail:{
        type:String,
    },
    secretCode:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        require:true,
    },
    image:{
        type:String,
       
    },
    imageID:{
        type:String,
       
    },
    verify:{
        type:Boolean,
        
    },
    users:{
        type: Types.ObjectId,
        ref:"users"
    },
    stores:{
        type: Types.ObjectId,
        ref:"stores"
    },
    orders:{
        type: Types.ObjectId,
        ref:"orders"
    },

}, {timestamps:true})

export default model<iAdminData>("admins",adminModel)
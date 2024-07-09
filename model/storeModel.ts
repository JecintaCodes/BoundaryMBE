import {model, Schema, Document,Types} from "mongoose"


interface iStore{
    storeName: string;
    storeUrl:string;
    StoreEmail:string;
    storeSocialMediaAcc?:string;
    category:string;
    storeImg:string;
    password:string;
    verify:boolean;
    storeDetail?:string;
    users:{}[];
    admins:{}[];

}

interface iStoreData extends iStore, Document{}

const storeModel = new Schema({
    storeName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    storeUrl:{
        type:String,
        require:true
    },
    StoreEmail:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
    },
    storeImg:{
        type:String,
    },
    storeDetail:{
        type:String,
    },
    verify:{
        type:Boolean,
    },
    storeSocialMediaAcc:{
        type:String,
    },
    category:{
        type:String,
        require:true,
    },
    users:[{
        type:Types.ObjectId,
        ref:"users"
    }],
    admins:[{
        type:Types.ObjectId,
        ref:"users"
    }],
},{timestamps:true})

export default model<iStoreData>("stores",storeModel)
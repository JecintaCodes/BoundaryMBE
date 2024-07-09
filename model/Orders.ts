import { Document,model,Schema, Types } from "mongoose";

export  interface Iorder{
    date:number,
    ids:string,
    email:string,
    customersName:string,
    status:string,
    users:{},
    admin:{}
    buyers:{}
}

interface IorderData extends Iorder, Document{}

const orderModel = new Schema({

    date: {
        type: Number,
    },
    id1: {
        type: Number,
    },
    email: {
        type: String,
        require:true,
    },
    custormersName: {
        type: String,
        require:true,

    },
    status: {
        type: String,
        require:true,

    },
    users: {
        type: Types.ObjectId,
        ref:"users"
    },
    admins: {
        type: Types.ObjectId,
        ref:"admins"
    },
    buyers: {
        type: Types.ObjectId,
        ref:"buyers"
    },
},{timestamps:true})

export default model<IorderData>("orders", orderModel)



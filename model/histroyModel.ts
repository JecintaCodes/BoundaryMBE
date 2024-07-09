import { Schema, Document, Types, model } from "mongoose";



export interface iHistroy{
    date: string,
    time:string,
    details:string,
    orders: [{}],
    users:{},
    admins:{};
    buyers:{}
    
}

interface iHistroyData extends iHistroy, Document{}

const histroyModel = new Schema({
    date: {
        type:String,
    },
    time: {
        type:String,
    },
    details: {
        type:String,
    },
    orders: [{
        type:Types.ObjectId,
        ref:"orders",
    }],
    users: {
        type:Types.ObjectId,
        ref:"users"
    },
    admins: {
        type:Types.ObjectId,
        ref:"admins"
    },
    buyers: {
        type:Types.ObjectId,
        ref:"buyers"
    },
}, {timestamps:true})

export default model<iHistroy>("histroys", histroyModel)
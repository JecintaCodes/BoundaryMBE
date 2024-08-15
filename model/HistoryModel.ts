import { model, Schema, Types } from "mongoose";
import Orders from "./Orders";

interface iHistroy {
  histroy: string;
  orders: {}[];
  users: {};
  admins: {};
  buyers: {};
}

interface iHistroyData extends iHistroy, Document {}

const histroyModel = new Schema(
  {
    history: {
      type: String,
    },

    Orders: [
      {
        type: Types.ObjectId,
        ref: "orders",
      },
    ],
    users: {
      types: Types.ObjectId,
      ref: "users",
    },
    buyers: {
      types: Types.ObjectId,
      ref: "buyers",
    },
    admins: {
      types: Types.ObjectId,
      ref: "admins",
    },
  },
  { timestamps: true }
);

export default model<iHistroyData>("histroys", histroyModel);

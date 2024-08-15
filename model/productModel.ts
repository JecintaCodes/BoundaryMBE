import { Document, model, Schema, Types } from "mongoose";

interface iProduct {
  title: string;
  img: string;
  description?: string;
  amount: number;
  QTYinStock: number;
  storeID: string;
  toggle: boolean;
  userID: string;
  stores: [];
  users: {}[];
  admins: {};
  orders: {}[];
}

interface iProductData extends iProduct, Document {}

const productModel = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    userID: {
      type: String,
    },
    img: {
      type: String,
    },
    description: {
      type: String,
    },
    storeID: {
      type: String,
    },
    amount: {
      type: Number,
    },
    toggle: {
      type: Boolean,
      default: false,
    },
    QTYinStock: {
      type: Number,
      default: 0,
    },
    stores: [
      {
        type: Types.ObjectId,
        ref: "stores",
      },
    ],
    users: [
      {
        type: Types.ObjectId,
        ref: "users",
      },
    ],
    orders: [
      {
        type: Types.ObjectId,
        ref: "orders",
      },
    ],
    admins: {
      type: Types.ObjectId,
      ref: "admins",
    },
  },
  { timestamps: true }
);
export default model<iProductData>("products", productModel);

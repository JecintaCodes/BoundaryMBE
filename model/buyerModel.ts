import { model, Document, Schema, Types } from "mongoose";

interface iBuyer {
  name: string;
  details?: string;
  email: string;
  image?: string;
  imageID?: string;
  role?: string;
  password: string;
  verify: boolean;
  admins: {};
  stores: {};
  users: {};
  orders: {}[];
  histroys: {}[];
  products: {}[];
}

interface iBuyerData extends iBuyer, Document {}

const buyerModel = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    details: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowerCase: true,
    },
    verify: {
      type: Boolean,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
    },
    admins: {
      type: Types.ObjectId,
      ref: "admins",
    },
    stores: {
      type: Types.ObjectId,
      ref: "stores",
    },
    users: {
      type: Types.ObjectId,
      ref: "users",
    },
    orders: [
      {
        type: Types.ObjectId,
        ref: "orders",
      },
    ],
    histroys: [
      {
        type: Types.ObjectId,
        ref: "histroys",
      },
    ],
    products: [
      {
        type: Types.ObjectId,
        ref: "products",
      },
    ],
  },
  { timestamps: true }
);

export default model<iBuyerData>("buyers", buyerModel);

import { model, Document, Schema, Types } from "mongoose";

interface iUser {
  name: string;
  email: string;
  role?: string;
  password: string;
  detail?: string;
  image: string;
  imageID?: string;
  adminID: string;
  verify: boolean;
  admins: {};
  stores: {}[];
  orders: {}[];
  histroys: {}[];
}

interface iUserData extends iUser, Document {}

const userModel = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowerCase: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
    },
    detail: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    verify: {
      type: Boolean,
    },
    admins: {
      type: Types.ObjectId,
      ref: "admins",
    },
    stores: [
      {
        type: Types.ObjectId,
        ref: "stores",
      },
    ],
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
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);

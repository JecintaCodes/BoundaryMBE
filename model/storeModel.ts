import { model, Schema, Document, Types } from "mongoose";

interface iStore {
  storeName: string;
  storeUrl?: string;
  storeEmail: string;
  storeSocialMediaAcc?: string;
  category: string;
  storeImg: string;
  storeImgID: string;
  verify: boolean;
  storeDetail?: string;
  products: {}[];
  users: {}[];
  admins: {}[];
  buyers: {}[];
}

interface iStoreData extends iStore, Document {}

const storeModel = new Schema(
  {
    storeName: {
      type: String,
      require: true,
    },
    storeUrl: {
      type: String,
    },
    storeEmail: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    storeImg: {
      type: String,
    },
    storeImgID: {
      type: String,
    },
    storeDetail: {
      type: String,
    },
    verify: {
      type: Boolean,
    },
    storeSocialMediaAcc: {
      type: String,
    },
    category: {
      type: String,
      require: true,
    },
    users: [
      {
        type: Types.ObjectId,
        ref: "users",
      },
    ],
    products: [
      {
        type: Types.ObjectId,
        ref: "products",
      },
    ],
    admins: [
      {
        type: Types.ObjectId,
        ref: "admins",
      },
    ],
    buyers: [
      {
        type: Types.ObjectId,
        ref: "buyers",
      },
    ],
  },
  { timestamps: true }
);

export default model<iStoreData>("stores", storeModel);

import mongoose, { Schema, Types, Document } from "mongoose";
import { PRODUCT_COLOR_HEXES } from "../../../../shared/colourPalette.js";

export interface IProduct {
  name: {
    en: string;
    de: string;
    es: string;
    it: string;
    fr: string;
  };
  description: {
    en: string;
    de: string;
    es: string;
    it: string;
    fr: string;
  };
  price: number;
  category: Types.ObjectId;
  quantity: number;
  sold: number;
  photos: {
    key: string;
    contentType: string;
    sizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }[];
  weight: number;
  width: number;
  height: number;
  length: number;
  colors: string[];
}

export interface IProductDocument extends IProduct, Document { }

const productSchema = new Schema<IProductDocument>({
  name: {
    en: { type: String, required: true, trim: true },
    de: { type: String, default: '' },
    es: { type: String, default: '' },
    it: { type: String, default: '' },
    fr: { type: String, default: '' }
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32
  },
  description: {
    en: { type: String, default: '' },
    de: { type: String, default: '' },
    es: { type: String, default: '' },
    it: { type: String, default: '' },
    fr: { type: String, default: '' }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  quantity: {
    type: Number
  },
  sold: {
    type: Number,
    default: 0
  },
  photos: [{
    key: String,
    contentType: String,
    sizes: {
      xs: String,
      sm: String,
      md: String,
      lg: String,
      xl: String
    }
  }],
  weight: {
    type: Number, // grams
    required: true
  },
  // cm
  width: Number,
  height: Number,
  length: Number,
  colors: {
    type: [String],
    enum: PRODUCT_COLOR_HEXES,
    default: [],
  },
}, { timestamps: true });

export const Product = mongoose.model<IProductDocument>("Product", productSchema);
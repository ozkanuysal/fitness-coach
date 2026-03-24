import mongoose, { Schema, model, models } from "mongoose";

const PackageSchema = new Schema(
  {
    baslik: {
      type: String,
      required: [true, "Paket basligi gerekli"],
    },
    aciklama: { type: String },
    sure: {
      type: Number,
      required: [true, "Sure (ay) gerekli"],
    },
    fiyat: {
      type: Number,
      required: [true, "Fiyat gerekli"],
    },
    ozellikler: [{ type: String }],
    aktif: { type: Boolean, default: true },
    sira: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Package = models.Package || model("Package", PackageSchema);
export default Package;

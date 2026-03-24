import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email gerekli"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Sifre gerekli"],
    },
    ad: {
      type: String,
      required: [true, "Ad gerekli"],
      trim: true,
    },
    soyad: {
      type: String,
      required: [true, "Soyad gerekli"],
      trim: true,
    },
    telefon: { type: String },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },
    // Client-specific
    boy: { type: Number },
    kilo: { type: Number },
    yas: { type: Number },
    cinsiyet: { type: String, enum: ["erkek", "kadin"] },
    hedef: { type: String },
    notlar: { type: String },
    profilResmi: { type: String },
    aktif: { type: Boolean, default: true },
    // Makro hedefleri
    gunlukKalori: { type: Number },
    gunlukProtein: { type: Number },
    gunlukKarbonhidrat: { type: Number },
    gunlukYag: { type: Number },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;

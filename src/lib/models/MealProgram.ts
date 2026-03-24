import mongoose, { Schema, model, models } from "mongoose";

const OgunYemekSchema = new Schema(
  {
    yemekId: { type: Schema.Types.ObjectId, ref: "Meal", required: true },
    yemekAdi: { type: String, required: true },
    miktar: { type: String, required: true },
    kalori: { type: Number },
    protein: { type: Number },
    karbonhidrat: { type: Number },
    yag: { type: Number },
    notlar: { type: String },
  },
  { _id: false }
);

const AlternatifSchema = new Schema(
  {
    baslik: { type: String, required: true },
    yemekler: [OgunYemekSchema],
  },
  { _id: false }
);

const OgunSchema = new Schema(
  {
    ogunAdi: { type: String, required: true },
    saat: { type: String },
    yemekler: [OgunYemekSchema],
    alternatifler: [AlternatifSchema],
  },
  { _id: false }
);

const ToplamMakroSchema = new Schema(
  {
    kalori: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    karbonhidrat: { type: Number, default: 0 },
    yag: { type: Number, default: 0 },
  },
  { _id: false }
);

const BeslenmeGunSchema = new Schema(
  {
    gun: { type: String, required: true },
    ogunler: [OgunSchema],
    toplamMakro: ToplamMakroSchema,
  },
  { _id: false }
);

const MakroHedefleriSchema = new Schema(
  {
    gunlukKalori: { type: Number },
    gunlukProtein: { type: Number },
    gunlukKarbonhidrat: { type: Number },
    gunlukYag: { type: Number },
  },
  { _id: false }
);

const MealProgramSchema = new Schema(
  {
    baslik: {
      type: String,
      required: [true, "Program basligi gerekli"],
    },
    aciklama: { type: String },
    danisanId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    olusturanId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    makroHedefleri: MakroHedefleriSchema,
    gunler: [BeslenmeGunSchema],
    baslangicTarihi: { type: Date },
    bitisTarihi: { type: Date },
    aktif: { type: Boolean, default: true },
  },
  { timestamps: true }
);

MealProgramSchema.index({ danisanId: 1, aktif: 1 });

const MealProgram =
  models.MealProgram || model("MealProgram", MealProgramSchema);
export default MealProgram;

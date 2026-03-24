import mongoose, { Schema, model, models } from "mongoose";

const MealSchema = new Schema(
  {
    ad: {
      type: String,
      required: [true, "Yemek adi gerekli"],
      trim: true,
    },
    kategori: {
      type: String,
      required: [true, "Kategori gerekli"],
      enum: [
        "protein",
        "karbonhidrat",
        "yag",
        "sebze",
        "meyve",
        "icecek",
        "atistirmalik",
        "diger",
      ],
    },
    kalori: { type: Number },
    protein: { type: Number },
    karbonhidrat: { type: Number },
    yag: { type: Number },
    porsiyon: { type: String },
    olusturanId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Meal = models.Meal || model("Meal", MealSchema);
export default Meal;

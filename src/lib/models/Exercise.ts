import mongoose, { Schema, model, models } from "mongoose";

const ExerciseSchema = new Schema(
  {
    ad: {
      type: String,
      required: [true, "Egzersiz adi gerekli"],
      trim: true,
    },
    aciklama: { type: String },
    kasGrubu: {
      type: String,
      required: [true, "Kas grubu gerekli"],
      enum: [
        "gogus",
        "sirt",
        "omuz",
        "biceps",
        "triceps",
        "bacak",
        "karin",
        "kalca",
        "kardio",
        "diger",
      ],
    },
    videoUrl: { type: String },
    resimUrl: { type: String },
    ekipman: { type: String },
    olusturanId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Exercise = models.Exercise || model("Exercise", ExerciseSchema);
export default Exercise;

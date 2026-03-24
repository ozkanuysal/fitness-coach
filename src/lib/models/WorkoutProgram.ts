import mongoose, { Schema, model, models } from "mongoose";

const SetSchema = new Schema(
  {
    tekrar: { type: Number, required: true },
    set: { type: Number, required: true },
    agirlik: { type: String },
    dinlenme: { type: String },
  },
  { _id: false }
);

const ProgramExerciseSchema = new Schema(
  {
    egzersizId: {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    egzersizAdi: { type: String, required: true },
    setler: [SetSchema],
    notlar: { type: String },
    sira: { type: Number, required: true },
  },
  { _id: false }
);

const GunSchema = new Schema(
  {
    gun: { type: String, required: true },
    baslik: { type: String },
    egzersizler: [ProgramExerciseSchema],
  },
  { _id: false }
);

const WorkoutProgramSchema = new Schema(
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
    gunler: [GunSchema],
    baslangicTarihi: { type: Date },
    bitisTarihi: { type: Date },
    aktif: { type: Boolean, default: true },
  },
  { timestamps: true }
);

WorkoutProgramSchema.index({ danisanId: 1, aktif: 1 });

const WorkoutProgram =
  models.WorkoutProgram || model("WorkoutProgram", WorkoutProgramSchema);
export default WorkoutProgram;

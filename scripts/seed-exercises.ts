import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/fitness-coach";

const ExerciseSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  aciklama: { type: String },
  kasGrubu: { type: String, required: true },
  ekipman: { type: String },
}, { timestamps: true });

const exercises = [
  // Gogus
  { ad: "Bench Press (Duz Bank)", kasGrubu: "gogus", ekipman: "Barbell" },
  { ad: "Incline Bench Press", kasGrubu: "gogus", ekipman: "Barbell" },
  { ad: "Dumbbell Fly", kasGrubu: "gogus", ekipman: "Dumbbell" },
  { ad: "Cable Crossover", kasGrubu: "gogus", ekipman: "Cable" },
  { ad: "Push-up (Sinav)", kasGrubu: "gogus", ekipman: "Vucut Agirligi" },
  { ad: "Dips (Gogus)", kasGrubu: "gogus", ekipman: "Paralel Bar" },

  // Sirt
  { ad: "Lat Pulldown", kasGrubu: "sirt", ekipman: "Cable" },
  { ad: "Barbell Row", kasGrubu: "sirt", ekipman: "Barbell" },
  { ad: "Seated Cable Row", kasGrubu: "sirt", ekipman: "Cable" },
  { ad: "Pull-up (Baris)", kasGrubu: "sirt", ekipman: "Baris" },
  { ad: "Dumbbell Row", kasGrubu: "sirt", ekipman: "Dumbbell" },
  { ad: "Deadlift", kasGrubu: "sirt", ekipman: "Barbell" },

  // Omuz
  { ad: "Overhead Press", kasGrubu: "omuz", ekipman: "Barbell" },
  { ad: "Lateral Raise", kasGrubu: "omuz", ekipman: "Dumbbell" },
  { ad: "Front Raise", kasGrubu: "omuz", ekipman: "Dumbbell" },
  { ad: "Face Pull", kasGrubu: "omuz", ekipman: "Cable" },
  { ad: "Arnold Press", kasGrubu: "omuz", ekipman: "Dumbbell" },

  // Biceps
  { ad: "Barbell Curl", kasGrubu: "biceps", ekipman: "Barbell" },
  { ad: "Dumbbell Curl", kasGrubu: "biceps", ekipman: "Dumbbell" },
  { ad: "Hammer Curl", kasGrubu: "biceps", ekipman: "Dumbbell" },
  { ad: "Preacher Curl", kasGrubu: "biceps", ekipman: "EZ Bar" },
  { ad: "Cable Curl", kasGrubu: "biceps", ekipman: "Cable" },

  // Triceps
  { ad: "Tricep Pushdown", kasGrubu: "triceps", ekipman: "Cable" },
  { ad: "Skull Crusher", kasGrubu: "triceps", ekipman: "EZ Bar" },
  { ad: "Overhead Tricep Extension", kasGrubu: "triceps", ekipman: "Dumbbell" },
  { ad: "Dips (Triceps)", kasGrubu: "triceps", ekipman: "Paralel Bar" },
  { ad: "Close Grip Bench Press", kasGrubu: "triceps", ekipman: "Barbell" },

  // Bacak
  { ad: "Squat", kasGrubu: "bacak", ekipman: "Barbell" },
  { ad: "Leg Press", kasGrubu: "bacak", ekipman: "Makine" },
  { ad: "Romanian Deadlift", kasGrubu: "bacak", ekipman: "Barbell" },
  { ad: "Leg Extension", kasGrubu: "bacak", ekipman: "Makine" },
  { ad: "Leg Curl", kasGrubu: "bacak", ekipman: "Makine" },
  { ad: "Bulgarian Split Squat", kasGrubu: "bacak", ekipman: "Dumbbell" },
  { ad: "Calf Raise", kasGrubu: "bacak", ekipman: "Makine" },
  { ad: "Lunges", kasGrubu: "bacak", ekipman: "Dumbbell" },

  // Karin
  { ad: "Crunch", kasGrubu: "karin", ekipman: "Vucut Agirligi" },
  { ad: "Plank", kasGrubu: "karin", ekipman: "Vucut Agirligi" },
  { ad: "Russian Twist", kasGrubu: "karin", ekipman: "Vucut Agirligi" },
  { ad: "Leg Raise", kasGrubu: "karin", ekipman: "Vucut Agirligi" },
  { ad: "Cable Crunch", kasGrubu: "karin", ekipman: "Cable" },

  // Kardio
  { ad: "Kosu Bandi", kasGrubu: "kardio", ekipman: "Makine" },
  { ad: "Bisiklet", kasGrubu: "kardio", ekipman: "Makine" },
  { ad: "Kures Makinesi", kasGrubu: "kardio", ekipman: "Makine" },
  { ad: "Ip Atlama", kasGrubu: "kardio", ekipman: "Ip" },
  { ad: "HIIT Sprint", kasGrubu: "kardio", ekipman: "Vucut Agirligi" },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB baglantisi basarili");

    const Exercise = mongoose.models.Exercise || mongoose.model("Exercise", ExerciseSchema);

    const count = await Exercise.countDocuments();
    if (count > 0) {
      console.log(`${count} egzersiz zaten mevcut. Seed atlanıyor.`);
      await mongoose.disconnect();
      return;
    }

    await Exercise.insertMany(exercises);
    console.log(`${exercises.length} egzersiz eklendi!`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed hatasi:", error);
    process.exit(1);
  }
}

seed();

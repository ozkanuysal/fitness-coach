import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/fitness-coach";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    ad: { type: String, required: true },
    soyad: { type: String, required: true },
    telefon: { type: String },
    role: { type: String, enum: ["admin", "client"], default: "client" },
    aktif: { type: Boolean, default: true },
  },
  { timestamps: true }
);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB baglantisi basarili");

    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin zaten mevcut:", existingAdmin.email);
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 12);

    const admin = await User.create({
      email: "admin@fitkoc.com",
      password: hashedPassword,
      ad: "Fitness",
      soyad: "Koc",
      role: "admin",
      aktif: true,
    });

    console.log("Admin olusturuldu:");
    console.log("  Email:", admin.email);
    console.log("  Sifre: admin123");
    console.log("  Rol:", admin.role);

    // Ornek danisan olustur
    const clientPassword = await bcrypt.hash("client123", 12);
    const client = await User.create({
      email: "danisan@fitkoc.com",
      password: clientPassword,
      ad: "Ahmet",
      soyad: "Yilmaz",
      telefon: "05551234567",
      role: "client",
      aktif: true,
    });

    console.log("\nOrnek danisan olusturuldu:");
    console.log("  Email:", client.email);
    console.log("  Sifre: client123");

    await mongoose.disconnect();
    console.log("\nSeed islemi tamamlandi!");
  } catch (error) {
    console.error("Seed hatasi:", error);
    process.exit(1);
  }
}

seed();

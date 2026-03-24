import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/fitness-coach";

const MealSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  kategori: { type: String, required: true },
  kalori: { type: Number },
  protein: { type: Number },
  karbonhidrat: { type: Number },
  yag: { type: Number },
  porsiyon: { type: String },
}, { timestamps: true });

const meals = [
  // Protein
  { ad: "Tavuk Gogsu (Izgara)", kategori: "protein", kalori: 165, protein: 31, karbonhidrat: 0, yag: 3.6, porsiyon: "100g" },
  { ad: "Yumurta (Haslanmis)", kategori: "protein", kalori: 78, protein: 6, karbonhidrat: 0.6, yag: 5, porsiyon: "1 adet" },
  { ad: "Somon (Izgara)", kategori: "protein", kalori: 208, protein: 20, karbonhidrat: 0, yag: 13, porsiyon: "100g" },
  { ad: "Ton Balik (Konserve)", kategori: "protein", kalori: 116, protein: 26, karbonhidrat: 0, yag: 1, porsiyon: "100g" },
  { ad: "Kirmizi Et (Biftek)", kategori: "protein", kalori: 271, protein: 26, karbonhidrat: 0, yag: 18, porsiyon: "100g" },
  { ad: "Hindi Gogsu", kategori: "protein", kalori: 135, protein: 30, karbonhidrat: 0, yag: 1, porsiyon: "100g" },
  { ad: "Lor Peyniri", kategori: "protein", kalori: 98, protein: 11, karbonhidrat: 3, yag: 4, porsiyon: "100g" },
  { ad: "Yogurt (Protein)", kategori: "protein", kalori: 100, protein: 15, karbonhidrat: 7, yag: 0.7, porsiyon: "200g" },

  // Karbonhidrat
  { ad: "Pirinc Pilavi", kategori: "karbonhidrat", kalori: 130, protein: 2.7, karbonhidrat: 28, yag: 0.3, porsiyon: "100g" },
  { ad: "Bulgur Pilavi", kategori: "karbonhidrat", kalori: 83, protein: 3, karbonhidrat: 18, yag: 0.2, porsiyon: "100g" },
  { ad: "Makarna (Tam Bugday)", kategori: "karbonhidrat", kalori: 124, protein: 5, karbonhidrat: 25, yag: 0.5, porsiyon: "100g" },
  { ad: "Yulaf Ezmesi", kategori: "karbonhidrat", kalori: 389, protein: 17, karbonhidrat: 66, yag: 7, porsiyon: "100g" },
  { ad: "Tam Bugday Ekmek", kategori: "karbonhidrat", kalori: 69, protein: 4, karbonhidrat: 12, yag: 1, porsiyon: "1 dilim" },
  { ad: "Tatli Patates", kategori: "karbonhidrat", kalori: 86, protein: 1.6, karbonhidrat: 20, yag: 0.1, porsiyon: "100g" },
  { ad: "Patates (Haslanmis)", kategori: "karbonhidrat", kalori: 87, protein: 1.9, karbonhidrat: 20, yag: 0.1, porsiyon: "100g" },

  // Yag
  { ad: "Zeytinyagi", kategori: "yag", kalori: 119, protein: 0, karbonhidrat: 0, yag: 14, porsiyon: "1 yemek kasigi" },
  { ad: "Avokado", kategori: "yag", kalori: 160, protein: 2, karbonhidrat: 9, yag: 15, porsiyon: "1/2 adet" },
  { ad: "Badem", kategori: "yag", kalori: 164, protein: 6, karbonhidrat: 6, yag: 14, porsiyon: "30g" },
  { ad: "Ceviz", kategori: "yag", kalori: 185, protein: 4, karbonhidrat: 4, yag: 18, porsiyon: "30g" },
  { ad: "Fistik Ezmesi", kategori: "yag", kalori: 94, protein: 4, karbonhidrat: 3, yag: 8, porsiyon: "1 yemek kasigi" },

  // Sebze
  { ad: "Brokoli", kategori: "sebze", kalori: 34, protein: 2.8, karbonhidrat: 7, yag: 0.4, porsiyon: "100g" },
  { ad: "Ispanak", kategori: "sebze", kalori: 23, protein: 2.9, karbonhidrat: 3.6, yag: 0.4, porsiyon: "100g" },
  { ad: "Salatalik", kategori: "sebze", kalori: 16, protein: 0.7, karbonhidrat: 3.6, yag: 0.1, porsiyon: "100g" },
  { ad: "Domates", kategori: "sebze", kalori: 18, protein: 0.9, karbonhidrat: 3.9, yag: 0.2, porsiyon: "100g" },
  { ad: "Biber (Yesil)", kategori: "sebze", kalori: 20, protein: 0.9, karbonhidrat: 4.6, yag: 0.2, porsiyon: "100g" },
  { ad: "Karisik Salata", kategori: "sebze", kalori: 45, protein: 2, karbonhidrat: 8, yag: 0.5, porsiyon: "1 porsiyon" },

  // Meyve
  { ad: "Muz", kategori: "meyve", kalori: 89, protein: 1.1, karbonhidrat: 23, yag: 0.3, porsiyon: "1 adet" },
  { ad: "Elma", kategori: "meyve", kalori: 52, protein: 0.3, karbonhidrat: 14, yag: 0.2, porsiyon: "1 adet" },
  { ad: "Cilek", kategori: "meyve", kalori: 32, protein: 0.7, karbonhidrat: 7.7, yag: 0.3, porsiyon: "100g" },
  { ad: "Yaban Mersini", kategori: "meyve", kalori: 57, protein: 0.7, karbonhidrat: 14, yag: 0.3, porsiyon: "100g" },

  // Icecek
  { ad: "Su", kategori: "icecek", kalori: 0, protein: 0, karbonhidrat: 0, yag: 0, porsiyon: "1 bardak" },
  { ad: "Yesil Cay", kategori: "icecek", kalori: 2, protein: 0, karbonhidrat: 0, yag: 0, porsiyon: "1 bardak" },
  { ad: "Protein Shake", kategori: "icecek", kalori: 120, protein: 24, karbonhidrat: 3, yag: 1, porsiyon: "1 olcu" },
  { ad: "Sut (Yarim Yagli)", kategori: "icecek", kalori: 50, protein: 3.3, karbonhidrat: 5, yag: 1.5, porsiyon: "200ml" },

  // Atistirmalik
  { ad: "Pirinc Patlagi", kategori: "atistirmalik", kalori: 35, protein: 0.7, karbonhidrat: 7, yag: 0.3, porsiyon: "1 adet" },
  { ad: "Protein Bar", kategori: "atistirmalik", kalori: 200, protein: 20, karbonhidrat: 22, yag: 7, porsiyon: "1 adet" },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB baglantisi basarili");

    const Meal = mongoose.models.Meal || mongoose.model("Meal", MealSchema);

    const count = await Meal.countDocuments();
    if (count > 0) {
      console.log(`${count} yemek zaten mevcut. Seed atlaniyor.`);
      await mongoose.disconnect();
      return;
    }

    await Meal.insertMany(meals);
    console.log(`${meals.length} yemek eklendi!`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed hatasi:", error);
    process.exit(1);
  }
}

seed();

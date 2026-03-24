# FitKoc - Kisisel Fitness Koclugu Platformu

Fitness koclarinin danisanlarina ozel antrenman ve beslenme programlari olusturup yonetebilecegi web uygulamasi.

## Ozellikler

- **Landing Page** - Tanitim, paket fiyatlandirma, donusum hikayeleri
- **Admin Paneli** - Danisan yonetimi, antrenman/beslenme programi olusturma
- **Danisan Portali** - Kisisel programlari goruntuleme, makro takibi
- **Makro Takibi** - Kalori, protein, karbonhidrat, yag hedef ve takibi
- **Alternatif Yemekler** - Her ogune birden fazla secenek
- **Role-based Auth** - Admin (koc) ve client (danisan) rolleri

## Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS 4 |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js v5 |
| Validation | Zod |
| UI | Headless UI, Heroicons, Recharts |

## Baslangic

### Gereksinimler

- Node.js 20+
- MongoDB (lokal veya Atlas)

### Kurulum

```bash
# Repo'yu klonla
git clone https://github.com/KULLANICI/fitness-coach.git
cd fitness-coach

# Bagimliliklari kur
npm install

# Environment dosyasini olustur
cp .env.example .env.local
# .env.local dosyasini duzenle (MONGODB_URI, AUTH_SECRET)

# AUTH_SECRET olustur
openssl rand -base64 32

# Seed verilerini yukle
npx tsx scripts/seed-admin.ts
npx tsx scripts/seed-exercises.ts
npx tsx scripts/seed-meals.ts

# Dev server baslat
npm run dev
```

Tarayicida http://localhost:3000 adresini ac.

### Varsayilan Giris Bilgileri

| Rol | Email | Sifre |
|-----|-------|-------|
| Admin (Koc) | admin@fitkoc.com | admin123 |
| Danisan | danisan@fitkoc.com | client123 |

## Docker ile Calistirma

```bash
# Docker Compose ile baslat (MongoDB dahil)
docker compose up -d

# Seed verilerini yukle
npx tsx scripts/seed-admin.ts
npx tsx scripts/seed-exercises.ts
npx tsx scripts/seed-meals.ts
```

## Proje Yapisi

```
src/
├── app/
│   ├── (auth)/          # Login sayfalari
│   ├── (admin)/         # Admin paneli (yonetim)
│   ├── (client)/        # Danisan portali
│   ├── api/             # REST API route'lari
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/              # Button, Input, Card, Modal...
│   ├── landing/         # Hero, Features, Packages...
│   ├── layout/          # Sidebar, Navbar, Footer
│   ├── workout/         # Antrenman bilesenleri
│   └── meal/            # Beslenme bilesenleri
├── lib/
│   ├── db.ts            # MongoDB baglantisi
│   ├── models/          # Mongoose modelleri
│   └── utils.ts         # Yardimci fonksiyonlar
└── auth.ts              # NextAuth yapilandirmasi
```

## API Endpointleri

| Method | Endpoint | Aciklama |
|--------|----------|----------|
| GET/POST | `/api/clients` | Danisan listele/olustur |
| GET/PUT/DELETE | `/api/clients/[id]` | Danisan detay/guncelle/sil |
| GET/POST | `/api/workout-programs` | Antrenman programlari |
| GET/PUT/DELETE | `/api/workout-programs/[id]` | Program detay |
| GET/POST | `/api/meal-programs` | Beslenme programlari |
| GET/PUT/DELETE | `/api/meal-programs/[id]` | Program detay |
| GET/POST | `/api/exercises` | Egzersiz kutuphanesi |
| GET/POST | `/api/meals` | Yemek kutuphanesi |
| GET | `/api/health` | Sistem durumu |

## Deploy

### Vercel (Onerilen)

1. GitHub'a push et
2. [vercel.com](https://vercel.com) uzerinden import et
3. Environment variables'lari ekle:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `AUTH_SECRET` - `openssl rand -base64 32`
   - `AUTH_URL` - Production domain URL

### Docker (VPS)

```bash
docker compose -f docker-compose.yml up -d
```

### Railway

1. GitHub repo'yu Railway'e bagla
2. MongoDB eklentisini ekle
3. Environment variables'lari ayarla

## Environment Variables

| Degisken | Aciklama | Ornek |
|----------|----------|-------|
| `MONGODB_URI` | MongoDB baglanti adresi | `mongodb+srv://...` |
| `AUTH_SECRET` | NextAuth sifreleme anahtari | `openssl rand -base64 32` |
| `AUTH_URL` | Uygulamanin URL'i | `https://fitkoc.com` |

## Lisans

MIT

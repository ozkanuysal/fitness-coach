import { Types } from "mongoose";

// ==================== USER ====================
export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  ad: string;
  soyad: string;
  telefon?: string;
  role: "admin" | "client";
  // Client-specific
  boy?: number;
  kilo?: number;
  yas?: number;
  cinsiyet?: "erkek" | "kadin";
  hedef?: string;
  notlar?: string;
  profilResmi?: string;
  aktif: boolean;
  // Makro hedefleri
  gunlukKalori?: number;
  gunlukProtein?: number;
  gunlukKarbonhidrat?: number;
  gunlukYag?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== EXERCISE ====================
export interface IExercise {
  _id: Types.ObjectId;
  ad: string;
  aciklama?: string;
  kasGrubu: string;
  videoUrl?: string;
  resimUrl?: string;
  ekipman?: string;
  olusturanId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== WORKOUT PROGRAM ====================
export interface ISet {
  tekrar: number;
  set: number;
  agirlik?: string;
  dinlenme?: string;
}

export interface IProgramExercise {
  egzersizId: Types.ObjectId;
  egzersizAdi: string;
  setler: ISet[];
  notlar?: string;
  sira: number;
}

export interface IGun {
  gun: string;
  baslik?: string;
  egzersizler: IProgramExercise[];
}

export interface IWorkoutProgram {
  _id: Types.ObjectId;
  baslik: string;
  aciklama?: string;
  danisanId: Types.ObjectId;
  olusturanId: Types.ObjectId;
  gunler: IGun[];
  baslangicTarihi?: Date;
  bitisTarihi?: Date;
  aktif: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== MEAL ====================
export interface IMeal {
  _id: Types.ObjectId;
  ad: string;
  kategori: string;
  kalori?: number;
  protein?: number;
  karbonhidrat?: number;
  yag?: number;
  porsiyon?: string;
  olusturanId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== MEAL PROGRAM ====================
export interface IOgunYemek {
  yemekId: Types.ObjectId;
  yemekAdi: string;
  miktar: string;
  kalori?: number;
  protein?: number;
  karbonhidrat?: number;
  yag?: number;
  notlar?: string;
}

export interface IAlternatif {
  baslik: string;
  yemekler: IOgunYemek[];
}

export interface IOgun {
  ogunAdi: string;
  saat?: string;
  yemekler: IOgunYemek[];
  alternatifler: IAlternatif[];
}

export interface IBeslenmeGun {
  gun: string;
  ogunler: IOgun[];
  toplamMakro?: {
    kalori: number;
    protein: number;
    karbonhidrat: number;
    yag: number;
  };
}

export interface IMealProgram {
  _id: Types.ObjectId;
  baslik: string;
  aciklama?: string;
  danisanId: Types.ObjectId;
  olusturanId: Types.ObjectId;
  makroHedefleri?: {
    gunlukKalori: number;
    gunlukProtein: number;
    gunlukKarbonhidrat: number;
    gunlukYag: number;
  };
  gunler: IBeslenmeGun[];
  baslangicTarihi?: Date;
  bitisTarihi?: Date;
  aktif: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== PACKAGE ====================
export interface IPackage {
  _id: Types.ObjectId;
  baslik: string;
  aciklama?: string;
  sure: number; // ay
  fiyat: number;
  ozellikler: string[];
  aktif: boolean;
  sira: number;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== AUTH ====================
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      ad: string;
      soyad: string;
      role: "admin" | "client";
    };
  }

  interface User {
    id: string;
    email: string;
    ad: string;
    soyad: string;
    role: "admin" | "client";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "client";
    ad: string;
    soyad: string;
  }
}

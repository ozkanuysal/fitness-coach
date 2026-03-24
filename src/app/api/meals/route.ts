import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Meal from "@/lib/models/Meal";

export async function GET() {
  await dbConnect();
  const meals = await Meal.find().sort({ kategori: 1, ad: 1 }).lean();
  return NextResponse.json(meals);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const meal = await Meal.create({
      ...body,
      olusturanId: session.user.id,
    });
    return NextResponse.json(meal, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Sunucu hatasi" },
      { status: 500 }
    );
  }
}

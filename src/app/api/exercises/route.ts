import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Exercise from "@/lib/models/Exercise";

export async function GET() {
  await dbConnect();
  const exercises = await Exercise.find().sort({ kasGrubu: 1, ad: 1 }).lean();
  return NextResponse.json(exercises);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const exercise = await Exercise.create({
      ...body,
      olusturanId: session.user.id,
    });
    return NextResponse.json(exercise, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Sunucu hatasi" },
      { status: 500 }
    );
  }
}

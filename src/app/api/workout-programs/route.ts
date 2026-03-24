import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import WorkoutProgram from "@/lib/models/WorkoutProgram";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  await dbConnect();

  const { searchParams } = new URL(req.url);
  const danisanId = searchParams.get("danisanId");

  let filter: any = {};
  if (session.user.role === "client") {
    filter.danisanId = session.user.id;
  } else if (danisanId) {
    filter.danisanId = danisanId;
  }

  const programs = await WorkoutProgram.find(filter)
    .populate("danisanId", "ad soyad")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(programs);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const program = await WorkoutProgram.create({
      ...body,
      olusturanId: session.user.id,
    });
    return NextResponse.json(program, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Sunucu hatasi" },
      { status: 500 }
    );
  }
}

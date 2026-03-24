import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import WorkoutProgram from "@/lib/models/WorkoutProgram";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  const { programId } = await params;
  await dbConnect();

  const program = await WorkoutProgram.findById(programId)
    .populate("danisanId", "ad soyad")
    .lean();

  if (!program) {
    return NextResponse.json(
      { error: "Program bulunamadi" },
      { status: 404 }
    );
  }

  if (
    session.user.role === "client" &&
    (program as any).danisanId?._id?.toString() !== session.user.id
  ) {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 403 });
  }

  return NextResponse.json(program);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  const { programId } = await params;
  await dbConnect();

  try {
    const body = await req.json();
    const program = await WorkoutProgram.findByIdAndUpdate(programId, body, {
      new: true,
    }).lean();

    if (!program) {
      return NextResponse.json(
        { error: "Program bulunamadi" },
        { status: 404 }
      );
    }

    return NextResponse.json(program);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Sunucu hatasi" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  const { programId } = await params;
  await dbConnect();

  const program = await WorkoutProgram.findByIdAndDelete(programId);
  if (!program) {
    return NextResponse.json(
      { error: "Program bulunamadi" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Program silindi" });
}
